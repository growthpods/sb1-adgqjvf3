# Tech Context

## Core Technologies

### Frontend Stack
- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite (fast development and production builds)
- **Styling:** Tailwind CSS (utility-first CSS framework)
- **Package Manager:** npm
- **Linting:** ESLint with TypeScript support

### AI & API Integration
- **AI Model:** OpenAI GPT-4o-mini (cost-effective model for expert persona responses)
- **API Security:** Custom Node.js proxy server for secure API calls
- **Calendar Integration:** Cal.com API v1 for real meeting booking
- **Environment Management:** dotenv for secure API key storage

## Architecture

### Frontend Architecture
- **Component-Based:** React functional components with hooks
- **State Management:** React useState and useEffect hooks
- **Type Safety:** Full TypeScript implementation with strict typing
- **Responsive Design:** Tailwind CSS for mobile-first responsive design
- **Modern UI:** CSS animations, gradients, and interactive elements

### Backend/Proxy Architecture
- **Proxy Server:** Node.js Express server (`proxy.cjs`)
- **API Endpoints:**
  - `/api/openai` - Secure OpenAI API proxy
  - `/api/calcom` - Cal.com API proxy for booking
- **CORS Handling:** Proper cross-origin resource sharing configuration
- **Error Handling:** Graceful error responses and fallbacks

### Security Implementation
- **API Key Protection:** Environment variables stored in `.env` file
- **Proxy Pattern:** API keys never exposed to frontend
- **CORS Security:** Controlled access to backend endpoints
- **Input Validation:** Proper sanitization of user inputs

## Key Technical Files

### Core Components
- `src/MeetingConcierge.tsx` - Main AI persona chat component
- `src/App.tsx` - Main application component with routing
- `src/ExpertDetail.tsx` - Expert profile page with chat integration
- `src/mockData.ts` - Expert persona data and AI prompts

### Configuration & Setup
- `proxy.cjs` - Node.js proxy server for API calls
- `.env` - Environment variables (API keys)
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

### Styling & Assets
- `src/index.css` - Global styles and Tailwind imports
- `public/` - Static assets (images, logos)

## AI Persona System Technical Details

### OpenAI Integration
```typescript
// Cost-effective model selection
model: 'gpt-4o-mini'

// Expert persona prompting
const systemPrompt = `You are ${expert.name}, a ${expert.title} with expertise in ${expert.expertise.join(', ')}...`

// Secure API call via proxy
const response = await fetch('http://localhost:3001/api/openai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o-mini', messages: [...] })
});
```

### Interactive UI Implementation
```typescript
// Typing indicator with realistic timing
setIsTyping(true);
await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));

// Beautiful orb button with multiple states
<button className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 flex items-center justify-center">
```

### Cal.com Integration
```typescript
// Real booking API integration
const bookingData = {
  eventTypeId: eventTypeId,
  start: slotId,
  responses: { name: userInfo.name, email: userInfo.email },
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
};
```

## Development Workflow

### Local Development
1. **Frontend:** `npm run dev` (Vite dev server on port 5173)
2. **Proxy Server:** `node proxy.cjs` (API proxy on port 3001)
3. **Environment:** `.env` file with required API keys

### Production Considerations
- **API Keys:** Secure environment variable management
- **Proxy Deployment:** Node.js server deployment for API proxy
- **Build Optimization:** Vite production build with code splitting
- **Performance:** Optimized bundle size and lazy loading

## Performance Features
- **Fast Development:** Vite HMR for instant updates
- **Type Safety:** TypeScript prevents runtime errors
- **Optimized Builds:** Tree shaking and code splitting
- **Responsive Design:** Mobile-first approach with Tailwind
- **Smooth Animations:** CSS transitions and transforms for premium feel

The development environment is set up for a modern, scalable frontend workflow with AI integration, real-time chat features, and secure API handling.
