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
    <div className="relative w-full" style={{ paddingBottom: '120%' }}>
      <iframe
        ref={iframeRef}
        src={src}
        title="Zeffy Donation Form"
        className="absolute top-0 left-0 w-full h-full border-0 rounded-lg"
        allowpaymentrequest="true"
        allowtransparency="true"
        sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      ></iframe>
    </div>
  );
};

export default ZeffyEmbed;