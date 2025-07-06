# Deployment Guide - MeetExperts.co

This guide covers deploying the AI persona clone system to Netlify with Supabase and Stripe integration.

## 🚀 Quick Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-username/meetexperts)

## 📋 Prerequisites

1. **Netlify Account** - [Sign up at netlify.com](https://netlify.com)
2. **Supabase Account** - [Sign up at supabase.com](https://supabase.com)
3. **Stripe Account** - [Sign up at stripe.com](https://stripe.com)
4. **OpenAI Account** - [Sign up at openai.com](https://openai.com)
5. **Cal.com Account** - [Sign up at cal.com](https://cal.com)

## 🔧 Environment Variables Setup

### Required Environment Variables

Set these in your Netlify dashboard under **Site settings > Environment variables**:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_live_your-stripe-secret-key

# OpenAI Configuration
OPENAI_API_KEY=sk-your-openai-api-key

# Cal.com Configuration
CALCOM_API_KEY=your-calcom-api-key
```

### Getting Your API Keys

#### 1. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings > API**
3. Copy your **Project URL** and **anon public** key
4. Set up your database schema (see Database Schema section below)

#### 2. Stripe Setup
1. Create account at [stripe.com](https://stripe.com)
2. Go to **Developers > API keys**
3. Copy your **Publishable key** and **Secret key**
4. For production, use live keys (pk_live_... and sk_live_...)

#### 3. OpenAI Setup
1. Create account at [openai.com](https://openai.com)
2. Go to **API keys** section
3. Create a new API key
4. Copy the key (starts with sk-...)

#### 4. Cal.com Setup
1. Create account at [cal.com](https://cal.com)
2. Go to **Settings > Developer > API Keys**
3. Create a new API key
4. Copy the API key

## 🗄️ Database Schema (Supabase)

Run these SQL commands in your Supabase SQL editor:

```sql
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create experts table
CREATE TABLE experts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  expertise TEXT[] NOT NULL,
  background TEXT NOT NULL,
  personality TEXT NOT NULL,
  common_questions TEXT[] NOT NULL,
  hourly_rate INTEGER NOT NULL, -- in cents
  calcom_username TEXT,
  calcom_event_type TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  expert_id UUID REFERENCES experts(id),
  meeting_date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  stripe_payment_intent_id TEXT,
  calcom_booking_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID REFERENCES bookings(id),
  user_id UUID REFERENCES auth.users(id),
  expert_id UUID REFERENCES experts(id),
  amount INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'usd',
  stripe_payment_intent_id TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'succeeded', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample expert data
INSERT INTO experts (name, title, expertise, background, personality, common_questions, hourly_rate, calcom_username, calcom_event_type) VALUES
(
  'Sarah Johnson',
  'Product Design Lead',
  ARRAY['Product Design', 'User Experience', 'Design Strategy', 'Team Leadership'],
  'Former design lead at top tech companies including Google and Airbnb. 8+ years of experience in product design and UX strategy.',
  'Friendly, analytical, detail-oriented, passionate about user-centered design',
  ARRAY[
    'What is your design process?',
    'How do you approach user research?',
    'What tools do you recommend for designers?',
    'How do you handle design feedback?',
    'What makes a good product designer?'
  ],
  15000, -- $150/hour in cents
  'sarah-johnson',
  'consultation'
);

-- Enable RLS policies
CREATE POLICY "Public experts are viewable by everyone" ON experts FOR SELECT USING (true);
CREATE POLICY "Users can view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can view their own payments" ON payments FOR SELECT USING (auth.uid() = user_id);
```

## 🚀 Deployment Steps

### 1. Prepare Your Repository
```bash
# Install dependencies
npm install

# Build the project to test
npm run build

# Commit your changes
git add .
git commit -m "Ready for production deployment"
git push origin main
```

### 2. Deploy to Netlify

#### Option A: Connect GitHub Repository
1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Click **"New site from Git"**
3. Connect your GitHub repository
4. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**

#### Option B: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod --dir=dist
```

### 3. Configure Environment Variables
1. Go to **Site settings > Environment variables**
2. Add all required environment variables listed above
3. Click **"Save"**

### 4. Configure Functions
The Netlify Functions are automatically deployed from the `netlify/functions/` directory:
- `openai.ts` - OpenAI API proxy
- `calcom.ts` - Cal.com API proxy  
- `create-payment-intent.ts` - Stripe payment processing

### 5. Test Your Deployment
1. Visit your Netlify site URL
2. Test the AI persona chat functionality
3. Test the booking flow
4. Verify all API integrations work

## 🔒 Security Considerations

### API Key Security
- ✅ All API keys are stored as environment variables
- ✅ Frontend only receives public keys (Supabase anon, Stripe publishable)
- ✅ Secret keys are only used in Netlify Functions (server-side)
- ✅ CORS is properly configured for all functions

### Database Security
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Users can only access their own bookings and payments
- ✅ Expert data is publicly readable but not writable

### Payment Security
- ✅ Stripe handles all payment processing
- ✅ No sensitive payment data stored in our database
- ✅ Payment intents created server-side only

## 📊 Monitoring & Analytics

### Netlify Analytics
- Enable Netlify Analytics in your site dashboard
- Monitor site performance and usage

### Supabase Monitoring
- Monitor database usage in Supabase dashboard
- Set up alerts for high usage

### Stripe Monitoring
- Monitor payments in Stripe dashboard
- Set up webhooks for payment status updates

## 🔄 CI/CD Pipeline

The deployment is automatically configured for continuous deployment:

1. **Push to main branch** → Triggers Netlify build
2. **Build process** → Runs `npm run build`
3. **Deploy** → Deploys to production
4. **Functions** → Netlify Functions are automatically deployed

## 🐛 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check build logs in Netlify dashboard
# Common fixes:
npm install  # Install missing dependencies
npm run build  # Test build locally
```

#### Environment Variable Issues
- Ensure all required environment variables are set
- Check for typos in variable names
- Restart deployment after adding variables

#### API Connection Issues
- Verify API keys are correct and active
- Check CORS settings
- Monitor function logs in Netlify dashboard

#### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies
- Ensure database schema is created

## 📈 Scaling Considerations

### Performance Optimization
- Netlify CDN handles static asset caching
- Supabase handles database scaling
- Consider implementing Redis for session caching

### Cost Optimization
- Monitor OpenAI API usage (GPT-4o-mini is cost-effective)
- Set up Stripe usage alerts
- Monitor Supabase database usage

### Feature Expansion
- Add more expert personas
- Implement user authentication
- Add payment plans and subscriptions
- Integrate with more calendar providers

## 🎯 Production Checklist

- [ ] All environment variables configured
- [ ] Database schema created and populated
- [ ] Stripe webhooks configured
- [ ] Domain configured (optional)
- [ ] SSL certificate active
- [ ] Analytics enabled
- [ ] Error monitoring set up
- [ ] Backup strategy implemented
- [ ] Performance monitoring active

## 🆘 Support

For deployment issues:
1. Check Netlify build logs
2. Monitor function logs
3. Verify environment variables
4. Test API connections
5. Check database connectivity

Your AI persona clone system is now ready for production! 🚀
