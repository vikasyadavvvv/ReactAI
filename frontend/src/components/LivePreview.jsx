import React, { useEffect, useRef, useState } from 'react';
import { FiZap } from 'react-icons/fi';

const LivePreview = ({ code }) => {
  const iframeRef = useRef(null);
  const [error, setError] = useState(null);

  const cleanCode = (raw) => {
    if (!raw) return '';
    return raw.replace(/^```(jsx|javascript)?|```$/gm, '').trim();
  };

  const renderReactInIframe = (reactCode) => {
    const processedCode = reactCode
      .replace(/import\s+.*?['"]react['"];?/g, '')
      .replace(/export\s+default/g, 'window.App =');

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, sans-serif;
              padding: 1rem;
              background: #fff;
            }
            .error {
              color: #e11d48;
              font-size: 0.875rem;
              white-space: pre-wrap;
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            const { useState, useEffect, useRef, useCallback, useMemo, useContext } = React;
            try {
              ${processedCode}
              const root = ReactDOM.createRoot(document.getElementById('root'));
              root.render(
                React.createElement(React.StrictMode, null, React.createElement(window.App))
              );
            } catch(err) {
              document.getElementById('root').innerHTML = \`
                <div class="error">
                  <strong>Rendering Error:</strong> \${err.message}<br/><br/>
                  <pre>\${err.stack}</pre>
                </div>
              \`;
              console.error(err);
            }
          </script>
        </body>
      </html>
    `;
  };

  useEffect(() => {
    if (!iframeRef.current) return;
    setError(null);

    const cleanedCode = cleanCode(code);
    if (!cleanedCode) return;  // don’t render anything if no code

    const isReact = /(export\s+default|function\s+App|const\s+App|class\s+App)/.test(cleanedCode);

    try {
      const doc = iframeRef.current.contentDocument;
      const finalHtml = isReact
        ? renderReactInIframe(cleanedCode)
        : cleanedCode.startsWith('<!DOCTYPE')
          ? cleanedCode
          : `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                <style> body { margin: 1rem; font-family: sans-serif; } </style>
              </head>
              <body>
                ${cleanedCode || ''}
              </body>
            </html>
          `;
      doc.open();
      doc.write(finalHtml);
      doc.close();
    } catch (err) {
      setError(`Initialization Error: ${err.message}`);
    }
  }, [code]);

  const cleanedCode = cleanCode(code);

  return (
    <div className="relative border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white h-[50vh] flex items-center justify-center">
      {(!cleanedCode && !error) ? (
        <div className="flex flex-col items-center justify-center text-gray-400">
          <FiZap className="h-10 w-10 mb-2" />
          <span className="text-sm">No preview generated yet</span>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          title="Live Preview"
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
        />
      )}

      {error && (
        <div className="absolute inset-0 bg-white bg-opacity-90 p-4 text-red-600 overflow-auto text-sm shadow-inner animate-fadeIn">
          <strong>Preview Error:</strong> {error}
        </div>
      )}
    </div>
  );
};

export default LivePreview;

