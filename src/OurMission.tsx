import React from 'react';

const OurMission = ({ onBack }: { onBack: () => void }) => {
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
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Our Mission</h2>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Democratizing Expertise
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            We believe that everyone should have access to the world's top experts. Our mission is to make it easy for anyone to connect with the brightest minds in any field.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="mt-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-indigo-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-6">Our Vision</h3>
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                To create a world where knowledge flows freely, where geographical boundaries don't limit access to expertise, 
                and where both learners and experts can thrive in a connected global community.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Values</h2>
            <p className="mt-4 text-lg text-gray-500">The principles that guide everything we do</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Quality First</h3>
              <p className="mt-2 text-base text-gray-500">
                We carefully vet every expert to ensure you receive the highest quality advice and guidance.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Global Access</h3>
              <p className="mt-2 text-base text-gray-500">
                Breaking down barriers to connect people with expertise regardless of location or background.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Human Connection</h3>
              <p className="mt-2 text-base text-gray-500">
                Technology enables us, but human connection and empathy drive meaningful learning experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Continuous Growth</h3>
              <p className="mt-2 text-base text-gray-500">
                We believe in lifelong learning and helping both experts and learners continuously evolve.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Trust & Safety</h3>
              <p className="mt-2 text-base text-gray-500">
                Building a secure platform where both experts and learners feel safe to share and learn.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c-5 0-9-4-9-9s4-9 9-9" />
                </svg>
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Innovation</h3>
              <p className="mt-2 text-base text-gray-500">
                Constantly improving our platform with cutting-edge technology to enhance the learning experience.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Section */}
        <div className="mt-20">
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Our Impact</h2>
              <p className="mt-4 text-lg text-gray-500">Making a difference in the global learning community</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">10,000+</div>
                <div className="mt-2 text-lg font-medium text-gray-900">Expert Sessions</div>
                <div className="mt-1 text-base text-gray-500">Completed successfully</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">50+</div>
                <div className="mt-2 text-lg font-medium text-gray-900">Countries</div>
                <div className="mt-1 text-base text-gray-500">Connected through our platform</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600">98%</div>
                <div className="mt-2 text-lg font-medium text-gray-900">Satisfaction Rate</div>
                <div className="mt-1 text-base text-gray-500">From our community</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Built by Experts, for Everyone</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-3xl mx-auto">
              Our team combines decades of experience in technology, education, and human connection. 
              We're passionate about creating a platform that truly serves both experts and learners, 
              because we've been on both sides of the equation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
