import React, { useState } from 'react';
import { Star, Calendar, Clock, Video, MessageSquare, ArrowLeft, Mail, Phone, Globe } from 'lucide-react';
import MeetingConcierge from './MeetingConcierge';

// Define the expert type that matches what we get from ExpertsList
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

interface ExpertDetailProps {
  expert: ExpertFromList;
  onBack: () => void;
  onBook?: () => void;
}

const ExpertDetail: React.FC<ExpertDetailProps> = ({ expert, onBack, onBook }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showAIChat, setShowAIChat] = useState(false);

  // Generate expert image
  const getExpertImage = () => {
    if (expert.image_url) return expert.image_url;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name)}&background=6366f1&color=fff&size=200`;
  };

  // Check if expert has AI chat capability (Cal.com integration)
  const hasAIChat = expert.calcomUsername && expert.calcomEventType;

  // Mock data for demonstration - in a real app, this would come from the database
  const mockExperience = [
    {
      title: "Senior " + expert.title,
      company: "Tech Company",
      duration: "2020 - Present",
      description: "Leading strategic initiatives and driving innovation in the field."
    },
    {
      title: expert.title,
      company: "Previous Company",
      duration: "2018 - 2020",
      description: "Developed expertise and delivered exceptional results."
    }
  ];

  const mockEducation = [
    {
      degree: "Master's Degree",
      school: "Top University",
      year: "2018",
      field: "Related Field"
    },
    {
      degree: "Bachelor's Degree", 
      school: "University",
      year: "2016",
      field: "Core Field"
    }
  ];

  const mockReviews = [
    {
      author: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      content: "Exceptional expertise and clear communication. Highly recommend!",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Johnson&background=f3f4f6&color=374151"
    },
    {
      author: "Michael Chen",
      rating: 5,
      date: "1 month ago", 
      content: "Incredibly knowledgeable and provided actionable insights that transformed our approach.",
      avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=f3f4f6&color=374151"
    },
    {
      author: "Emily Rodriguez",
      rating: 4,
      date: "2 months ago",
      content: "Great session with practical advice. Would definitely book again.",
      avatar: "https://ui-avatars.com/api/?name=Emily+Rodriguez&background=f3f4f6&color=374151"
    }
  ];

  const averageRating = 4.8;
  const totalReviews = mockReviews.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Experts
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            {/* Header Section */}
            <div className="flex items-start space-x-6 mb-8">
              <img 
                src={getExpertImage()} 
                alt={expert.name}
                className="w-24 h-24 rounded-full object-cover border border-neutral-100"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{expert.name}</h1>
                <p className="text-xl text-gray-600 mb-4">{expert.title}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-medium">{averageRating}</span>
                    <span className="ml-1 text-gray-500">({totalReviews} reviews)</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <span className="text-gray-600">${expert.hourly_rate / 100}/hour</span>
                </div>
                
                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4">About</h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {expert.background}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  With extensive experience in {expert.expertise.join(', ')}, I help individuals and organizations 
                  achieve their goals through personalized guidance and strategic insights. My approach combines 
                  practical experience with proven methodologies to deliver actionable results.
                </p>
              </div>
            </div>

            {/* Experience Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Experience</h2>
              <div className="space-y-6">
                {mockExperience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-indigo-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-indigo-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-6">
                {mockEducation.map((edu, index) => (
                  <div key={index} className="border-l-4 border-green-200 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-green-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.year} • {edu.field}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Reviews</h2>
              <div className="space-y-6">
                {mockReviews.map((review, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.avatar} 
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{review.author}</h3>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ${expert.hourly_rate / 100}
                  </div>
                  <p className="text-gray-600">per hour session</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Video className="w-5 h-5 mr-3" />
                    <span>1-on-1 video call</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-3" />
                    <span>60 minutes</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MessageSquare className="w-5 h-5 mr-3" />
                    <span>Follow-up support</span>
                  </div>
                </div>

                {hasAIChat ? (
                  <button
                    onClick={() => setShowAIChat(true)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mb-3"
                  >
                    Chat with {expert.name}
                  </button>
                ) : (
                  <button
                    onClick={() => setShowBookingModal(true)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Book Session
                  </button>
                )}

                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    First two questions are completely free
                  </p>
                </div>

                {/* Contact Options */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Contact</h3>
                  <div className="space-y-2">
                    <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAIChat && hasAIChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setShowAIChat(false)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <MeetingConcierge
              expertId={expert.id}
              expertCalcomUsername={expert.calcomUsername}
              expertCalcomEventType={expert.calcomEventType}
              expertName={expert.name}
            />
          </div>
        </div>
      )}

      {/* Basic Booking Modal (for experts without AI chat) */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Book a Session</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Expert</span>
                <span className="font-medium text-gray-900">{expert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration</span>
                <span className="font-medium text-gray-900">60 minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session Fee</span>
                <span className="font-medium text-gray-900">${expert.hourly_rate / 100}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800 text-sm">
                <strong>Next Step:</strong> You'll be redirected to schedule your session and complete payment securely.
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In a real app, this would redirect to payment/scheduling
                  alert('Booking system integration would go here!');
                  setShowBookingModal(false);
                }}
                className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Continue to Book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDetail;
