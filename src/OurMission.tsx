import React from 'react';

const OurMission = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="bg-white">
      <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-bold text-neutral-900">
                meetexperts.co
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
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Mission</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Democratizing Expertise
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            We believe that everyone should have access to the world's top experts. Our mission is to make it easy for anyone to connect with the brightest minds in any field.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
