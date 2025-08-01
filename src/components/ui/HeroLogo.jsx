import React, { useEffect, useRef } from 'react';
import anime from 'animejs';

const HeroLogo = ({ className = "w-full max-w-md mx-auto" }) => {
  const logoRef = useRef(null);
  const heartRef = useRef(null);
  const curveRef = useRef(null);
  const textRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Create a dramatic entrance animation
    const timeline = anime.timeline({
      easing: 'easeOutExpo',
      duration: 2000
    });

    // Start with everything hidden
    anime.set([heartRef.current, curveRef.current, textRef.current], {
      opacity: 0,
      scale: 0
    });

    // Animate the curved L with drawing effect
    timeline.add({
      targets: curveRef.current,
      strokeDasharray: [anime.setDashoffset, 0],
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1500,
      delay: 300
    });

    // Animate hearts with bouncy entrance
    timeline.add({
      targets: heartRef.current?.children,
      scale: [0, 1.2, 1],
      opacity: [0, 1],
      rotate: [0, 10, 0],
      duration: 1200,
      delay: anime.stagger(200),
      offset: 800,
      easing: 'easeOutElastic(1, .8)'
    });

    // Animate text with typewriter effect
    timeline.add({
      targets: textRef.current?.children,
      translateY: [30, 0],
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 800,
      delay: anime.stagger(150),
      offset: 1200
    });

    // Add glow effect
    timeline.add({
      targets: glowRef.current,
      opacity: [0, 0.3, 0.1],
      scale: [0.8, 1.1, 1],
      duration: 1000,
      offset: 1500
    });

    // Continuous animations
    setTimeout(() => {
      // Gentle pulse for hearts
      anime({
        targets: heartRef.current?.children,
        scale: [1, 1.08, 1],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        delay: anime.stagger(500)
      });

      // Subtle glow pulse
      anime({
        targets: glowRef.current,
        opacity: [0.1, 0.2, 0.1],
        duration: 4000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      });
    }, 2500);

  }, []);

  return (
    <div className={className} ref={logoRef}>
      <svg 
        width="400" 
        height="300"
        viewBox="0 0 400 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Enhanced Gradient Definitions */}
        <defs>
          <radialGradient id="heroHeartGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B9D" />
            <stop offset="30%" stopColor="#F87171" />
            <stop offset="70%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#DC2626" />
          </radialGradient>
          
          <linearGradient id="heroCurveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="30%" stopColor="#8B5CF6" />
            <stop offset="70%" stopColor="#A855F7" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <filter id="shadow">
            <feDropShadow dx="4" dy="4" stdDeviation="6" floodOpacity="0.3"/>
          </filter>
        </defs>
        
        {/* Glow background */}
        <circle 
          ref={glowRef}
          cx="200" 
          cy="150" 
          r="120" 
          fill="url(#heroHeartGradient)" 
          opacity="0"
          filter="url(#glow)"
        />
        
        {/* Enhanced Heart shapes - larger and more prominent */}
        <g ref={heartRef}>
          <path 
            d="M280 80C280 50 300 30 330 30C360 30 380 50 380 80C380 110 330 170 330 170S280 110 280 80Z" 
            fill="url(#heroHeartGradient)" 
            opacity="0.95"
            filter="url(#shadow)"
          />
          <path 
            d="M230 80C230 50 250 30 280 30C310 30 330 50 330 80C330 110 280 170 280 170S230 110 230 80Z" 
            fill="url(#heroHeartGradient)" 
            opacity="0.8"
            filter="url(#shadow)"
          />
        </g>
        
        {/* Enhanced Curved "L" shape - much larger */}
        <path 
          ref={curveRef}
          d="M50 50C50 50 50 150 50 180C50 210 70 230 100 230C130 230 180 230 180 230" 
          stroke="url(#heroCurveGradient)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          fill="none"
          filter="url(#shadow)"
          style={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
        />
        
        {/* Enhanced Text - larger and more prominent */}
        <g ref={textRef}>
          <text 
            x="50" 
            y="120" 
            fontFamily="Inter, Arial, sans-serif" 
            fontSize="28" 
            fontWeight="800" 
            fill="#374151"
            letterSpacing="2px"
            filter="url(#shadow)"
          >
            LIVING
          </text>
          <text 
            x="50" 
            y="155" 
            fontFamily="Inter, Arial, sans-serif" 
            fontSize="28" 
            fontWeight="800" 
            fill="#374151"
            letterSpacing="2px"
            filter="url(#shadow)"
          >
            ONCOLOGY
          </text>
          
          {/* Subtitle */}
          <text 
            x="50" 
            y="185" 
            fontFamily="Inter, Arial, sans-serif" 
            fontSize="14" 
            fontWeight="500" 
            fill="#6B7280"
            letterSpacing="1px"
            opacity="0.8"
          >
            Supporting Brain Cancer Patients
          </text>
        </g>
      </svg>
    </div>
  );
};

export default HeroLogo;
