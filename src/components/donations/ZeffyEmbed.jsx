import React, { useEffect, useRef, useCallback } from 'react';

const ZeffyEmbed = ({ src, height = 800, onDonationComplete }) => {
  const iframeRef = useRef(null);
  const completedRef = useRef(false);

  // Listen for postMessage events from Zeffy iframe
  const handleMessage = useCallback((event) => {
    // Only process messages from Zeffy's domain
    if (!event.origin.includes('zeffy.com')) return;

    const data = event.data;

    // Log all Zeffy messages for debugging
    console.log('📩 Zeffy postMessage:', data);

    // Zeffy sends various messages - detect completion signals
    // Common patterns: thank you page, success status, confirmation
    if (typeof data === 'string') {
      const lower = data.toLowerCase();
      if (
        lower.includes('success') ||
        lower.includes('thank') ||
        lower.includes('complete') ||
        lower.includes('confirmed') ||
        lower.includes('donation_complete')
      ) {
        if (!completedRef.current && onDonationComplete) {
          completedRef.current = true;
          console.log('✅ Zeffy donation completed (string message)');
          onDonationComplete();
        }
      }
    }

    if (typeof data === 'object' && data !== null) {
      // Check for Zeffy's structured messages
      const dataStr = JSON.stringify(data).toLowerCase();
      if (
        dataStr.includes('success') ||
        dataStr.includes('thank') ||
        dataStr.includes('complete') ||
        dataStr.includes('confirmed') ||
        data.type === 'donation_complete' ||
        data.status === 'success' ||
        data.event === 'donation_complete' ||
        data.event === 'payment_success' ||
        data.event === 'form_submitted'
      ) {
        if (!completedRef.current && onDonationComplete) {
          completedRef.current = true;
          console.log('✅ Zeffy donation completed (object message)');
          onDonationComplete();
        }
      }

      // Zeffy uses iframe resizing messages - a significant height reduction 
      // after a form was shown can indicate a thank-you page  
      if (data.type === 'resize' && data.height && data.height < 200) {
        if (!completedRef.current && onDonationComplete) {
          completedRef.current = true;
          console.log('✅ Zeffy donation likely completed (iframe resize to thank-you)');
          onDonationComplete();
        }
      }
    }
  }, [onDonationComplete]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

  // Reset completion state when src changes
  useEffect(() => {
    completedRef.current = false;
  }, [src]);

  useEffect(() => {
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
    <div className="relative w-full" style={{ minHeight: `${height}px` }}>
      <iframe
        ref={iframeRef}
        src={src}
        title="Zeffy Donation Form"
        style={{ width: '100%', height: `${height}px`, border: 'none', borderRadius: '8px' }}
        allowpaymentrequest="true"
        allowtransparency="true"
      ></iframe>
    </div>
  );
};

export default ZeffyEmbed;