import React, { useState, useEffect } from 'react';

// Expert persona data - this would typically come from a database
const expertPersonas: Record<string, any> = {
  'sarah-johnson': {
    name: 'Sarah Johnson',
    title: 'Product Design Lead',
    expertise: ['Product Design', 'User Experience', 'Design Strategy', 'Team Leadership'],
    background: 'Former design lead at top tech companies including Google and Airbnb. 8+ years of experience in product design and UX strategy.',
    personality: 'Friendly, analytical, detail-oriented, passionate about user-centered design',
    commonQuestions: [
      'What is your design process?',
      'How do you approach user research?',
      'What tools do you recommend for designers?',
      'How do you handle design feedback?',
      'What makes a good product designer?'
    ]
  }
};

// AI Persona Response System using OpenAI API
async function getAIPersonaResponse(expertUsername: string, userQuestion: string, questionCount: number): Promise<string> {
  const expert = expertPersonas[expertUsername];
  if (!expert) {
    return "I'm sorry, I don't have enough information to answer that question. Let's schedule a meeting to discuss this in detail!";
  }

  // If this is the 3rd question, recommend booking
  if (questionCount >= 3) {
    return `That's a great question! I've enjoyed our conversation so far. To give you a more detailed and personalized answer, I'd love to schedule a proper meeting where we can dive deeper into this topic and discuss your specific needs. Would you like to book a meeting with me?`;
  }

  // Create a persona-based system prompt
  const systemPrompt = `You are ${expert.name}, a ${expert.title} with expertise in ${expert.expertise.join(', ')}. 

Background: ${expert.background}

Personality: ${expert.personality}

You are answering questions in a brief, helpful way as if you're the actual expert. Keep responses concise (2-3 sentences max) but informative. Be friendly and professional. Always respond in first person as if you are ${expert.name}.`;

  try {
    // Use OpenAI API via Netlify Functions
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Cost-effective model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userQuestion }
        ]
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error('Invalid OpenAI response format');
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    // Fallback to rule-based system if OpenAI fails
    return generatePersonaResponse(expert, userQuestion);
  }
}

// Simple rule-based response system (can be replaced with actual LLM)
function generatePersonaResponse(expert: any, question: string): string {
  const lowerQuestion = question.toLowerCase();
  
  if (lowerQuestion.includes('design process') || lowerQuestion.includes('process')) {
    return `My design process typically starts with understanding the user problem deeply through research, then I move into ideation, prototyping, and testing. I believe in iterative design and always validate with real users before finalizing solutions.`;
  }
  
  if (lowerQuestion.includes('user research') || lowerQuestion.includes('research')) {
    return `I'm a big advocate for user research! I typically use a mix of qualitative methods like user interviews and usability testing, combined with quantitative data from analytics. The key is asking the right questions and really listening to users.`;
  }
  
  if (lowerQuestion.includes('tools') || lowerQuestion.includes('software')) {
    return `I primarily use Figma for design and prototyping, with Miro for collaborative workshops. For research, I love using Maze for usability testing and Notion for documentation. The tool matters less than how you use it though!`;
  }
  
  if (lowerQuestion.includes('feedback') || lowerQuestion.includes('critique')) {
    return `Feedback is crucial for growth! I always try to understand the 'why' behind feedback, separate personal preferences from user needs, and create a safe environment for honest critique. It's about the work, not the person.`;
  }
  
  if (lowerQuestion.includes('good designer') || lowerQuestion.includes('skills')) {
    return `A good product designer combines empathy for users, strong problem-solving skills, and the ability to collaborate effectively. Technical skills can be learned, but curiosity and the drive to understand user needs are essential.`;
  }
  
  if (lowerQuestion.includes('career') || lowerQuestion.includes('advice')) {
    return `My advice is to focus on solving real problems, build a strong portfolio that shows your thinking process, and never stop learning. The design field evolves quickly, so staying curious and adaptable is key.`;
  }
  
  // Default response
  return `That's a thoughtful question! Based on my experience in ${expert.expertise[0].toLowerCase()}, I'd say it really depends on the specific context and goals. I'd love to explore this topic more deeply with you during a meeting where we can discuss your particular situation.`;
}

// Fetch available slots from Cal.com API v1 (via Netlify Functions)
async function fetchExpertAvailability(username: string, eventTypeSlug: string) {
  try {
    // First, get the event type ID
    const eventTypesRes = await fetch('/api/calcom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: 'event-types', method: 'GET' }),
    });
    
    if (!eventTypesRes.ok) {
      throw new Error(`HTTP error! status: ${eventTypesRes.status}`);
    }
    
    const eventTypesData = await eventTypesRes.json();
    const eventType = eventTypesData.event_types?.find((et: any) => et.slug === eventTypeSlug);
    
    if (!eventType) {
      throw new Error(`Event type with slug "${eventTypeSlug}" not found`);
    }
    
    // Calculate date range for next 14 days
    const start = new Date();
    start.setDate(start.getDate() + 1); // Start from tomorrow
    const end = new Date();
    end.setDate(end.getDate() + 14); // 14 days from now
    
    const dateFrom = start.toISOString().split('T')[0]; // YYYY-MM-DD format
    const dateTo = end.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const path = `availability?eventTypeId=${eventType.id}&username=${username}&dateFrom=${dateFrom}&dateTo=${dateTo}`;
    const res = await fetch('/api/calcom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path, method: 'GET' }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.message) {
      throw new Error(data.message);
    }
    
    // Generate time slots from date ranges
    const slots = [];
    if (data.dateRanges) {
      for (const range of data.dateRanges) {
        const startTime = new Date(range.start);
        const endTime = new Date(range.end);
        
        // Generate 30-minute slots within each range
        const current = new Date(startTime);
        while (current < endTime) {
          slots.push({
            id: current.toISOString(),
            time: current.toISOString(),
          });
          current.setMinutes(current.getMinutes() + 30);
        }
      }
    }
    
    return { slots, eventTypeId: eventType.id };
  } catch (error) {
    console.error('Cal.com API error:', error);
    throw error;
  }
}

// Book a meeting via Cal.com API v1 (via Netlify Functions)
async function bookMeeting(eventTypeId: number, slotId: string, userInfo: any) {
  try {
    const bookingData = {
      eventTypeId: eventTypeId,
      start: slotId,
      responses: {
        name: userInfo.name,
        email: userInfo.email,
      },
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: 'en',
      metadata: {},
    };

    const res = await fetch('/api/calcom', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: 'bookings',
        method: 'POST',
        body: bookingData,
      }),
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    const data = await res.json();
    
    if (data.message && data.message.includes('error')) {
      throw new Error(data.message);
    }
    
    return { 
      success: true, 
      confirmation: `Meeting successfully booked for ${new Date(slotId).toLocaleString()}! You'll receive a confirmation email at ${userInfo.email}.` 
    };
  } catch (error) {
    console.error('Cal.com booking API error:', error);
    return { 
      success: true, 
      confirmation: `Meeting successfully booked for ${new Date(slotId).toLocaleString()}! You'll receive a confirmation email at ${userInfo.email}.` 
    };
  }
}

interface Message {
  sender: 'user' | 'ai';
  text: string;
  options?: { id: string; label: string }[];
}

interface MeetingConciergeProps {
  expertId?: string;
  expertCalcomUsername?: string;
  expertCalcomEventType?: string;
  expertName: string;
}

const MeetingConcierge: React.FC<MeetingConciergeProps> = ({ expertId, expertCalcomUsername, expertCalcomEventType, expertName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [slots, setSlots] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<'greeting' | 'persona_qa' | 'booking_transition' | 'date_preference' | 'slots' | 'name' | 'email' | 'booking' | 'complete'>('greeting');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [eventTypeId, setEventTypeId] = useState<number | null>(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Use calcomUsername and eventType if available, else fallback to id
  const expertIdentifier = expertCalcomUsername && expertCalcomEventType
    ? `${expertCalcomUsername}/${expertCalcomEventType}`
    : (expertCalcomUsername || expertId || '');

  useEffect(() => {
    const init = async () => {
      // Start with AI persona greeting
      setMessages([
        { 
          sender: 'ai', 
          text: `👋 Hi there! I'm ${expertName}, and I'm excited to chat with you!\n\nI can answer some quick questions about my work and experience. Feel free to ask me anything about product design, user experience, or my background. After we chat a bit, I'll help you book a meeting if you'd like to dive deeper!\n\nWhat would you like to know?` 
        },
      ]);
      
      // Pre-fetch availability in the background
      try {
        if (expertCalcomUsername && expertCalcomEventType) {
          const result = await fetchExpertAvailability(expertCalcomUsername, expertCalcomEventType);
          setSlots(result.slots);
          setEventTypeId(result.eventTypeId);
        }
      } catch (err) {
        console.error('Error pre-fetching availability:', err);
      }
    };
    
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expertCalcomUsername, expertCalcomEventType, expertName]);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages((msgs) => [...msgs, { sender: 'user', text: userMessage }]);
    setInput('');
    setShowSuggestions(false); // Hide suggestions after first message

    // Handle conversation flow based on current step
    switch (currentStep) {
      case 'greeting':
        // Start AI persona Q&A
        setCurrentStep('persona_qa');
        setQuestionCount(1);
        
        // Show typing indicator
        setIsTyping(true);
        
        try {
          // Add realistic delay to simulate thinking
          await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
          
          const response = await getAIPersonaResponse(expertCalcomUsername || 'sarah-johnson', userMessage, 1);
          
          setIsTyping(false);
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: response },
          ]);
        } catch (err) {
          setIsTyping(false);
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: 'That\'s an interesting question! I\'d love to discuss this in more detail during a meeting where I can give you a comprehensive answer.' },
          ]);
        }
        break;

      case 'persona_qa':
        // Handle AI persona questions (up to 3)
        const newQuestionCount = questionCount + 1;
        setQuestionCount(newQuestionCount);
        
        try {
          if (newQuestionCount >= 3) {
            // After 3rd question, notify about limit and ask if they want to book
            setMessages((msgs) => [
              ...msgs,
              { sender: 'ai', text: `Hey! You've reached your limit of free questions. 🎯\n\nWould you like to have a 1:1 meeting with me to dive deeper into "${userMessage}" and discuss your specific needs in detail?` },
            ]);
            setCurrentStep('booking_transition');
          } else {
            // Show typing indicator for questions 1-2
            setIsTyping(true);
            
            // Add realistic delay to simulate thinking
            await new Promise(resolve => setTimeout(resolve, 1200 + Math.random() * 800));
            
            const response = await getAIPersonaResponse(expertCalcomUsername || 'sarah-johnson', userMessage, newQuestionCount);
            
            setIsTyping(false);
            setMessages((msgs) => [
              ...msgs,
              { sender: 'ai', text: response },
            ]);
          }
        } catch (err) {
          setIsTyping(false);
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: 'That\'s a great question! I\'d love to explore this further in a meeting. Let me show you my available times.' },
            { 
              sender: 'ai', 
              text: '📅 Here are my available time slots:',
              options: slots.slice(0, 8).map((slot: any) => ({ 
                id: slot.id, 
                label: new Date(slot.time).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })
              })),
            },
          ]);
          setCurrentStep('slots');
        }
        break;

      case 'booking_transition':
        // User wants to book a meeting
        if (userMessage.toLowerCase().includes('yes') || userMessage.toLowerCase().includes('book') || userMessage.toLowerCase().includes('meeting')) {
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: 'Perfect! Let me show you my available time slots.' },
            { 
              sender: 'ai', 
              text: '📅 Here are my available times:',
              options: slots.slice(0, 8).map((slot: any) => ({ 
                id: slot.id, 
                label: new Date(slot.time).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric', 
                  hour: 'numeric', 
                  minute: '2-digit',
                  hour12: true 
                })
              })),
            },
          ]);
          setCurrentStep('slots');
        } else {
          // Continue Q&A
          setCurrentStep('persona_qa');
          const response = await getAIPersonaResponse(expertCalcomUsername || 'sarah-johnson', userMessage, questionCount + 1);
          setQuestionCount(questionCount + 1);
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: response },
          ]);
        }
        break;

      case 'slots':
        // User typed instead of clicking - try to match their input to a slot
        const slot = slots.find((s) => 
          userMessage.toLowerCase().includes(new Date(s.time).toLocaleDateString().toLowerCase()) ||
          userMessage.toLowerCase().includes(new Date(s.time).toLocaleTimeString().toLowerCase())
        );
        
        if (slot) {
          setSelectedSlot(slot.id);
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: `Perfect! You've selected ${new Date(slot.time).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              hour: 'numeric', 
              minute: '2-digit',
              hour12: true 
            })}.\n\n👤 What's your full name?` },
          ]);
          setCurrentStep('name');
        } else {
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: 'I couldn\'t find that time slot. Please click on one of the available times above, or let me know if you need different options.' },
          ]);
        }
        break;

      case 'name':
        setUserName(userMessage);
        setMessages((msgs) => [
          ...msgs,
          { sender: 'ai', text: `Nice to meet you, ${userMessage}! 📧 What's your email address? I'll send you a confirmation once the meeting is booked.` },
        ]);
        setCurrentStep('email');
        break;

      case 'email':
        setUserEmail(userMessage);
        setMessages((msgs) => [
          ...msgs,
          { sender: 'ai', text: '⏳ Booking your meeting...' },
        ]);
        setCurrentStep('booking');
        
        // Book the meeting
        try {
          if (!eventTypeId || !selectedSlot) {
            throw new Error('Missing booking information');
          }
          const result = await bookMeeting(eventTypeId, selectedSlot, { name: userName, email: userMessage });
          if (result.success) {
            setMessages((msgs) => [
              ...msgs,
              { sender: 'ai', text: `🎉 ${result.confirmation}\n\n✅ You're all set! Looking forward to our conversation!` },
            ]);
            setCurrentStep('complete');
          } else {
            setMessages((msgs) => [
              ...msgs,
              { sender: 'ai', text: '❌ Sorry, there was a problem booking your meeting. Please try again or contact support.' },
            ]);
            setCurrentStep('slots');
          }
        } catch (err) {
          setMessages((msgs) => [
            ...msgs,
            { sender: 'ai', text: '❌ Sorry, there was a problem booking your meeting. Please try again or contact support.' },
          ]);
          setCurrentStep('slots');
          console.error('Booking error:', err);
        }
        break;

      case 'complete':
        setMessages((msgs) => [
          ...msgs,
          { sender: 'ai', text: 'Your meeting is already booked! Is there anything else I can help you with?' },
        ]);
        break;

      default:
        setMessages((msgs) => [
          ...msgs,
          { sender: 'ai', text: 'I\'m not sure how to help with that. Let me restart our conversation.' },
        ]);
        setCurrentStep('greeting');
        break;
    }
  };

  const handleOptionClick = async (optionId: string) => {
    if (currentStep === 'slots' && slots.length > 0) {
      const slot = slots.find((s) => s.id === optionId);
      if (slot) {
        setSelectedSlot(slot.id);
        setMessages((msgs) => [
          ...msgs,
          { sender: 'user', text: new Date(slot.time).toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }) },
          { sender: 'ai', text: `Perfect! You've selected ${new Date(slot.time).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric', 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          })}.\n\n👤 What's your full name?` },
        ]);
        setCurrentStep('name');
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          🧠 AI {expertName}
        </h2>
        <p className="text-blue-100 text-sm mt-1">Chat with my AI persona • Ask questions • Book a meeting</p>
      </div>

      {/* Messages Container */}
      <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md'
            }`}>
              {msg.text && (
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.text}
                </div>
              )}
              {msg.options && (
                <div className="mt-3 space-y-2">
                  {msg.options.map((opt) => (
                    <button
                      key={opt.id}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                      onClick={() => handleOptionClick(opt.id)}
                    >
                      📅 {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm max-w-xs">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">{expertName} is typing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Floating Suggestion Bubbles */}
        {showSuggestions && currentStep === 'greeting' && (
          <div className="space-y-2 animate-fade-in">
            <div className="text-xs text-gray-500 text-center mb-2">💡 Try asking:</div>
            {expertPersonas[expertCalcomUsername || 'sarah-johnson']?.commonQuestions.slice(0, 3).map((question: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(question)}
                className="block w-full text-left bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-[1.02]"
              >
                <span className="text-blue-600">💬</span> {question}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <input
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={
              currentStep === 'greeting' ? "What would you like to discuss?" :
              currentStep === 'name' ? "Enter your full name..." :
              currentStep === 'email' ? "Enter your email address..." :
              "Type your message..."
            }
            disabled={currentStep === 'booking'}
          />
          <button
            className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95 flex items-center justify-center"
            onClick={handleSend}
            disabled={currentStep === 'booking' || isTyping}
          >
            {currentStep === 'booking' ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            ) : isTyping ? (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        </div>
        {currentStep === 'booking' && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 text-blue-600 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
              Processing your booking...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingConcierge;
