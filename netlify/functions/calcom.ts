import { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
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

  if (!['POST', 'GET'].includes(event.httpMethod || '')) {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const calcomApiKey = process.env.CALCOM_API_KEY
    if (!calcomApiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Cal.com API key not configured' }),
      }
    }

    let requestData
    if (event.httpMethod === 'POST') {
      requestData = JSON.parse(event.body || '{}')
    }

    const { path, method, body } = requestData || {}

    if (!path || !method) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: path, method' }),
      }
    }

    const calcomUrl = `https://api.cal.com/v1/${path}`
    
    const fetchOptions: RequestInit = {
      method: method,
      headers: {
        'Authorization': `Bearer ${calcomApiKey}`,
        'Content-Type': 'application/json',
      },
    }

    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body)
    }

    const response = await fetch(calcomUrl, fetchOptions)

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Cal.com API error:', errorData)
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Cal.com API error', details: errorData }),
      }
    }

    const data = await response.json()

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}

export { handler }
