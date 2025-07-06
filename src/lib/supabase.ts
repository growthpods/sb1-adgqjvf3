import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types (to be updated based on your Supabase schema)
export interface Expert {
  id: string
  name: string
  title: string
  expertise: string[]
  background: string
  personality: string
  common_questions: string[]
  hourly_rate: number
  calcom_username?: string
  calcom_event_type?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id: string
  expert_id: string
  meeting_date: string
  duration_minutes: number
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  payment_status: 'pending' | 'paid' | 'refunded'
  stripe_payment_intent_id?: string
  calcom_booking_id?: string
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  booking_id: string
  user_id: string
  expert_id: string
  amount: number
  currency: string
  stripe_payment_intent_id: string
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
  created_at: string
  updated_at: string
}
