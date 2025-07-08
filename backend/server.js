import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
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

// Generate code
app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }
  lastPrompt = prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const promptText = `
You are an expert React and Tailwind CSS frontend developer.

Task: Based on user request: "${prompt}"

Generate:
- One single file: App.js
- It must contain a valid functional React component named App
- Export it as default: export default function App() { ... }
- Use Tailwind CSS if explicitly asked by the user, otherwise use plain CSS
- Always generate visually impressive, attractive, and professional code with a clean, modern UI
- Provide complete and large code that is best practice, clean, and includes helpful comments

Important:
- Do NOT include markdown fences, no backticks, no explanation
- Return only clean React code
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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

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

// Regenerate code
app.post('/api/regenerate', async (req, res) => {
  if (!lastPrompt) {
    return res.status(400).json({ error: 'No previous prompt found' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const promptText = `
You are an expert React and Tailwind CSS frontend developer.

Task: Based on the same user request: "${lastPrompt}"

Generate:
- One single file: App.js
- It must contain a valid functional React component named App
- Export it as default: export default function App() { ... }
- Use Tailwind CSS if explicitly asked by the user, otherwise use plain CSS
- Always generate visually impressive, attractive, and professional code with a clean, modern UI
- Create a slightly different variation from the previous one
- Provide complete and large code that is best practice, clean, and includes helpful comments

Important:
- Do NOT include markdown fences, no backticks, no explanation
- Return only clean React code
`;

    const result = await model.generateContent(promptText);
    const text = result.response.text();

    res.json({ code: text });
  } catch (error) {
    console.error('Error regenerating code:', error?.response?.data || error.message || error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

