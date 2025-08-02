import React, { useEffect, useRef } from 'react';
import logoImage from '../../images/LIVING-ONCOLOGY.png';

const HeroLogo = ({
  className = "w-full max-w-md mx-auto"
}) => {
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      import('animejs').then(({ animate }) => {
        animate({
          targets: logoRef.current,
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 1500,
          ease: 'outElastic(1, .8)',
        });
      }).catch(error => {
        console.warn('Failed to load anime.js:', error);
      });
    }
  }, []);

  return (
    <div className={className}>
      <img
        ref={logoRef}
        src={logoImage}
        alt="Living Oncology Logo"
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeroLogo;
