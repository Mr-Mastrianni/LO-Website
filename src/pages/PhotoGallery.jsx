import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import '../styles/gallery-optimizations.css';

const PhotoGallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());

  // All photos combined into one slideshow
  const allImages = [
    // BrainStorm Cancer Arizona '25 images (from local folder)
    {
      id: 1,
      src: `${import.meta.env.BASE_URL}images/01 (1).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Opening Ceremony',
      title: "BrainStorm Cancer Arizona '25 - Opening Ceremony",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 2,
      src: `${import.meta.env.BASE_URL}images/01 (4).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Welcome Address',
      title: "BrainStorm Cancer Arizona '25 - Welcome Address",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 3,
      src: `${import.meta.env.BASE_URL}images/01 (7).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Keynote Presentation',
      title: "BrainStorm Cancer Arizona '25 - Keynote Presentation",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 4,
      src: `${import.meta.env.BASE_URL}images/01 (8).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Audience Engagement',
      title: "BrainStorm Cancer Arizona '25 - Audience Engagement",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 5,
      src: `${import.meta.env.BASE_URL}images/01 (17).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Panel Discussion',
      title: "BrainStorm Cancer Arizona '25 - Panel Discussion",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 6,
      src: `${import.meta.env.BASE_URL}images/01 (20).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Expert Speakers',
      title: "BrainStorm Cancer Arizona '25 - Expert Speakers",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 7,
      src: `${import.meta.env.BASE_URL}images/01 (23).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Interactive Session',
      title: "BrainStorm Cancer Arizona '25 - Interactive Session",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 8,
      src: `${import.meta.env.BASE_URL}images/01 (25).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Community Gathering',
      title: "BrainStorm Cancer Arizona '25 - Community Gathering",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 9,
      src: `${import.meta.env.BASE_URL}images/01 (27).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Networking Break',
      title: "BrainStorm Cancer Arizona '25 - Networking Break",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 10,
      src: `${import.meta.env.BASE_URL}images/01 (30).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Workshop Session',
      title: "BrainStorm Cancer Arizona '25 - Workshop Session",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 11,
      src: `${import.meta.env.BASE_URL}images/01 (41).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Patient Stories',
      title: "BrainStorm Cancer Arizona '25 - Patient Stories",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 12,
      src: `${import.meta.env.BASE_URL}images/01 (50).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Research Presentation',
      title: "BrainStorm Cancer Arizona '25 - Research Presentation",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 13,
      src: `${import.meta.env.BASE_URL}images/01 (52).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Medical Professionals',
      title: "BrainStorm Cancer Arizona '25 - Medical Professionals",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 14,
      src: `${import.meta.env.BASE_URL}images/01 (62).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Support Group Discussion',
      title: "BrainStorm Cancer Arizona '25 - Support Group Discussion",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 15,
      src: `${import.meta.env.BASE_URL}images/01 (69).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Educational Resources',
      title: "BrainStorm Cancer Arizona '25 - Educational Resources",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 16,
      src: `${import.meta.env.BASE_URL}images/01 (71).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Caregiver Workshop',
      title: "BrainStorm Cancer Arizona '25 - Caregiver Workshop",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 17,
      src: `${import.meta.env.BASE_URL}images/01 (72).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Community Support',
      title: "BrainStorm Cancer Arizona '25 - Community Support",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 18,
      src: `${import.meta.env.BASE_URL}images/01 (73).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Information Booth',
      title: "BrainStorm Cancer Arizona '25 - Information Booth",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 19,
      src: `${import.meta.env.BASE_URL}images/01 (79).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Attendee Interaction',
      title: "BrainStorm Cancer Arizona '25 - Attendee Interaction",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 20,
      src: `${import.meta.env.BASE_URL}images/01 (82).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Clinical Trials Discussion',
      title: "BrainStorm Cancer Arizona '25 - Clinical Trials Discussion",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 21,
      src: `${import.meta.env.BASE_URL}images/01 (85).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Wellness Session',
      title: "BrainStorm Cancer Arizona '25 - Wellness Session",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 22,
      src: `${import.meta.env.BASE_URL}images/01 (93).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Resource Fair',
      title: "BrainStorm Cancer Arizona '25 - Resource Fair",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 23,
      src: `${import.meta.env.BASE_URL}images/01 (97).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Group Activities',
      title: "BrainStorm Cancer Arizona '25 - Group Activities",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 24,
      src: `${import.meta.env.BASE_URL}images/01 (101).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Survivor Stories',
      title: "BrainStorm Cancer Arizona '25 - Survivor Stories",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 25,
      src: `${import.meta.env.BASE_URL}images/01 (107).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Medical Symposium',
      title: "BrainStorm Cancer Arizona '25 - Medical Symposium",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 26,
      src: `${import.meta.env.BASE_URL}images/01 (108).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Technology Showcase',
      title: "BrainStorm Cancer Arizona '25 - Technology Showcase",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 27,
      src: `${import.meta.env.BASE_URL}images/01 (112).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Family Support',
      title: "BrainStorm Cancer Arizona '25 - Family Support",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 28,
      src: `${import.meta.env.BASE_URL}images/01 (115).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Research Updates',
      title: "BrainStorm Cancer Arizona '25 - Research Updates",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 29,
      src: `${import.meta.env.BASE_URL}images/01 (119).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Community Connections',
      title: "BrainStorm Cancer Arizona '25 - Community Connections",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 30,
      src: `${import.meta.env.BASE_URL}images/01 (126).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Hope and Healing',
      title: "BrainStorm Cancer Arizona '25 - Hope and Healing",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 31,
      src: `${import.meta.env.BASE_URL}images/01 (132).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Advocacy Training',
      title: "BrainStorm Cancer Arizona '25 - Advocacy Training",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 32,
      src: `${import.meta.env.BASE_URL}images/01 (136).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Nutrition Workshop',
      title: "BrainStorm Cancer Arizona '25 - Nutrition Workshop",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 33,
      src: `${import.meta.env.BASE_URL}images/01 (148).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Mental Health Support',
      title: "BrainStorm Cancer Arizona '25 - Mental Health Support",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 34,
      src: `${import.meta.env.BASE_URL}images/01 (149).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Exercise and Wellness',
      title: "BrainStorm Cancer Arizona '25 - Exercise and Wellness",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 35,
      src: `${import.meta.env.BASE_URL}images/01 (151).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Financial Planning',
      title: "BrainStorm Cancer Arizona '25 - Financial Planning",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 36,
      src: `${import.meta.env.BASE_URL}images/01 (160).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Legal Resources',
      title: "BrainStorm Cancer Arizona '25 - Legal Resources",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 37,
      src: `${import.meta.env.BASE_URL}images/01 (165).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Young Adult Support',
      title: "BrainStorm Cancer Arizona '25 - Young Adult Support",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 38,
      src: `${import.meta.env.BASE_URL}images/01 (179).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Pediatric Care',
      title: "BrainStorm Cancer Arizona '25 - Pediatric Care",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 39,
      src: `${import.meta.env.BASE_URL}images/01 (184).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Treatment Options',
      title: "BrainStorm Cancer Arizona '25 - Treatment Options",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 40,
      src: `${import.meta.env.BASE_URL}images/01 (208).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Innovation Showcase',
      title: "BrainStorm Cancer Arizona '25 - Innovation Showcase",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 41,
      src: `${import.meta.env.BASE_URL}images/01 (214).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Community Awards',
      title: "BrainStorm Cancer Arizona '25 - Community Awards",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 42,
      src: `${import.meta.env.BASE_URL}images/01 (221).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Volunteer Recognition',
      title: "BrainStorm Cancer Arizona '25 - Volunteer Recognition",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 43,
      src: `${import.meta.env.BASE_URL}images/01 (236).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Closing Ceremony',
      title: "BrainStorm Cancer Arizona '25 - Closing Ceremony",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 44,
      src: `${import.meta.env.BASE_URL}images/01 (245).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Final Group Photo',
      title: "BrainStorm Cancer Arizona '25 - Final Group Photo",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 45,
      src: `${import.meta.env.BASE_URL}images/01 (266).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Thank You Message',
      title: "BrainStorm Cancer Arizona '25 - Thank You Message",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 46,
      src: `${import.meta.env.BASE_URL}images/01 (275).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Future Planning',
      title: "BrainStorm Cancer Arizona '25 - Future Planning",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 47,
      src: `${import.meta.env.BASE_URL}images/01 (290).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Inspiration Wall',
      title: "BrainStorm Cancer Arizona '25 - Inspiration Wall",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 48,
      src: `${import.meta.env.BASE_URL}images/01 (310).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Memory Book',
      title: "BrainStorm Cancer Arizona '25 - Memory Book",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 49,
      src: `${import.meta.env.BASE_URL}images/01 (324).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Celebration Moments',
      title: "BrainStorm Cancer Arizona '25 - Celebration Moments",
      event: "BrainStorm Cancer Arizona '25"
    },
    {
      id: 50,
      src: `${import.meta.env.BASE_URL}images/01 (325).jpg`,
      alt: 'BrainStorm Cancer Arizona 2025 Conference - Unity and Strength',
      title: "BrainStorm Cancer Arizona '25 - Unity and Strength",
      event: "BrainStorm Cancer Arizona '25"
    }
  ];

  // Memoize images for performance
  const memoizedImages = useMemo(() => allImages, []);

  // Auto-advance slides
  useEffect(() => {
    if (isAutoPlaying && memoizedImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % memoizedImages.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, memoizedImages.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev + 1) % memoizedImages.length);
  }, [memoizedImages.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => prev === 0 ? memoizedImages.length - 1 : prev - 1);
  }, [memoizedImages.length]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying(prev => !prev);
  }, []);

  const goToSlide = useCallback((index) => {
    setCurrentSlideIndex(index);
  }, []);

  const handleImageError = useCallback((imageId) => {
    setImageErrors(prev => new Set([...prev, imageId]));
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  }, []);

  const handleImageLoad = useCallback((imageId) => {
    setImageLoading(prev => {
      const newSet = new Set(prev);
      newSet.delete(imageId);
      return newSet;
    });
  }, []);

  const handleImageLoadStart = useCallback((imageId) => {
    setImageLoading(prev => new Set([...prev, imageId]));
  }, []);

  // Touch gesture support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Preload adjacent images for smoother transitions
  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };

    // Preload current, next, and previous images
    const currentImage = memoizedImages[currentSlideIndex];
    const nextImage = memoizedImages[(currentSlideIndex + 1) % memoizedImages.length];
    const prevImage = memoizedImages[currentSlideIndex === 0 ? memoizedImages.length - 1 : currentSlideIndex - 1];

    if (currentImage) preloadImage(currentImage.src);
    if (nextImage) preloadImage(nextImage.src);
    if (prevImage) preloadImage(prevImage.src);
  }, [currentSlideIndex, memoizedImages]);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  return (
    <>
      <Helmet>
        <title>Photo Gallery - Living Oncology</title>
        <meta name="description" content="Explore photos from Living Oncology events, conferences, workshops, and community gatherings. See our impact in the neuro-oncology community." />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Photo Gallery
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Capturing moments of hope, learning, and community in our journey together
            </p>
          </motion.div>
        </div>
      </section>

      {/* Single Photo Slideshow */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Slideshow Container */}
            <div className="relative max-w-5xl mx-auto">
              <div
                className="slideshow-container relative aspect-[16/10] bg-gray-100 rounded-xl overflow-hidden shadow-2xl touch-optimized"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlideIndex}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 cursor-pointer"
                    onClick={() => openLightbox(memoizedImages[currentSlideIndex])}
                  >
                    {imageErrors.has(memoizedImages[currentSlideIndex]?.id) ? (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                          <div className="text-4xl mb-2">📷</div>
                          <p className="text-sm">Image not available</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        {imageLoading.has(memoizedImages[currentSlideIndex]?.id) && (
                          <div className="absolute inset-0 bg-gray-200 image-loading"></div>
                        )}
                        <img
                          src={memoizedImages[currentSlideIndex]?.src}
                          alt={memoizedImages[currentSlideIndex]?.alt}
                          className="gallery-image w-full h-full object-cover"
                          loading="eager"
                          decoding="async"
                          onLoadStart={() => handleImageLoadStart(memoizedImages[currentSlideIndex]?.id)}
                          onLoad={() => handleImageLoad(memoizedImages[currentSlideIndex]?.id)}
                          onError={() => handleImageError(memoizedImages[currentSlideIndex]?.id)}
                          style={{
                            imageRendering: 'auto',
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)'
                          }}
                        />
                      </>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <ZoomIn className="w-8 h-8 md:w-12 md:h-12 text-white opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {memoizedImages.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </>
                )}

                {/* Play/Pause Button */}
                {memoizedImages.length > 1 && (
                  <button
                    onClick={toggleAutoPlay}
                    className="absolute top-2 md:top-4 right-2 md:right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation"
                    aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <Play className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </button>
                )}

                {/* Image Title and Event Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 md:p-6">
                  <div className="text-white">
                    <p className="text-xs md:text-sm opacity-80 mb-1">{memoizedImages[currentSlideIndex]?.event}</p>
                    <h3 className="text-sm md:text-xl font-semibold">
                      {memoizedImages[currentSlideIndex]?.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {memoizedImages.length > 1 && (
                <div className="flex justify-center mt-4 md:mt-6 space-x-1 md:space-x-2 overflow-x-auto pb-2 px-4">
                  {memoizedImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-12 h-10 md:w-20 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation ${
                        currentSlideIndex === index
                          ? 'border-primary shadow-lg scale-110'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Slide Counter */}
              {memoizedImages.length > 1 && (
                <div className="text-center mt-3 md:mt-4">
                  <span className="text-gray-600 text-sm md:text-base">
                    {currentSlideIndex + 1} of {memoizedImages.length}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <img
                  className="w-full h-auto max-h-[80vh] object-contain"
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                />
                {lightboxImage.title && (
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-primary text-center">
                      {lightboxImage.title}
                    </h3>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
              Be part of our growing community and help us create more moments of hope, learning, and connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/brainstorm-cancer" className="bg-white text-green-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                View Our Events
              </a>
              <a href="/contact" className="btn-primary">
                Get Involved
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PhotoGallery;