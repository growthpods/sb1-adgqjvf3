import React, { useState } from 'react';
import { ArrowRight, Users, Shield, Calendar, Star, CheckCircle, Menu, X, Clock, Video, Phone, MessageSquare, Filter, Search, Linkedin, Mail, PhoneIcon, ChevronLeft, ChevronRight, UserCircle2 as User } from 'lucide-react';
import ExpertDetail from './ExpertDetail';
import { expertData } from './mockData';

interface Expert {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  rate: number;
  rating: number;
  reviews: number;
  expertise: string[];
  nextAvailable: string;
  popular: boolean;
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'executives', 'join-executive', 'expert-detail'
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedExecutive, setSelectedExecutive] = useState<Expert | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const executives = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "CEO",
      company: "TechVentures Inc.",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 800,
      rating: 4.9,
      reviews: 127,
      expertise: ["Strategy", "Scaling", "Fundraising"],
      nextAvailable: "Today 3:00 PM",
      popular: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Board Member",
      company: "Fortune 500 Companies",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 650,
      rating: 4.8,
      reviews: 89,
      expertise: ["Governance", "M&A", "Risk Management"],
      nextAvailable: "Tomorrow 10:00 AM",
      popular: true
    },
    {
      id: 3,
      name: "Jennifer Park",
      title: "CFO",
      company: "Global Industries",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 500,
      rating: 4.9,
      reviews: 156,
      expertise: ["Finance", "IPO", "Financial Strategy"],
      nextAvailable: "Today 5:30 PM",
      popular: true
    },
    {
      id: 4,
      name: "David Thompson",
      title: "CEO",
      company: "Healthcare Innovations",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 750,
      rating: 4.7,
      reviews: 94,
      expertise: ["Healthcare", "Innovation", "Regulatory"],
      nextAvailable: "Tomorrow 2:00 PM",
      popular: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "CTO",
      company: "AI Solutions Corp",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 600,
      rating: 4.8,
      reviews: 112,
      expertise: ["Technology", "AI/ML", "Digital Transformation"],
      nextAvailable: "Today 4:15 PM",
      popular: true
    },
    {
      id: 6,
      name: "Robert Kim",
      title: "Chairman",
      company: "Investment Holdings",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 900,
      rating: 4.9,
      reviews: 73,
      expertise: ["Investment", "Private Equity", "Board Strategy"],
      nextAvailable: "Tomorrow 11:30 AM",
      popular: true
    },
    {
      id: 7,
      name: "Amanda Foster",
      title: "CMO",
      company: "Brand Dynamics",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 550,
      rating: 4.7,
      reviews: 98,
      expertise: ["Marketing", "Brand Strategy", "Growth"],
      nextAvailable: "Today 6:00 PM",
      popular: true
    },
    {
      id: 8,
      name: "James Mitchell",
      title: "CEO",
      company: "FinTech Solutions",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 720,
      rating: 4.8,
      reviews: 134,
      expertise: ["FinTech", "Payments", "Regulation"],
      nextAvailable: "Tomorrow 9:00 AM",
      popular: true
    },
    {
      id: 9,
      name: "Rachel Green",
      title: "Board Director",
      company: "Multiple Boards",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 680,
      rating: 4.9,
      reviews: 87,
      expertise: ["Board Governance", "ESG", "Compliance"],
      nextAvailable: "Today 7:30 PM",
      popular: true
    },
    {
      id: 10,
      name: "Thomas Anderson",
      title: "COO",
      company: "Manufacturing Corp",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 580,
      rating: 4.6,
      reviews: 76,
      expertise: ["Operations", "Supply Chain", "Manufacturing"],
      nextAvailable: "Tomorrow 1:00 PM",
      popular: true
    },
    {
      id: 11,
      name: "Maria Gonzalez",
      title: "CEO",
      company: "Retail Innovations",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 640,
      rating: 4.8,
      reviews: 119,
      expertise: ["Retail", "E-commerce", "Customer Experience"],
      nextAvailable: "Today 8:00 PM",
      popular: true
    },
    {
      id: 12,
      name: "Kevin O'Brien",
      title: "CFO",
      company: "Energy Ventures",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 590,
      rating: 4.7,
      reviews: 102,
      expertise: ["Energy", "Sustainability", "Finance"],
      nextAvailable: "Tomorrow 3:30 PM",
      popular: false
    },
    {
      id: 13,
      name: "Priya Sharma",
      title: "CTO",
      company: "Cloud Systems",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 620,
      rating: 4.9,
      reviews: 145,
      expertise: ["Cloud", "DevOps", "Architecture"],
      nextAvailable: "Today 9:15 PM",
      popular: false
    },
    {
      id: 14,
      name: "Daniel Wright",
      title: "Chairman",
      company: "Aerospace Holdings",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 850,
      rating: 4.8,
      reviews: 67,
      expertise: ["Aerospace", "Defense", "Innovation"],
      nextAvailable: "Tomorrow 4:00 PM",
      popular: false
    },
    {
      id: 15,
      name: "Sophie Laurent",
      title: "CEO",
      company: "Luxury Brands",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 700,
      rating: 4.9,
      reviews: 91,
      expertise: ["Luxury", "Brand Management", "International"],
      nextAvailable: "Today 10:30 PM",
      popular: false
    },
    {
      id: 16,
      name: "Marcus Johnson",
      title: "Board Member",
      company: "Tech Startups",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 560,
      rating: 4.6,
      reviews: 83,
      expertise: ["Startups", "Venture Capital", "Mentoring"],
      nextAvailable: "Tomorrow 5:15 PM",
      popular: false
    },
    {
      id: 17,
      name: "Elena Petrov",
      title: "CFO",
      company: "Biotech Innovations",
      image: "https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 670,
      rating: 4.8,
      reviews: 108,
      expertise: ["Biotech", "R&D Finance", "IPO"],
      nextAvailable: "Today 11:45 PM",
      popular: false
    },
    {
      id: 18,
      name: "Richard Stone",
      title: "CEO",
      company: "Real Estate Empire",
      image: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 780,
      rating: 4.7,
      reviews: 95,
      expertise: ["Real Estate", "Development", "Investment"],
      nextAvailable: "Tomorrow 6:00 PM",
      popular: false
    },
    {
      id: 19,
      name: "Catherine Lee",
      title: "COO",
      company: "Media Networks",
      image: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 610,
      rating: 4.8,
      reviews: 124,
      expertise: ["Media", "Content Strategy", "Operations"],
      nextAvailable: "Today 12:30 AM",
      popular: false
    },
    {
      id: 20,
      name: "Alexander Volkov",
      title: "Chairman",
      company: "Global Consulting",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300",
      rate: 920,
      rating: 4.9,
      reviews: 156,
      expertise: ["Strategy", "Transformation", "Global Markets"],
      nextAvailable: "Tomorrow 7:30 PM",
      popular: false
    }
  ];

  const popularExecutives = executives.filter(exec => exec.popular);

  const handleBrowseExecutives = () => {
    setCurrentView('executives');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleJoinAsExecutive = () => {
    setCurrentView('join-executive');
  };

  const handleBookVideoCall = (executive: Expert) => {
    setSelectedExecutive(executive);
    setShowBookingModal(true);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setSelectedExecutive(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleViewExpertDetail = (expert: Expert) => {
    setSelectedExecutive(expert);
    setCurrentView('expert-detail');
  };

  const handleBackToExecutives = () => {
    setSelectedExecutive(null);
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
    if (!showBookingModal || !selectedExecutive) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={selectedExecutive.image} 
                  alt={selectedExecutive.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Book Video Call with {selectedExecutive.name}
                  </h2>
                  <p className="text-slate-600">{selectedExecutive.title} at {selectedExecutive.company}</p>
                  <p className="text-lg font-semibold text-slate-900">${selectedExecutive.rate}/hour</p>
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
                    <span className="font-medium">{selectedExecutive.name}</span>
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
                    <span className="font-semibold text-lg">${selectedExecutive.rate}</span>
                  </div>
                </div>
                
                <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition-colors mt-6">
                  Confirm & Pay ${selectedExecutive.rate}
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
            {exec.expertise.map((skill, index) => (
              <span key={index} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium">
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
                  <button onClick={handleBrowseExecutives} className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">Browse Executives</button>
                  <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 px-3 py-2 text-sm font-medium transition-colors">How It Works</a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Join as Executive Form */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Join as an Executive
            </h1>
            <p className="text-xl text-slate-600 mb-8">
              Share your expertise and earn $500-$1000+ per hour by mentoring entrepreneurs and business leaders
            </p>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-slate-500 mb-8">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Set Your Own Rates
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Flexible Schedule
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                Global Reach
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - LinkedIn Registration */}
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">Quick Registration</h2>
                  
                  <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center mb-6">
                    <Linkedin className="h-5 w-5 mr-3" />
                    Continue with LinkedIn
                  </button>
                  
                  <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500">or fill manually</span>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input 
                          type="email" 
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <PhoneIcon className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                        <input 
                          type="tel" 
                          className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Title *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="e.g., CEO, CTO, Board Member"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company *
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Your current company"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Years of Executive Experience *
                      </label>
                      <select className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent">
                        <option value="">Select experience level</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10-15">10-15 years</option>
                        <option value="15-20">15-20 years</option>
                        <option value="20+">20+ years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Areas of Expertise *
                      </label>
                      <textarea 
                        rows={3}
                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="e.g., Strategy, Fundraising, M&A, Digital Transformation, Board Governance"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Desired Hourly Rate *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                        <input 
                          type="number" 
                          className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                          placeholder="500"
                        />
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">/hour</span>
                      </div>
                    </div>
                  </form>
                </div>

                {/* Right Column - Benefits & Process */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">Why Join ExecutiveConnect?</h3>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Premium Rates</h4>
                        <p className="text-sm text-slate-600">Earn $500-$1000+ per hour sharing your expertise</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Flexible Schedule</h4>
                        <p className="text-sm text-slate-600">Set your own availability and work when you want</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <Users className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Global Network</h4>
                        <p className="text-sm text-slate-600">Connect with entrepreneurs and leaders worldwide</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-1">
                        <Shield className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">Secure Platform</h4>
                        <p className="text-sm text-slate-600">Safe payments and verified client interactions</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Application Process</h4>
                    <div className="space-y-3 text-sm text-slate-600">
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                        Submit application with LinkedIn profile
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                        Background verification (2-3 days)
                      </div>
                      <div className="flex items-center">
                        <div className="w-6 h-6 bg-slate-800 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                        Profile setup and go live
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-4 h-4 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-slate-600">
                    I agree to the <a href="#" className="text-amber-600 hover:text-amber-700">Terms of Service</a> and <a href="#" className="text-amber-600 hover:text-amber-700">Privacy Policy</a>
                  </label>
                </div>
                
                <button className="w-full bg-slate-800 text-white py-4 rounded-lg font-semibold hover:bg-slate-700 transition-colors">
                  Submit Application
                </button>
                
                <p className="text-center text-sm text-slate-500 mt-4">
                  We'll review your application within 2-3 business days
                </p>
              </div>
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

  if (currentView === 'expert-detail') {
    return (
      <ExpertDetail expert={expertData} onBack={handleBackToExecutives} />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {currentView === 'expert-detail' ? (
        <ExpertDetail expert={expertData} onBack={handleBackToExecutives} />
      ) : (
        <>
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
                    className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
                  >
                    Become an Expert
                  </button>
                  <a href="#" className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200">
                    Our Mission
                  </a>
                  <button className="p-2 rounded-full hover:bg-neutral-50 transition-colors duration-200">
                    <Search className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-neutral-50 transition-colors duration-200">
                    <User className="w-5 h-5 text-neutral-600" />
                  </button>
                  <button className="bg-neutral-900 text-white px-6 py-2.5 rounded-lg hover:bg-black transition-all duration-200">
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
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800">
                  <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }}></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 py-32 sm:py-48">
                  <div className="max-w-3xl">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                      Connect with Top Industry Experts
                    </h1>
                    <p className="text-xl text-neutral-200 mb-8 max-w-2xl">
                      Book 1:1 video calls with accomplished executives and industry leaders for personalized guidance and insights.
                    </p>
                    <button
                      onClick={handleBrowseExecutives}
                      className="bg-white text-neutral-900 px-6 py-3 rounded-lg font-medium inline-flex items-center hover:bg-neutral-50 transition-colors duration-200"
                    >
                      Browse Experts
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Popular Experts Section */}
              <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="flex justify-between items-end mb-12">
                    <div>
                      <h2 className="text-3xl font-bold text-neutral-900 mb-4">Top Experts</h2>
                      <p className="text-neutral-600">Book a session with our most sought-after industry leaders</p>
                    </div>
                    <button
                      onClick={handleBrowseExecutives}
                      className="text-neutral-900 font-medium hover:text-neutral-600 transition-colors duration-200 hidden sm:flex items-center"
                    >
                      View All
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {executives.filter(exec => exec.popular).map((exec) => (
                      <div
                        key={exec.id}
                        onClick={() => handleViewExpertDetail(exec)}
                        className="cursor-pointer"
                      >
                        <ExecutiveCard exec={exec} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 text-center sm:hidden">
                    <button
                      onClick={handleBrowseExecutives}
                      className="text-neutral-900 font-medium hover:text-neutral-600 transition-colors duration-200 inline-flex items-center"
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
                      <h3 className="text-xl font-semibold mb-4 text-neutral-900">
                        Get access to the world's best
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        Connect with top experts in their field for personalized guidance.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-neutral-900">
                        Personalized advice just for you
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
                        Get tailored solutions and insights specific to your needs.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-neutral-900">
                        Save time and money, guaranteed
                      </h3>
                      <p className="text-neutral-600 leading-relaxed">
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
                <h1 className="text-3xl font-bold text-neutral-900">Browse Experts</h1>
                <button
                  onClick={handleJoinAsExecutive}
                  className="text-neutral-600 hover:text-neutral-900 transition-colors duration-200"
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
                    <ExecutiveCard exec={exec} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === 'join-executive' && (
            <div className="max-w-3xl mx-auto px-4 py-12">
              <h1 className="text-3xl font-bold text-neutral-900 mb-8">Become an Expert</h1>
              <p className="text-neutral-600 mb-8">
                Share your expertise with professionals seeking guidance. Join our platform of industry leaders.
              </p>
              <button className="bg-neutral-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-colors duration-200">
                Apply Now
              </button>
            </div>
          )}
        </>
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
        {expert.expertise.map((skill, index) => (
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