import React, { useEffect, useRef } from 'react';
import LivingOncologyLogoPNG from '@/assets/living-oncology-logo.png';

const HeroLogo = ({
  className = "w-full max-w-md mx-auto"
}) => {
  const logoRef = useRef(null);

  useEffect(() => {
    if (logoRef.current) {
      import('animejs').then(anime => {
        anime.default({
          targets: logoRef.current,
          scale: [0.8, 1],
          opacity: [0, 1],
          duration: 1500,
          easing: 'easeOutElastic(1, .8)',
        });
      });
    }
  }, []);

  return (
    <div className={className}>
      <img
        ref={logoRef}
        src="/images/LIVING-ONCOLOGY.png"
        alt="Living Oncology Logo"
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeroLogo;
