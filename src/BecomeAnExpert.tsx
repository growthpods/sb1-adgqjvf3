import React from 'react';

const BecomeAnExpert = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <img src="/meetexperts-logo.svg" alt="MeetExperts" className="h-8" />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={onBack} className="text-neutral-600 hover:text-neutral-900">
                Back
              </button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Join us</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Become an Expert
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            Share your knowledge and experience with a global community of learners.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Earn Income</h3>
              <p className="mt-2 text-base text-gray-500">
                Set your own rates and earn money sharing your expertise with those who need it most.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Build Your Network</h3>
              <p className="mt-2 text-base text-gray-500">
                Connect with professionals worldwide and expand your professional network.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Flexible Schedule</h3>
              <p className="mt-2 text-base text-gray-500">
                Work on your own terms with complete control over your availability and schedule.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-500">Getting started is simple</p>
          </div>
          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto text-xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Apply</h3>
                <p className="mt-2 text-base text-gray-500">
                  Submit your application with your expertise and background
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto text-xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Get Approved</h3>
                <p className="mt-2 text-base text-gray-500">
                  Our team reviews your profile and expertise
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto text-xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Set Your Rate</h3>
                <p className="mt-2 text-base text-gray-500">
                  Choose your hourly rate and availability
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mx-auto text-xl font-bold">
                  4
                </div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Start Earning</h3>
                <p className="mt-2 text-base text-gray-500">
                  Begin helping others and earning income
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-indigo-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Ready to Share Your Expertise?</h2>
            <p className="mt-4 text-lg text-gray-500">
              Join thousands of experts who are already earning income by helping others succeed.
            </p>
            <div className="mt-8">
              <button 
                onClick={() => {
                  // Trigger expert signup flow
                  window.dispatchEvent(new CustomEvent('startExpertSignup'));
                }}
                className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Apply to Become an Expert
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Application review typically takes 2-3 business days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeAnExpert;
