# System Patterns

## Architecture Overview

The application follows a sophisticated component-based architecture with AI integration, implementing several key design patterns for scalability and maintainability.

## Core Architectural Patterns

### **Component Hierarchy**
```
App.tsx (Main Router)
├── Home Page (Expert Cards)
├── BecomeAnExpert.tsx
├── OurMission.tsx
└── ExpertDetail.tsx
    └── MeetingConcierge.tsx (AI Chat Component)
```

### **AI Persona System Architecture**
```
User Input → MeetingConcierge → Proxy Server → OpenAI API
                ↓
         Expert Persona Data → System Prompt → Authentic Response
                ↓
         Conversation Flow → Cal.com Integration → Real Booking
```

## Design Patterns Implemented

### **1. Proxy Pattern (API Security)**
- **Purpose:** Secure API key management and CORS handling
- **Implementation:** Node.js proxy server (`proxy.cjs`)
- **Benefits:** API keys never exposed to frontend, centralized error handling

```typescript
// Frontend calls proxy instead of direct API
const response = await fetch('http://localhost:3001/api/openai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ model: 'gpt-4o-mini', messages: [...] })
});
```

### **2. Strategy Pattern (AI Response System)**
- **Purpose:** Multiple response strategies (OpenAI vs Rule-based)
- **Implementation:** Fallback system in `getAIPersonaResponse()`
- **Benefits:** Graceful degradation if OpenAI API fails

```typescript
try {
  // Primary strategy: OpenAI API
  return await openAIResponse(expert, question);
} catch (error) {
  // Fallback strategy: Rule-based responses
  return generatePersonaResponse(expert, question);
}
```

### **3. State Machine Pattern (Conversation Flow)**
- **Purpose:** Manage complex conversation states
- **Implementation:** `currentStep` state in MeetingConcierge
- **States:** greeting → persona_qa → booking_transition → slots → name → email → booking → complete

```typescript
const [currentStep, setCurrentStep] = useState<'greeting' | 'persona_qa' | 'booking_transition' | 'slots' | 'name' | 'email' | 'booking' | 'complete'>('greeting');
```

### **4. Observer Pattern (UI State Management)**
- **Purpose:** Reactive UI updates based on state changes
- **Implementation:** React hooks with useEffect
- **Benefits:** Automatic UI updates, typing indicators, button states

```typescript
React.useEffect(() => {
  scrollToBottom();
}, [messages]); // Observes messages array changes
```

### **5. Factory Pattern (Expert Persona Creation)**
- **Purpose:** Create expert-specific AI prompts
- **Implementation:** Expert persona data structure
- **Benefits:** Scalable expert addition, consistent prompting

```typescript
const expertPersonas: Record<string, ExpertPersona> = {
  'sarah-johnson': {
    name: 'Sarah Johnson',
    title: 'Product Design Lead',
    expertise: ['Product Design', 'User Experience'],
    background: '...',
    personality: '...',
    commonQuestions: [...]
  }
};
```

## Data Flow Patterns

### **Unidirectional Data Flow**
- **Props Down:** Expert data flows from App → ExpertDetail → MeetingConcierge
- **Events Up:** User interactions bubble up through callbacks
- **State Isolation:** Each component manages its own state

### **Async Data Handling**
- **Promise-based:** All API calls use async/await pattern
- **Error Boundaries:** Try-catch blocks with graceful fallbacks
- **Loading States:** UI feedback during async operations

## UI/UX Patterns

### **Progressive Disclosure**
- **Suggestion Bubbles:** Show on first load, hide after interaction
- **Conversation Flow:** Reveal information step by step
- **Typing Indicators:** Show AI is "thinking" before response

### **Feedback Patterns**
- **Immediate Feedback:** Button states change instantly
- **Progress Indicators:** Typing dots, loading spinners
- **State Transitions:** Smooth animations between states

### **Responsive Design Patterns**
- **Mobile-First:** Tailwind CSS utility classes
- **Flexible Layouts:** Grid and flexbox patterns
- **Touch-Friendly:** Orb button sized for mobile interaction

## Security Patterns

### **API Key Protection**
- **Environment Variables:** Stored in `.env` file
- **Proxy Server:** Keys never sent to frontend
- **CORS Configuration:** Controlled access to backend

### **Input Validation**
- **Type Safety:** TypeScript prevents type errors
- **Sanitization:** User inputs properly handled
- **Error Handling:** Graceful failure modes

## Performance Patterns

### **Lazy Loading**
- **Component Splitting:** Potential for code splitting
- **Asset Optimization:** Images and resources optimized
- **Bundle Optimization:** Vite tree shaking

### **Caching Strategies**
- **Static Assets:** Vite handles asset caching
- **API Responses:** Potential for response caching
- **State Persistence:** Local state management

## Scalability Patterns

### **Modular Architecture**
- **Component Isolation:** Each component has single responsibility
- **Reusable Components:** UI elements can be reused
- **Configuration-Driven:** Expert personas easily configurable

### **Extension Points**
- **New Experts:** Add to expertPersonas object
- **New Features:** Extend conversation flow states
- **New Integrations:** Add new API endpoints to proxy

## Testing Patterns (Future Implementation)
- **Component Testing:** React Testing Library patterns
- **API Testing:** Mock API responses
- **E2E Testing:** User flow testing with Playwright/Cypress

The system demonstrates sophisticated architectural patterns that enable a scalable, maintainable, and secure AI-powered expert marketplace platform.
