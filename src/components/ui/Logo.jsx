import React, { useRef } from 'react';

const Logo = ({
  className = "h-12 w-auto",
  showText = true,
  variant = "default",
  animated = true,
  size = "medium"
}) => {
  const logoRef = useRef(null);

  const handleMouseEnter = () => {
    if (logoRef.current) {
      import('animejs').then(anime => {
        anime.default({
          targets: logoRef.current,
          scale: [1, 1.05],
          duration: 300,
          easing: 'easeOutQuad',
        });
      });
    }
  };

  const handleMouseLeave = () => {
    if (logoRef.current) {
      import('animejs').then(anime => {
        anime.default({
          targets: logoRef.current,
          scale: [1.05, 1],
          duration: 200,
          easing: 'easeOutQuad',
        });
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
        src="/images/LIVING-ONCOLOGY.png"
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
