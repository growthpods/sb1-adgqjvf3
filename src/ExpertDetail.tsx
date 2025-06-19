import React, { useState } from 'react';
import { Star, Calendar, Clock, Video, MessageSquare, ArrowLeft } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

interface Expert {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  rate: number;
  rating: number;
  reviews: Review[];
  expertise: string[];
  nextAvailable: string;
  popular: boolean;
  about: string;
  experience: {
    title: string;
    company: string;
    duration: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
}

interface ExpertDetailProps {
  expert: Expert;
  onBack: () => void;
}

const ExpertDetail: React.FC<ExpertDetailProps> = ({ expert, onBack }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Generate available time slots
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '05:00 PM'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={onBack}
            className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Experts
          </button>
        </div>
      </div>

      {/* Expert Profile */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6 mb-8">
              <img 
                src={expert.image} 
                alt={expert.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              <div>
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">{expert.name}</h1>
                <p className="text-neutral-600 mb-2">{expert.title} at {expert.company}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-neutral-900 fill-current" />
                    <span className="ml-1 font-medium">{expert.rating}</span>
                    <span className="ml-1 text-neutral-600">({expert.reviews.length} reviews)</span>
                  </div>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-600">${expert.rate}/Session</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-12">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">About</h2>
              <p className="text-neutral-600 leading-relaxed">{expert.about}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Experience</h2>
              <div className="space-y-6">
                {expert.experience.map((exp, index) => (
                  <div key={index} className="flex">
                    <div className="w-2 h-2 mt-2 rounded-full bg-neutral-200 mr-4"></div>
                    <div>
                      <h3 className="font-medium text-neutral-900">{exp.title}</h3>
                      <p className="text-neutral-600">{exp.company}</p>
                      <p className="text-sm text-neutral-500">{exp.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Education</h2>
              <div className="space-y-6">
                {expert.education.map((edu, index) => (
                  <div key={index} className="flex">
                    <div className="w-2 h-2 mt-2 rounded-full bg-neutral-200 mr-4"></div>
                    <div>
                      <h3 className="font-medium text-neutral-900">{edu.degree}</h3>
                      <p className="text-neutral-600">{edu.school}</p>
                      <p className="text-sm text-neutral-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Reviews</h2>
              <div className="space-y-8">
                {expert.reviews.map((review) => (
                  <div key={review.id} className="border-b border-neutral-100 pb-8">
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.avatar}
                        alt={review.author}
                        className="w-12 h-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-neutral-900">{review.author}</h3>
                        <p className="text-sm text-neutral-600">{review.role}</p>
                      </div>
                      <div className="ml-auto text-sm text-neutral-500">
                        {review.date}
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-neutral-900' : 'text-neutral-200'} fill-current`}
                        />
                      ))}
                    </div>
                    <p className="text-neutral-600 leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white border border-neutral-100 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-neutral-900 mb-6">Book a Session</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <Video className="w-5 h-5 text-neutral-600 mr-3" />
                    <div>
                      <p className="font-medium text-neutral-900">Video Call</p>
                      <p className="text-sm text-neutral-600">60 minutes session</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-neutral-50 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-neutral-600 mr-3" />
                    <div>
                      <p className="font-medium text-neutral-900">Chat Support</p>
                      <p className="text-sm text-neutral-600">48 hours response time</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="w-5 h-5 text-neutral-600 mr-2" />
                    <span className="font-medium text-neutral-900">Select Date</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {[...Array(7)].map((_, i) => {
                      const date = new Date();
                      date.setDate(date.getDate() + i);
                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedDate(date)}
                          className={`p-2 text-center rounded-lg transition-colors duration-200
                            ${selectedDate?.getDate() === date.getDate()
                              ? 'bg-neutral-900 text-white'
                              : 'hover:bg-neutral-50 text-neutral-600'
                            }`}
                        >
                          <div className="text-xs mb-1">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </div>
                          <div className="font-medium">
                            {date.getDate()}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <Clock className="w-5 h-5 text-neutral-600 mr-2" />
                    <span className="font-medium text-neutral-900">Select Time</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-center rounded-lg transition-colors duration-200
                          ${selectedTime === time
                            ? 'bg-neutral-900 text-white'
                            : 'hover:bg-neutral-50 text-neutral-600 border border-neutral-100'
                          }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setShowBookingModal(true)}
                  disabled={!selectedDate || !selectedTime}
                  className="w-full bg-neutral-900 text-white py-3 rounded-lg font-medium
                    hover:bg-black transition-colors duration-200 disabled:bg-neutral-200
                    disabled:cursor-not-allowed"
                >
                  Request Meeting
                </button>

                <p className="text-sm text-neutral-500 text-center mt-4">
                  Next available: {expert.nextAvailable}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Confirm Your Booking</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-600">Expert</span>
                <span className="font-medium text-neutral-900">{expert.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Date</span>
                <span className="font-medium text-neutral-900">
                  {selectedDate?.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Time</span>
                <span className="font-medium text-neutral-900">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Session Fee</span>
                <span className="font-medium text-neutral-900">${expert.rate}</span>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowBookingModal(false)}
                className="flex-1 px-4 py-2 border border-neutral-200 rounded-lg
                  text-neutral-600 hover:bg-neutral-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle booking confirmation
                  setShowBookingModal(false);
                }}
                className="flex-1 px-4 py-2 bg-neutral-900 text-white rounded-lg
                  hover:bg-black transition-colors duration-200"
              >
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpertDetail; 