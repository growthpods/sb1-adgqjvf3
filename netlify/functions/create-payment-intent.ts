import { Handler } from '@netlify/functions'
import Stripe from 'stripe'

const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  }

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Stripe secret key not configured' }),
      }
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    const { amount, currency, expertId, userId, bookingId, metadata } = JSON.parse(event.body || '{}')

    if (!amount || !currency || !expertId || !userId || !bookingId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ 
          error: 'Missing required fields: amount, currency, expertId, userId, bookingId' 
        }),
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Ensure it's an integer
      currency: currency.toLowerCase(),
      metadata: {
        expertId,
        userId,
        bookingId,
        ...metadata,
      },
      automatic_payment_methods: {
        enabled: true,
      },
    })

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }),
    }
  } catch (error) {
    console.error('Stripe error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to create payment intent',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    }
  }
}

export { handler }
