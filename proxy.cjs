const express = require('express');
const fetch = require('node-fetch'); // node-fetch v2 for CommonJS
const app = express();
require('dotenv').config();
app.use(express.json());

// Add CORS headers for all responses
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/api/calcom', async (req, res) => {
  const { path, method = 'GET', body } = req.body;
  const apiKey = process.env.VITE_CALCOM_API_KEY || process.env.CALCOM_API_KEY;
  
  // Add API key as query parameter for v1 API
  const separator = path.includes('?') ? '&' : '?';
  const url = `https://api.cal.com/v1/${path}${separator}apiKey=${apiKey}`;
  
  try {
    const calcomRes = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify(body) : undefined,
    });
    const data = await calcomRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', details: err.message });
  }
});

app.post('/api/openai', async (req, res) => {
  const { messages, model = 'gpt-4o-mini' } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return res.status(400).json({ error: 'OpenAI API key not configured' });
  }
  
  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });
    
    const data = await openaiRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'OpenAI API error', details: err.message });
  }
});

app.listen(3001, () => console.log('Proxy running on port 3001'));
