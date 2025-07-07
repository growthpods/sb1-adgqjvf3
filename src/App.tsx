import React, { useState } from 'react';
import { ArrowRight, Search, User, Users, Calendar, Shield } from 'lucide-react';
import { executives } from './mockData';
import { Expert } from './types';
import ExpertDetail from './ExpertDetail';
import BecomeAnExpert from './BecomeAnExpert';
import OurMission from './OurMission';
import ExpertsList from './ExpertsList';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignUpForm from './components/auth/SignUpForm';
import OTPVerification from './components/auth/OTPVerification';
import LinkedInOnboarding from './components/auth/LinkedInOnboarding';
import SaaSAdminDashboard from './components/dashboard/SaaSAdminDashboard';

// Define the expert type for ExpertDetail
interface ExpertFromList {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  background: string;
  hourly_rate: number;
  image_url?: string;
  calcomUsername?: string;
  calcomEventType?: string;
}

const AppContent = () => {
  const [selectedExpert, setSelectedExpert] = useState<ExpertFromList | null>(null);
  const [currentView, setCurrentView] = useState('home');
  const [authFlow, setAuthFlow] = useState<'signup' | 'signin' | 'otp' | 'linkedin' | null>(null);
  const [otpEmail, setOtpEmail] = useState('');
  const [otpPurpose, setOtpPurpose] = useState<'registration' | 'booking' | 'login'>('login');
  
  const { user, loading, signOut, sendOTP, verifyOTP, signIn } = useAuth();

  // Listen for expert signup event at the top level
  React.useEffect(() => {
    const handleExpertSignup = () => {
      setAuthFlow('signup');
    };
    
    window.addEventListener('startExpertSignup', handleExpertSignup);
    return () => window.removeEventListener('startExpertSignup', handleExpertSignup);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, show appropriate dashboard
  if (user) {
    if (user.role === 'saas_admin') {
      return <SaaSAdminDashboard />;
    }
    
    if (user.role === 'expert') {
      // Check if expert needs LinkedIn onboarding
      if (!user.linkedin_url) {
        return <LinkedInOnboarding onSuccess={() => setCurrentView('home')} />;
      }
      // TODO: Show expert dashboard
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Expert Dashboard</h1>
            <p className="text-gray-600 mb-4">Welcome, {user.first_name}!</p>
            <p className="text-sm text-gray-500 mb-4">Status: {user.status}</p>
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      );
    }
    
    // Regular user dashboard
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h1>
          <p className="text-gray-600 mb-4">Welcome, {user.first_name}!</p>
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Auth flows
  if (authFlow === 'signup') {
    return (
      <SignUpForm
        onSuccess={() => {
          setAuthFlow('linkedin');
        }}
        onSwitchToLogin={() => setAuthFlow('signin')}
      />
    );
  }

  if (authFlow === 'otp') {
    return (
      <OTPVerification
        email={otpEmail}
        purpose={otpPurpose}
        onSuccess={async () => {
          if (otpPurpose === 'login') {
            // After OTP verification for login, sign them in
            try {
              // Create a temporary password for OTP-based login
              const tempPassword = Math.random().toString(36).slice(-8);
              await signIn(otpEmail, tempPassword);
            } catch (error) {
              console.error('Login error:', error);
            }
          }
          setAuthFlow(null);
        }}
        onBack={() => setAuthFlow('signin')}
      />
    );
  }

  if (authFlow === 'signin') {
    return <SignInForm onOTPSent={(email) => {
      setOtpEmail(email);
      setOtpPurpose('login');
      setAuthFlow('otp');
    }} onBack={() => setAuthFlow(null)} />;
  }

  // Main app views
  if (selectedExpert) {
    return <ExpertDetail expert={selectedExpert} onBack={() => setSelectedExpert(null)} onBook={() => {}} />;
  }

  if (currentView === 'become-an-expert') {
    return <BecomeAnExpert onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'our-mission') {
    return <OurMission onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'experts-list') {
    return <ExpertsList 
      onBack={() => setCurrentView('home')} 
      onExpertSelect={(expert: any) => {
        // Convert the Supabase expert to ExpertFromList type for ExpertDetail
        const convertedExpert: ExpertFromList = {
          id: expert.id,
          name: expert.name,
          title: expert.title,
          expertise: expert.expertise || [],
          background: expert.background || '',
          hourly_rate: expert.hourly_rate || 15000, // Default $150/hour in cents
          image_url: expert.image_url,
          calcomUsername: expert.calcom_username,
          calcomEventType: expert.calcom_event_type
        };
        setSelectedExpert(convertedExpert);
      }}
    />;
  }

  // Home page
  return (
    <div className="bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button onClick={() => setCurrentView('home')} className="flex items-center">
                <img src="/logos/logo.png" alt="MeetExperts" className="h-8" />
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => setCurrentView('become-an-expert')} className="text-neutral-600 hover:text-neutral-900">
                Become an Expert
              </button>
              <button onClick={() => setCurrentView('our-mission')} className="text-neutral-600 hover:text-neutral-900">
                Our Mission
              </button>
              <button onClick={() => setAuthFlow('signin')} className="bg-neutral-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-800">
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative bg-black">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80')", opacity: 0.5 }}
          ></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Book the world's most in-demand experts & get advice over a video call
            </h1>
            <div className="mt-8">
              <button
                onClick={() => setCurrentView('experts-list')}
                className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold text-lg hover:bg-neutral-100"
              >
                Find an Expert
              </button>
            </div>
          </div>
        </div>

        {/* Logos Section */}
        <div className="bg-white pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
              <div className="col-span-1 flex justify-center">
                <img className="h-8" src="/logos/wsj-logo.svg" alt="WSJ" />
              </div>
              <div className="col-span-1 flex justify-center">
                <img className="h-8" src="/logos/ad-logo.svg" alt="AD" />
              </div>
              <div className="col-span-1 flex justify-center">
                <img className="h-8" src="/logos/bustle-logo.svg" alt="Bustle" />
              </div>
              <div className="col-span-1 flex justify-center">
                <img className="h-8" src="/logos/fastcompany-logo.svg" alt="Fast Company" />
              </div>
              <div className="col-span-1 flex justify-center">
                <img className="h-8" src="/logos/forbes-logo.svg" alt="Forbes" />
              </div>
            </div>
          </div>
        </div>

        {/* Value Propositions Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Get access to the world's best</h3>
                <p className="mt-2 text-base text-gray-500">
                  Choose from our list of the top experts in a variety of topics
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Personalized advice just for you</h3>
                <p className="mt-2 text-base text-gray-500">
                  Book a 1-on-1 virtual session & get advice that is tailored to you
                </p>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">Save time and money, guaranteed</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our guarantee - find value in your first session or your money back
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Experts Section */}
        <div className="bg-neutral-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Top Experts. Access to the best has never been easier</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executives.map((expert) => (
                <ExpertCard 
                  key={expert.id} 
                  expert={expert} 
                  onViewProfile={(expert: Expert) => {
                    // Convert Expert from mockData to ExpertFromList for ExpertDetail
                    const convertedExpert: ExpertFromList = {
                      id: expert.id.toString(),
                      name: expert.name,
                      title: expert.title,
                      expertise: expert.expertise || [],
                      background: expert.about || '',
                      hourly_rate: expert.rate * 100, // Convert to cents
                      image_url: expert.image,
                      calcomUsername: expert.calcomUsername,
                      calcomEventType: expert.calcomEventType
                    };
                    setSelectedExpert(convertedExpert);
                  }} 
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-neutral-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Experts by</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Marketing</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">CTOs</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">SaaS</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">CIOs</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">CXOs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Our Mission</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">For Experts</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Become an Expert</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Expert Login</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-neutral-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-base text-neutral-300 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 3.692c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.167a4.833 4.833 0 100 9.666 4.833 4.833 0 000-9.666zM12 15.333a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-300">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
            <p className="mt-8 text-base text-neutral-400 md:mt-0 md:order-1">
              &copy; 2024 meetexperts.co, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Simple Sign In Form Component
const SignInForm = ({ onOTPSent, onBack }: { onOTPSent: (email: string) => void; onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { sendOTP } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await sendOTP(email, 'login');
      onOTPSent(email);
    } catch (error: any) {
      setError(error.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we'll send you a verification code
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-indigo-600 hover:text-indigo-500 text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ExpertCard = ({ expert, onViewProfile }: { expert: Expert, onViewProfile: (expert: Expert) => void }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
    <img src={expert.image} alt={expert.name} className="w-full h-56 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{expert.name}</h3>
      <p className="text-neutral-600 mb-4">{expert.title}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">${expert.rate}/hour</span>
        <button onClick={() => onViewProfile(expert)} className="text-sm font-semibold text-neutral-900 hover:text-neutral-700">
          View Profile
        </button>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
