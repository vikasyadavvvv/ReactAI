import React, { useState } from 'react';
import PromptInput from './components/PromptInput';
import CodeEditor from './components/Editor';
import LivePreview from './components/LivePreview';
import ReactAI from './components/ReactAI';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactAIProduct from './components/ReactAIProduct';

function App() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-900/95 to-purple-900/95">
        <ReactAI />
        <Routes>
          <Route path="/" element={
            <div className="container mx-auto p-4 space-y-6">
              <PromptInput setCode={setCode} code={code} setExplanation={setExplanation} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
                  <CodeEditor code={code} setCode={setCode} />
                </div>
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden">
                  <LivePreview code={code} />
                </div>
              </div>
            {explanation && (
  <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl p-6 text-gray-100 text-sm whitespace-pre-wrap transition-all duration-300 hover:shadow-3xl">
    <h4 className="text-lg font-bold mb-3 text-white flex items-center gap-2">
      <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 8a1 1 0 012 0v4a1 1 0 01-2 0V8zm1 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
      </svg>
      Explanation
    </h4>
    <p className="leading-relaxed tracking-wide">
      {explanation}
    </p>
  </div>
)}

            </div>
          } />
          <Route path="/about" element={<ReactAIProduct />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App

