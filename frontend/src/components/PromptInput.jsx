import React, { useState } from 'react';
import axios from 'axios';

const PromptInput = ({setCode, code,  setExplanation }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [explainLoading, setExplainLoading] = useState(false);
  const [regenLoading, setRegenLoading] = useState(false);

  const generateCode = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('https://reactai-1.onrender.com/api/generate', { prompt });
      setCode(res.data.code);
    } catch (err) {
      console.error(err);
      alert('Error generating code');
    } finally {
      setLoading(false);
    }
  };

 const explainCode = async () => {
  if (!code) {
    alert('No code available to explain!');
    return;
  }
  setExplainLoading(true);
  try {
    const res = await axios.post('https://reactai-1.onrender.com/api/explain', { code });
    if (setExplanation) {
      setExplanation(res.data.explanation);
    } else {
      alert(res.data.explanation);
    }
  } catch (err) {
    console.error(err);
    alert('Error explaining code');
  } finally {
    setExplainLoading(false);
  }
};


  const regenerateCode = async () => {
    setRegenLoading(true);
    try {
      const res = await axios.post('https://reactai-1.onrender.com/api/regenerate');
      setCode(res.data.code);
    } catch (err) {
      console.error(err);
      alert('Error regenerating code');
    } finally {
      setRegenLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-xl shadow-xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/20 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Code Generator
          </span>
        </h3>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want to build..."
          className="w-full p-4 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
          disabled={loading}
        />
        {prompt && (
          <button
            onClick={() => setPrompt('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={generateCode}
          disabled={loading}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
            ${loading
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Code
            </>
          )}
        </button>

       <button
  onClick={explainCode}
  disabled={!code || explainLoading}
  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
    ${(!code || explainLoading)
      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
    }`}
>
  {explainLoading ? 'Explaining...' : 'Explain Code'}
</button>

<button
  onClick={regenerateCode}
  disabled={!code || regenLoading}
  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2
    ${(!code || regenLoading)
      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
    }`}
>
  {regenLoading ? 'Regenerating...' : 'Regenerate'}
</button>

      </div>

      {/* Example prompt */}
      <p className="text-gray-400 text-sm mt-1 flex items-start gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          Try: <span className="text-blue-300">"A login form with email validation and social auth buttons"</span>
        </span>
      </p>
    </div>
  );
};

export default PromptInput;
