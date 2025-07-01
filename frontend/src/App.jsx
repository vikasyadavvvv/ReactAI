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
                <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-xl p-4 text-gray-200 text-sm whitespace-pre-wrap">
                  <h4 className="text-lg font-semibold mb-2 text-white">Explanation</h4>
                  {explanation}
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

