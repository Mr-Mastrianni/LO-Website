import React from 'react';

const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 focus:px-4 focus:py-2 bg-accent-gold text-white rounded-md"
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent;