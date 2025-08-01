import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const Logo = ({
  className = "h-12 w-auto",
  showText = true,
  variant = "default",
  animated = true,
  size = "medium"
}) => {
  const logoRef = useRef(null);
  const heartRef = useRef(null);
  const curveRef = useRef(null);
  const textRef = useRef(null);

  const logoVariants = {
    default: "text-gray-700",
    white: "text-white",
    dark: "text-gray-900"
  };

  const sizes = {
    small: { width: 80, height: 60, scale: 0.8 },
    medium: { width: 120, height: 80, scale: 1 },
    large: { width: 160, height: 120, scale: 1.3 }
  };

  const currentSize = sizes[size];

  useEffect(() => {
    if (!animated || !logoRef.current) return;

    // Initial animation on mount
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200
    });

    // Animate the curved L
    timeline.add({
      targets: curveRef.current,
      strokeDasharray: [anime.setDashoffset, 0],
      duration: 1000,
      delay: 200
    });

    // Animate hearts with a gentle pulse
    timeline.add({
      targets: heartRef.current?.children,
      scale: [0, 1],
      opacity: [0, 1],
      duration: 800,
      delay: anime.stagger(150),
      offset: 400
    });

    // Animate text
    timeline.add({
      targets: textRef.current?.children,
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 600,
      delay: anime.stagger(100),
      offset: 800
    });

    // Continuous gentle pulse for hearts
    anime({
      targets: heartRef.current?.children,
      scale: [1, 1.05, 1],
      duration: 2000,
      loop: true,
      direction: 'alternate',
      easing: 'easeInOutSine',
      delay: anime.stagger(300)
    });

  }, [animated]);

  return (
    <div className={`flex items-center space-x-3 ${className}`} ref={logoRef}>
      {/* Enhanced Logo SVG */}
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 160 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
        style={{ transform: `scale(${currentSize.scale})` }}
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="50%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#EF4444" />
          </linearGradient>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>

        {/* Enhanced Heart shapes */}
        <g ref={heartRef}>
          <path
            d="M110 30C110 18 118 10 128 10C138 10 146 18 146 30C146 42 128 65 128 65S110 42 110 30Z"
            fill="url(#heartGradient)"
            opacity="0.9"
            filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          />
          <path
            d="M90 30C90 18 98 10 108 10C118 10 128 18 128 30C128 42 108 65 108 65S90 42 90 30Z"
            fill="url(#heartGradient)"
            opacity="0.7"
            filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
          />
        </g>

        {/* Enhanced Curved "L" shape */}
        <path
          ref={curveRef}
          d="M20 20C20 20 20 55 20 68C20 81 30 90 43 90C56 90 70 90 70 90"
          stroke="url(#curveGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.1))"
          style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
        />

        {/* Enhanced Text */}
        <g ref={textRef}>
          <text
            x="20"
            y="42"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="11"
            fontWeight="700"
            fill={variant === 'white' ? '#FFFFFF' : '#374151'}
            letterSpacing="0.5px"
          >
            LIVING
          </text>
          <text
            x="20"
            y="55"
            fontFamily="Inter, Arial, sans-serif"
            fontSize="11"
            fontWeight="700"
            fill={variant === 'white' ? '#FFFFFF' : '#374151'}
            letterSpacing="0.5px"
          >
            ONCOLOGY
          </text>
        </g>
      </svg>

      {/* Enhanced text beside logo */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold text-xl leading-tight ${logoVariants[variant]} tracking-tight`}>
            Living Oncology
          </span>
          <span className={`text-sm opacity-75 ${logoVariants[variant]} font-medium`}>
            Supporting Brain Cancer Patients
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
