import React, { useEffect, useRef } from 'react';

const ZeffyEmbed = ({ src }) => {
  const iframeRef = useRef(null);

  useEffect(() => {
    console.log('🔍 Zeffy embed URL:', src);

    const handleLoad = () => {
      console.log('✅ Zeffy iframe loaded successfully');
    };

    const handleError = (e) => {
      console.error('❌ Zeffy iframe failed to load:', e);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleLoad);
      iframe.addEventListener('error', handleError);

      return () => {
        iframe.removeEventListener('load', handleLoad);
        iframe.removeEventListener('error', handleError);
      };
    }
  }, [src]);

  if (!src) {
    return null;
  }

  return (
    <div className="relative w-full" style={{ minHeight: '800px' }}>
      <iframe
        ref={iframeRef}
        src={src}
        title="Zeffy Donation Form"
        style={{ width: '100%', height: '800px', border: 'none', borderRadius: '8px' }}
        allowpaymentrequest="true"
        allowtransparency="true"
      ></iframe>
    </div>
  );
};

export default ZeffyEmbed;