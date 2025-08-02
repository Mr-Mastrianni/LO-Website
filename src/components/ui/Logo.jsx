import React, { useRef } from 'react';
import logoImage from '../../images/LIVING-ONCOLOGY.png';

const Logo = ({
  className = "h-12 w-auto",
  showText = true,
  variant = "default",
  animated = true,
  size = "medium"
}) => {
  const logoRef = useRef(null);

  const handleMouseEnter = () => {
    if (logoRef.current && animated) {
      import('animejs').then(({ animate }) => {
        animate({
          targets: logoRef.current,
          scale: [1, 1.05],
          duration: 300,
          ease: 'outQuad',
        });
      }).catch(error => {
        console.warn('Failed to load anime.js:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    if (logoRef.current && animated) {
      import('animejs').then(({ animate }) => {
        animate({
          targets: logoRef.current,
          scale: [1.05, 1],
          duration: 200,
          ease: 'outQuad',
        });
      }).catch(error => {
        console.warn('Failed to load anime.js:', error);
      });
    }
  };

  const logoVariants = {
    default: "text-gray-700",
    white: "text-white",
    dark: "text-gray-900"
  };

  const sizes = {
    small: "h-8",
    medium: "h-12",
    large: "h-16"
  };

  const currentSizeClass = sizes[size];

  return (
    <div
      className={`flex items-center space-x-3 ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={logoRef}
        src={logoImage}
        alt="Living Oncology Logo"
        className={`flex-shrink-0 ${currentSizeClass}`}
      />

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-xl leading-tight ${logoVariants[variant]} tracking-tight`}>
            Living Oncology
          </span>
          <span className={`text-sm opacity-75 ${logoVariants[variant]} font-medium`}>
            Cancer Health Literacy & Support
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
