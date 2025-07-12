import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiZap, FiInfo, FiMenu, FiX } from 'react-icons/fi';

const ReactAI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-indigo-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow">
              <div className="absolute inset-0 rounded-full border border-white animate-ping opacity-70"></div>
              <FiZap className="h-5 w-5 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-xl font-semibold tracking-wide text-white">
            ReactAI
          </h1>
          <span className="hidden md:inline-flex items-center text-xs bg-white/20 px-2 py-0.5 rounded-full ml-1">
            ⚡ No Signup Required
          </span>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={() => navigate('/about')}
            className={`text-sm px-3 py-1 rounded flex items-center gap-2 transition ${
              isAboutPage
                ? 'bg-white/20 border border-white/30'
                : 'hover:bg-white/10'
            }`}
          >
            <FiInfo className="text-white" />
            <span>About ReactAI</span>
          </button>
          <button
            onClick={() => navigate('/')}
            className="text-sm px-4 py-1.5 rounded-full font-medium bg-white text-indigo-600 hover:bg-gray-100 shadow transition-all flex items-center gap-1"
          >
            <FiZap className="h-4 w-4" />
            {isAboutPage ? 'Back to Editor' : 'Start Generating'}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute md:hidden top-16 left-0 right-0 bg-indigo-600 z-40 p-4 shadow-lg">
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2 rounded flex items-center gap-3 transition ${
                  isAboutPage
                    ? 'bg-white/20 border border-white/30'
                    : 'hover:bg-white/10'
                }`}
              >
                <FiInfo className="text-lg" />
                About ReactAI
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-2 rounded font-medium bg-white text-indigo-600 hover:bg-gray-100 shadow transition flex items-center gap-3"
              >
                <FiZap className="text-lg" />
                {isAboutPage ? 'Back to Editor' : 'Start Generating'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReactAI;
