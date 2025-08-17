import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Store last prompt
let lastPrompt = '';

// Helper: fetch multiple Unsplash images based on query
async function fetchUnsplashImages(query, count = 3) {
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: {
        query,
        per_page: count,
        orientation: 'landscape',
      },
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
      }
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results.map(photo => photo.urls.regular);
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching Unsplash images:', error?.response?.data || error.message || error);
    return [];
  }
}

// Generate code
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  lastPrompt = prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const imageUrls = await fetchUnsplashImages(prompt, 3);
    const fallbackUrl = 'https://source.unsplash.com/random/800x600';
    const imageList = imageUrls.length > 0 ? imageUrls.join(', ') : fallbackUrl;

   const promptText = `
You are an expert React, Tailwind CSS, and UI/UX designer, and also an excellent SVG generator who always creates clean, valid, production-ready inline SVGs.

Your design and code must:
- Be fully responsive across all devices
- Follow clean, modern, and professional UI/UX principles
- Instantly impress users at first glance and make them fall in love with the design
- Use best practices in both React and Tailwind CSS
- Produce beautiful layouts with balanced spacing, typography, and color
- Always generate visually stunning, elegant, and user-friendly interfaces
- Use these live Unsplash image URLs wherever suitable so images always load, but only include images if the user explicitly asks for them or if the generated code naturally requires images: ${imageList}
- Do NOT include markdown fences, no backticks, no explanation
- Return only the clean React code

Important:
- This must be your best possible, production-ready version on the first attempt
- Code should be clean, beautiful, maintainable, and immediately usable in production
- Do NOT use npm libraries like react-icons or any imports that require installation
– For social media icons, do not use SVGs. Instead, use clean, accessible text labels or styled buttons with the social platform names (e.g., “Facebook”, “Twitter”). Design them to look modern and visually appealing using Tailwind CSS or plain CSS.- Only use production-ready inline SVGs copied directly from trusted icon libraries like Heroicons, Feather, or Remix Icon


Task: Based on user request: "${prompt}"

Generate:
- One single file: App.js
- It must contain a valid functional React component named App
- Export it as default: export default function App() { ... }
- Use Tailwind CSS if explicitly asked by the user, otherwise use plain CSS
- Ensure the design is fully responsive, clean, and modern
- Include helpful comments in the code

`;

    const result = await model.generateContent(promptText);
    const text = result.response.text();

    res.json({ code: text });
  } catch (error) {
    console.error('Error generating code:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Explain code
app.post('/api/explain', async (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Code is required' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const explainPrompt = `
You are an expert React developer.

Task: Explain in clear, simple language what the following code does, line by line if helpful.

Code:
${code}

Important:
- Return only the explanation text
- No markdown fences, no extra formatting
`;

    const result = await model.generateContent(explainPrompt);
    const text = result.response.text();

    res.json({ explanation: text });
  } catch (error) {
    console.error('Error explaining code:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Regenerate code (new variation)
app.post('/api/regenerate', async (req, res) => {
  if (!lastPrompt) {
    return res.status(400).json({ error: 'No previous prompt found' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const imageUrls = await fetchUnsplashImages(lastPrompt, 3);
    const fallbackUrl = 'https://source.unsplash.com/random/800x600';
    const imageList = imageUrls.length > 0 ? imageUrls.join(', ') : fallbackUrl;

    const promptText = `
You are an expert React, Tailwind CSS, and UI/UX designer, and also an excellent SVG generator who always creates clean, valid, production-ready inline SVGs.

Your design and code must:
- Be fully responsive across all devices
- Follow clean, modern, and professional UI/UX principles
- Instantly impress users at first glance and make them fall in love with the design
- Use best practices in both React and Tailwind CSS
- Produce beautiful layouts with balanced spacing, typography, and color
- Always generate visually stunning, elegant, and user-friendly interfaces
- Use these live Unsplash image URLs wherever suitable so images always load, but only include images if the user explicitly asks for them or if the generated code naturally requires images: ${imageList}
- Do NOT include markdown fences, no backticks, no explanation
- Return only the clean React code


Important:
- This must be your best possible, production-ready version on the first attempt
- Code should be clean, beautiful, maintainable, and immediately usable in production
- Do NOT use npm libraries like react-icons or any imports that require installation
– For social media icons, do not use SVGs. Instead, use clean, accessible text labels or styled buttons with the social platform names (e.g., “Facebook”, “Twitter”). Design them to look modern and visually appealing using Tailwind CSS or plain CSS.- Only use production-ready inline SVGs copied directly from trusted icon libraries like Heroicons, Feather, or Remix Icon


Task: Based on the same user request: "${lastPrompt}"

Generate:
- One single file: App.jsx
- It must contain a valid functional React component named App
- Export it as default: export default function App() { ... }
- Use Tailwind CSS if explicitly asked by the user, otherwise use plain CSS
- Ensure the design is fully responsive and clean
- Include helpful comments in the code
- Create a slightly different variation from the previous one


`;

    const result = await model.generateContent(promptText);
    const text = result.response.text();

    res.json({ code: text });
  } catch (error) {
    console.error('Error regenerating code:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/', (req, res) => {
  res.send(`API IS RUNNING`); // Sends response to client
  console.log('Backend is running'); // Logs in server (Vercel logs)
});
// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
