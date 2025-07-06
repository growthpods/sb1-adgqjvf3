import { loadStripe } from '@stripe/stripe-js'

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY

if (!stripePublishableKey) {
  throw new Error('Missing Stripe publishable key')
}

export const stripePromise = loadStripe(stripePublishableKey)

// Stripe payment types
export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: string
  client_secret: string
}

export interface CreatePaymentIntentRequest {
  amount: number
  currency: string
  expertId: string
  userId: string
  bookingId: string
  metadata?: Record<string, string>
}

export interface CreatePaymentIntentResponse {
  clientSecret: string
  paymentIntentId: string
}

// Payment utility functions
export const formatPrice = (amount: number, currency: string = 'usd'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(amount / 100) // Stripe amounts are in cents
}

export const calculateTotalAmount = (hourlyRate: number, durationMinutes: number = 60): number => {
  // Calculate amount in cents for Stripe
  const hourlyAmount = hourlyRate * 100 // Convert to cents
  const totalAmount = Math.round((hourlyAmount * durationMinutes) / 60)
  return totalAmount
}

export const createPaymentIntent = async (data: CreatePaymentIntentRequest): Promise<CreatePaymentIntentResponse> => {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to create payment intent')
  }

  return response.json()
}
