import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiZap, FiInfo, FiMenu, FiX } from 'react-icons/fi';

const ReactAI = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo/Branding - always visible */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-75"></div>
              <FiZap className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-200 to-white">
              ReactAI
            </h1>
          </div>
          {/* Hidden on mobile */}
          <span className="hidden md:inline-flex items-center text-sm bg-white/20 px-3 py-1 rounded-full">
            <span className="mr-1">⚡</span> No Signup Required
          </span>
        </div>

        {/* Mobile Toggle Button - only on mobile */}
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

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-4">
          <button 
            onClick={() => navigate('/about')}
            className={`text-sm px-3 py-1 rounded transition flex items-center gap-2 ${
              isAboutPage 
                ? 'bg-white/30 border border-white/20' 
                : 'hover:bg-white/10'
            }`}
          >
            <FiInfo className={`${isAboutPage ? 'text-white' : 'text-white/80'}`} />
            <span>About ReactAI</span>
          </button>
          <button 
            onClick={() => navigate('/')}
            className={`text-sm px-4 py-2 rounded-full font-medium transition-all shadow-md flex items-center gap-1 ${
              isAboutPage
                ? 'bg-white text-blue-600 hover:bg-blue-50'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FiZap className="h-4 w-4" />
            {isAboutPage ? 'Back to Editor' : 'Start Generating'}
          </button>
        </div>

        {/* Mobile Menu - appears when toggle is clicked */}
        {mobileMenuOpen && (
          <div className="absolute md:hidden top-20 left-0 right-0 bg-gradient-to-b from-blue-600 to-purple-600 z-50 p-4 shadow-xl">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                  isAboutPage 
                    ? 'bg-white/30 border border-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                <FiInfo className="text-lg" />
                <span>About ReactAI</span>
              </button>
              <button 
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-left px-4 py-3 rounded-lg font-medium bg-white text-blue-600 hover:bg-blue-50 transition-all flex items-center gap-3"
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