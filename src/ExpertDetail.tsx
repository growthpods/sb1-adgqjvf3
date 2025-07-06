import React, { useState } from 'react';
import { Star, Calendar, Clock, Video, MessageSquare, ArrowLeft } from 'lucide-react';
import { Expert, Review } from './types';
import MeetingConcierge from './MeetingConcierge';

interface ExpertDetailProps {
  expert: Expert;
  onBack: () => void;
  onBook: () => void;
}

const ExpertDetail: React.FC<ExpertDetailProps> = ({ expert, onBack, onBook }) => {
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
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <button 
              onClick={onBack}
              className="btn-secondary flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2">
            <div className="flex items-start space-x-6 mb-8">
              <img 
                src={expert.image} 
                alt={expert.name}
                className="w-24 h-24 rounded-full object-cover border border-neutral-100"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{expert.name}</h1>
                <p className="mb-2">{expert.title} at {expert.company}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-neutral-900 fill-current" />
                    <span className="ml-1 font-medium">{expert.rating}</span>
                    <span className="ml-1 text-neutral-500">({expert.reviews.length} reviews)</span>
                  </div>
                  <span className="text-neutral-300">•</span>
                  <span className="text-neutral-600">${expert.rate}/Session</span>
                </div>
              </div>
            </div>

            <div className="prose max-w-none mb-12">
              <h2 className="text-xl mb-4">About</h2>
              <p className="leading-relaxed">{expert.about}</p>
            </div>

            <div className="mb-12">
              <h2 className="text-xl mb-4">Experience</h2>
              <div className="space-y-6">
                {expert.experience.map((exp, index) => (
                  <div key={index} className="flex">
                    <div className="w-2 h-2 mt-2 rounded-full bg-neutral-200 mr-4"></div>
                    <div>
                      <h3 className="font-medium">{exp.title}</h3>
                      <p>{exp.company}</p>
                      <p className="text-sm text-neutral-500">{exp.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-xl mb-4">Education</h2>
              <div className="space-y-6">
                {expert.education.map((edu, index) => (
                  <div key={index} className="flex">
                    <div className="w-2 h-2 mt-2 rounded-full bg-neutral-200 mr-4"></div>
                    <div>
                      <h3 className="font-medium">{edu.degree}</h3>
                      <p>{edu.school}</p>
                      <p className="text-sm text-neutral-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl mb-4">Reviews</h2>
              <div className="space-y-6">
                {expert.reviews.map((review, index) => (
                  <div key={index} className="card">
                    <div className="flex items-center mb-4">
                      <img 
                        src={review.avatar} 
                        alt={review.author}
                        className="w-10 h-10 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium">{review.author}</h3>
                        <p className="text-sm text-neutral-500">{review.date}</p>
                      </div>
                      <div className="ml-auto flex items-center">
                        <Star className="w-4 h-4 text-neutral-900 fill-current" />
                        <span className="ml-1 font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p>{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <MeetingConcierge 
                expertCalcomUsername={expert.calcomUsername} 
                expertCalcomEventType={expert.calcomEventType}
                expertName={expert.name} 
              />
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
