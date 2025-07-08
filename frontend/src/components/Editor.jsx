import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1500); // hide after 1.5s
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className="relative border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-[50vh] bg-white">
      <Editor
        defaultLanguage="html"
        value={code}
        onChange={(value) => setCode(value)}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />

      {/* Show copy button only if code is present */}
       {/* Show copy button only if code is present */}
  {code && (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 bg-gray-800 bg-opacity-70 hover:bg-opacity-90 text-white p-1.5 rounded-full transition"
      title="Copy code"
    >
      {/* Modern copy icon (Heroicons) */}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
        viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    </button>
  )}

  {/* Copied badge */}
  {copied && (
    <div className="absolute top-3 right-14 bg-green-600 text-white text-xs px-2 py-1 rounded shadow transition">
      Copied!
    </div>
  )}
</div>

  );
};

export default CodeEditor;

