import React from 'react';
import { FiZap, FiCode, FiLayers, FiCopy } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ReactAIProduct = ({ onBack }) => {
    const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      {/* Back Button */}
    

      {/* Product Header */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-blue-500/10 px-4 py-2 rounded-full border border-blue-400/30 mb-6">
            <FiZap className="text-blue-400 mr-2" />
            <span className="text-blue-300 text-sm font-medium">Frontend React Generator</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
            React + Tailwind CSS Generator
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Create production-ready React components with Tailwind CSS styling using simple English prompts.
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <FiCode className="text-blue-400" />
              <span>How It Works</span>
            </h2>
            <p className="text-gray-300 mb-6">
              Describe your UI component in plain English, and get clean React code with perfect Tailwind CSS styling.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Generates functional React components",
                "Uses Tailwind CSS for styling",
                "Includes responsive design by default",
                "Follows React best practices",
                "One-click copy to clipboard"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-blue-500/10 rounded-full flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button 
            onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium flex items-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <FiZap className="h-5 w-5" />
              Try It Now
            </button>
          </div>
          <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl overflow-hidden shadow-xl h-80 flex items-center justify-center">
            <div className="text-center p-6">
              <div className="text-5xl mb-4 text-blue-400">⚛️</div>
              <h3 className="text-xl font-bold mb-2">React + Tailwind CSS</h3>
              <p className="text-gray-400">Describe your component and get clean code instantly</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <FiLayers className="text-purple-400" />
            <span>Key Features</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Instant React Code",
                desc: "Get React components with perfect JSX structure.",
                icon: <FiCode className="text-blue-400 text-xl" />
              },
              {
                title: "Tailwind CSS",
                desc: "Optimized utility classes for responsive designs.",
                icon: <FiLayers className="text-purple-400 text-xl" />
              },
              {
                title: "Copy to Clipboard",
                desc: "One-click copy for immediate use in your projects.",
                icon: <FiCopy className="text-blue-400 text-xl" />
              },
              {
                title: "Hooks Support",
                desc: "Auto-generated useState, useEffect and custom hooks.",
                icon: <FiCode className="text-purple-400 text-xl" />
              },
              {
                title: "Component Props",
                desc: "Smart prop generation with default values.",
                icon: <FiCode className="text-blue-400 text-xl" />
              },
              {
                title: "Clean Output",
                desc: "Well-formatted code with proper indentation.",
                icon: <FiCode className="text-purple-400 text-xl" />
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-700/30 border border-gray-600/30 rounded-lg p-6 hover:border-blue-400/30 transition-all">
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Examples */}
        <div className="bg-gray-700/30 border border-gray-600/30 rounded-xl p-8 mb-20">
          <h2 className="text-2xl font-bold mb-6">Example Prompts</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
            "A responsive navbar with mobile menu toggle built using React functional components and styled entirely with Tailwind CSS utility classes.",
  "Login form with email validation and submit button built with React functional components, Tailwind CSS for styling, and inline validation logic using React hooks (useState, etc.), keeping everything in one file.",
  "Card component with image, title, description, and button styled only with Tailwind CSS utility classes and inline styling for any custom colors or effects, without using external CSS files.",
  "Modal dialog with overlay and close button implemented using React functional components, Tailwind CSS for layout and styling, and React hooks (useState) for managing open/close state, all inside a single file.",
  "Accordion component with smooth animations built as React functional components, styled with Tailwind CSS classes, and using inline styling or inline keyframes directly in the same file for animation, avoiding external CSS.",
  "Pagination component for a data table implemented with React functional components, styled entirely with Tailwind CSS classes and optional inline styling for active page highlights, with no extra CSS files.",
  "Design a simple notification banner, a toast message, and an alert box.",
  "Loading spinner with custom animation created as a React functional component, styled with Tailwind CSS classes and inline keyframes or inline styles for the animation, completely independent of external CSS files."
            ].map((prompt, index) => (
              <div key={index} className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-blue-400/30 transition-all">
                <div className="text-gray-400 text-sm mb-1">Example {index + 1}:</div>
                <div className="font-mono text-blue-300">"{prompt}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700/30 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <FiZap className="text-blue-400" />
              </div>
              <span className="text-lg font-bold">ReactAI</span>
            </div>
          </div>
          <div className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ReactAI. Focused on React + Tailwind CSS generation.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ReactAIProduct;