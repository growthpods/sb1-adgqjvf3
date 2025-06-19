import React, { useState } from 'react';
import { ArrowRight, Users, Shield, Calendar, Star, CheckCircle, Menu, X, Clock, Video, Phone, MessageSquare, Filter, Search, Linkedin, Mail, PhoneIcon, ChevronLeft, ChevronRight, UserCircle2 as User } from 'lucide-react';
import ExpertDetail from './ExpertDetail';
import { Expert } from './types';
import { executives } from './mockData';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'executives', 'join-executive', 'expert-detail'
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleBrowseExecutives = () => {
    setCurrentView('executives');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedExpert(null);
  };

  const handleJoinAsExecutive = () => {
    setCurrentView('join-executive');
  };

  const handleBookVideoCall = (executive: Expert) => {
    setSelectedExpert(executive);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedExpert(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleViewExpertDetail = (expert: Expert) => {
    setSelectedExpert(expert);
    setCurrentView('expert-detail');
  };

  const handleBackToExecutives = () => {
    setSelectedExpert(null);
    setCurrentView('executives');
  };

  // Calendar data
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM"
  ];

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === currentDate.toDateString();
      const isPast = date < currentDate;
      days.push({ day, date, isToday, isPast });
    }

    return days;
  };

  const BookingModal = () => {
    if (!showBookingModal || !selectedExpert) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={selectedExpert.image} 
                  alt={selectedExpert.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Book Video Call with {selectedExpert.name}
                  </h2>
                  <p className="text-slate-600">{selectedExpert.title} at {selectedExpert.company}</p>
                  <p className="text-lg font-semibold text-slate-900">${selectedExpert.rate}/hour</p>
                </div>
              </div>
              <button 
                onClick={closeBookingModal}
                className="text-slate-400 hover:text-slate-600 p-2"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Select Date</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <span className="font-medium text-slate-900">
                      {monthNames[currentMonth]} {currentYear}
                    </span>
                    <button className="p-2 hover:bg-slate-100 rounded-lg">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-slate-500">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((dayData, index) => (
                    <div key={index} className="aspect-square">
                      {dayData && (
                        <button
                          onClick={() => !dayData.isPast && setSelectedDate(dayData.date)}
                          disabled={dayData.isPast}
                          className={`w-full h-full rounded-lg text-sm font-medium transition-colors ${
                            dayData.isPast
                              ? 'text-slate-300 cursor-not-allowed'
                              : selectedDate?.toDateString() === dayData.date.toDateString()
                              ? 'bg-slate-800 text-white'
                              : dayData.isToday
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                              : 'text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {dayData.day}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-6">
                  {selectedDate ? `Available Times - ${selectedDate.toLocaleDateString()}` : 'Select a date first'}
                </h3>
                
                {selectedDate ? (
                  <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? 'bg-slate-800 text-white'
                            : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                    <p>Please select a date to view available time slots</p>
                  </div>
                )}
              </div>
            </div>

            {/* Booking Summary & Confirm */}
            {selectedDate && selectedTime && (
              <div className="mt-8 p-6 bg-slate-50 rounded-xl">
                <h4 className="font-semibold text-slate-900 mb-4">Booking Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Executive:</span>
                    <span className="font-medium">{selectedExpert.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Date:</span>
                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Duration:</span>
                    <span className="font-medium">1 hour</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                    <span className="font-semibold">Total:</span>
                    <span className="font-semibold text-lg">${selectedExpert.rate}</span>
                  </div>
                </div>
                
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors mt-6">
                  Confirm & Pay ${selectedExpert.rate}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const ExecutiveCard = ({ exec, isCompact = false }: { exec: Expert; isCompact?: boolean }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${isCompact ? 'w-80 flex-shrink-0' : 'w-full'}`}>
      {exec.popular && (
        <div className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-t-xl text-center">
          POPULAR
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img 
              src={exec.image} 
              alt={exec.name}
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{exec.name}</h3>
              <p className="text-slate-600 text-sm">{exec.title}</p>
              <p className="text-slate-500 text-xs">{exec.company}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">${exec.rate}</div>
            <div className="text-sm text-slate-500">/hour</div>
          </div>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <Star className="h-4 w-4 text-amber-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-slate-700">{exec.rating}</span>
            <span className="ml-1 text-sm text-slate-500">({exec.reviews})</span>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Available {exec.nextAvailable}
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {exec.expertise.slice(0, 3).map((skill: string, index: number) => (
              <span 
                key={index} 
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-50 text-neutral-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={() => handleBookVideoCall(exec)}
            className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors flex items-center justify-center"
          >
            <Video className="h-4 w-4 mr-2" />
            Book Video Call
          </button>
          <div className="flex space-x-2">
            <button className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center">
              <Phone className="h-4 w-4 mr-1" />
              Phone
            </button>
            <button className="flex-1 border border-slate-200 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center justify-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Join as Executive View
  if (currentView === 'join-executive') {
    return (
      <div className="bg-white">
        {/* Hero Section */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
            <div className="absolute inset-0 opacity-60" style={{
              backgroundImage: `radial-gradient(circle at 12px 12px, rgba(255,255,255,0.18) 4px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          <div className="relative w-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-neutral-100 mb-6 leading-tight">
              Share Your Expertise
            </h1>
            <p className="text-xl text-neutral-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join our network of industry leaders and help professionals grow through personalized guidance and mentorship.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Benefits Section */}
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">Why Join Us?</h2>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="mt-1 bg-neutral-100 p-2 rounded-lg">
                    <Users className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Connect with Professionals</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Share your knowledge and experience with professionals seeking guidance in your area of expertise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-neutral-100 p-2 rounded-lg">
                    <Clock className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Flexible Schedule</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Set your own availability and manage your calendar to balance consulting with your existing commitments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-neutral-100 p-2 rounded-lg">
                    <Star className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Build Your Brand</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Establish yourself as a thought leader and expand your professional network while helping others succeed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-neutral-100 p-2 rounded-lg">
                    <Shield className="w-6 h-6 text-neutral-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
                    <p className="text-neutral-600 leading-relaxed">
                      Our platform handles scheduling, payments, and communication, so you can focus on what matters most - sharing your expertise.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-neutral-50 p-8 rounded-2xl">
              <h2 className="text-3xl font-bold text-neutral-900 mb-8">Apply to Join</h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    placeholder="Enter your LinkedIn URL"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Areas of Expertise</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 h-32"
                    placeholder="Describe your areas of expertise and experience"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Hourly Rate (USD)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500"
                    placeholder="Enter your desired hourly rate"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-neutral-800 transition-colors duration-200"
                >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="bg-neutral-50 py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">Join Our Expert Community</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Our experts come from leading companies and bring years of experience in their respective fields.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-60">
              <img src="/logos/wsj-logo.svg" alt="Wall Street Journal" className="h-5 md:h-6" />
              <img src="/logos/ad-logo.svg" alt="Architectural Digest" className="h-5 md:h-6" />
              <img src="/logos/bustle-logo.svg" alt="Bustle" className="h-5 md:h-6" />
              <img src="/logos/fastcompany-logo.svg" alt="Fast Company" className="h-5 md:h-6" />
              <img src="/logos/forbes-logo.svg" alt="Forbes" className="h-5 md:h-6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'executives') {
    return (
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <button 
                  onClick={handleBackToHome}
                  className="flex-shrink-0 flex items-center cursor-pointer"
                >
                  <Users className="h-8 w-8 text-amber-500" />
                  <span className="ml-2 text-xl font-bold text-slate-800">ExecutiveConnect</span>
                </button>
              </div>
              
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  <button onClick={handleBackToHome} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">Home</button>
                  <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">How It Works</a>
                  <a href="#testimonials" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">Reviews</a>
                  <button 
                    onClick={handleJoinAsExecutive}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors"
                  >
                    Join as Executive
                  </button>
                </div>
              </div>
              
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-slate-600 hover:text-slate-900 p-2"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* All Executives Page */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                All Executives
              </h1>
              <p className="text-xl text-slate-600">
                Browse and book 1-on-1 calls with {executives.length} verified C-suite leaders
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search executives..."
                  className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <div
                key={exec.id}
                onClick={() => handleViewExpertDetail(exec)}
                className="cursor-pointer"
              >
                <ExecutiveCard exec={exec} />
              </div>
            ))}
          </div>
        </div>

        {/* Booking Modal */}
        <BookingModal />
      </div>
    );
  }

  if (currentView === 'expert-detail' && selectedExpert) {
    return (
      <ExpertDetail 
        expert={selectedExpert} 
        onBack={handleBackToExecutives}
        onBook={() => {/* Implement booking logic */}}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={handleBackToHome}
                className="text-xl font-semibold text-neutral-900"
              >
                meetexperts.co
              </button>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={handleJoinAsExecutive}
                className="btn-secondary"
              >
                Become an Expert
              </button>
              <a href="#" className="btn-secondary">
                Our Mission
              </a>
              <button className="p-2 rounded-full hover:bg-neutral-50">
                <Search className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-neutral-50">
                <User className="w-5 h-5 text-neutral-600" />
              </button>
              <button className="btn-primary">
                Sign up
              </button>
            </div>
            <button
              className="md:hidden p-2 hover:bg-neutral-50 rounded-full transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-neutral-600" />
              ) : (
                <Menu className="w-6 h-6 text-neutral-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleJoinAsExecutive}
              className="text-neutral-600 hover:text-neutral-900 py-2 transition-colors duration-200"
            >
              Become an Expert
            </button>
            <a href="#" className="text-neutral-600 hover:text-neutral-900 py-2 transition-colors duration-200">
              Our Mission
            </a>
            <button className="bg-neutral-900 text-white px-6 py-2.5 rounded-lg hover:bg-black w-full transition-all duration-200">
              Sign up
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <div className="relative min-h-[500px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700">
              <div className="absolute inset-0 opacity-60" style={{
                backgroundImage: `radial-gradient(circle at 12px 12px, rgba(255,255,255,0.18) 4px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            <div className="relative w-full flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-neutral-100 mb-6 leading-tight">
                Connect with Top Industry Experts
              </h1>
              <p className="text-xl text-neutral-300 mb-8 max-w-xl mx-auto leading-relaxed">
                Book 1:1 video calls with accomplished executives and industry leaders for personalized guidance and insights.
              </p>
              <button
                onClick={handleBrowseExecutives}
                className="bg-white text-neutral-900 px-8 py-4 rounded-lg font-medium inline-flex items-center hover:bg-neutral-100 border border-neutral-200 transition-colors duration-200"
              >
                Browse Experts
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>

          {/* Popular Experts Section */}
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-900 mb-4">Top Experts</h2>
                  <p className="text-neutral-500">Book a session with our most sought-after industry leaders</p>
                </div>
                <button
                  onClick={handleBrowseExecutives}
                  className="btn-secondary hidden sm:flex items-center"
                >
                  View All
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {executives.filter(exec => exec.popular).map((exec) => (
                  <div
                    key={exec.id}
                    onClick={() => handleViewExpertDetail(exec)}
                    className="cursor-pointer group"
                  >
                    <div className="card">
                      <div className="flex items-start space-x-4 mb-4">
                        <img 
                          src={exec.image} 
                          alt={exec.name}
                          className="w-16 h-16 rounded-full object-cover border border-neutral-100"
                        />
                        <div>
                          <h3 className="font-medium group-hover:text-black transition-colors duration-200">
                            {exec.name}
                          </h3>
                          <p className="text-sm mb-1">{exec.title}</p>
                          <p className="text-sm text-neutral-500">{exec.company}</p>
                        </div>
                        <div className="ml-auto text-right">
                          <span className="font-medium">${exec.rate}</span>
                          <span className="text-neutral-500 text-xs">/hour</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exec.expertise.slice(0, 3).map((skill: string, index: number) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-50 text-neutral-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center sm:hidden">
                <button
                  onClick={handleBrowseExecutives}
                  className="btn-secondary inline-flex items-center"
                >
                  View All
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Press Section */}
          <div className="bg-neutral-50 py-20">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-12 items-center justify-items-center opacity-60">
                <img src="/logos/wsj-logo.svg" alt="Wall Street Journal" className="h-5 md:h-6" />
                <img src="/logos/ad-logo.svg" alt="Architectural Digest" className="h-5 md:h-6" />
                <img src="/logos/bustle-logo.svg" alt="Bustle" className="h-5 md:h-6" />
                <img src="/logos/fastcompany-logo.svg" alt="Fast Company" className="h-5 md:h-6" />
                <img src="/logos/forbes-logo.svg" alt="Forbes" className="h-5 md:h-6" />
              </div>
            </div>
          </div>

          {/* Value Props */}
          <div className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                <div>
                  <h3 className="text-xl mb-4">
                    Get access to the world's best
                  </h3>
                  <p className="leading-relaxed">
                    Connect with top experts in their field for personalized guidance.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-4">
                    Personalized advice just for you
                  </h3>
                  <p className="leading-relaxed">
                    Get tailored solutions and insights specific to your needs.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-4">
                    Save time and money, guaranteed
                  </h3>
                  <p className="leading-relaxed">
                    Make informed decisions with expert guidance at your fingertips.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'executives' && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Browse Experts</h1>
            <button
              onClick={handleJoinAsExecutive}
              className="btn-secondary"
            >
              Become an Expert
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((exec) => (
              <div
                key={exec.id}
                onClick={() => handleViewExpertDetail(exec)}
                className="cursor-pointer"
              >
                <div className="card">
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={exec.image} 
                      alt={exec.name}
                      className="w-16 h-16 rounded-full object-cover border border-neutral-100"
                    />
                    <div>
                      <h3 className="font-medium">{exec.name}</h3>
                      <p className="text-sm mb-1">{exec.title}</p>
                      <p className="text-sm text-neutral-500">{exec.company}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <span className="font-medium">${exec.rate}</span>
                      <span className="text-neutral-500 text-xs">/hour</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exec.expertise.slice(0, 3).map((skill: string, index: number) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-50 text-neutral-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {currentView === 'join-executive' && (
        <div className="max-w-3xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Become an Expert</h1>
          <p className="mb-8">
            Share your expertise with professionals seeking guidance. Join our platform of industry leaders.
          </p>
          <button className="btn-primary">
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
}

// Expert Card Component
interface ExpertCardProps {
  expert: Expert;
}

const ExpertCard: React.FC<ExpertCardProps> = ({ expert }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100">
    <div className="relative">
      <img src={expert.image} alt={expert.name} className="w-full h-64 object-cover" />
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-neutral-900">
        Top Expert
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center mb-3">
        <h3 className="font-medium text-lg text-neutral-900 group-hover:text-black transition-colors duration-200">
          {expert.name}
        </h3>
        <div className="ml-auto flex items-center bg-neutral-50 px-2 py-1 rounded-full">
          <span className="text-neutral-900">★</span>
          <span className="ml-1 text-sm font-medium text-neutral-700">{expert.rating}</span>
        </div>
      </div>
      <p className="text-neutral-900 font-medium mb-2">${expert.rate}/Session</p>
      <p className="text-neutral-600 mb-4">{expert.title}</p>
      <div className="flex flex-wrap gap-2">
        {expert.expertise.map((skill: string, index: number) => (
          <span 
            key={index} 
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-neutral-50 text-neutral-700 group-hover:bg-neutral-100 transition-colors duration-200"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default App;