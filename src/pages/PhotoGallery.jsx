import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import '../styles/gallery-optimizations.css';

// Event-appropriate title labels for the 2026 gallery
const titleLabels = [
  "Opening Ceremony",
  "Welcome & Registration",
  "Dr. Gatson's Welcome Address",
  "Keynote Presentation",
  "Panel Discussion: Living with Brain Cancer",
  "Patient Advocate Stories",
  "Medical Research Updates",
  "Clinical Trials & Innovation",
  "Survivor Stories — LIVErs Speak",
  "Caregiver Panel",
  "Networking Break",
  "Community Connections",
  "Vendor & Sponsor Showcase",
  "Expert Speakers Panel",
  "Interactive Q&A Session",
  "Wellness & Nutrition Workshop",
  "Mental Health & Support",
  "Young Adult Support Group",
  "Family Support & Resources",
  "Educational Resources Fair",
  "Treatment Options Discussion",
  "Alternative Medicine Panel",
  "Supportive Care Strategies",
  "Advocacy & Policy Update",
  "Technology & Innovation Showcase",
  "Community Awards — Raindrop Honorees",
  "Volunteer Recognition",
  "Group Activities",
  "Attendee Interaction",
  "Hope & Healing Circle",
  "Unity & Strength",
  "Inspiration Wall",
  "Celebration Moments",
  "Closing Ceremony",
  "Final Group Photo",
  "Thank You Message",
  "Community Gathering",
  "Lunch & Networking",
  "Research Poster Session",
  "Healthcare Professional Networking",
  "Patient-Doctor Connection",
  "Sponsor Recognition",
  "Evening Celebration",
  "Future Planning Session",
  "I AM the STORM — Closing"
];

// Build the image list from the selected spread
const selectedNums = [1, 12, 23, 34, 45, 56, 67, 78, 89, 100, 111, 122, 133, 144, 155, 166, 177, 188, 199, 210, 221, 232, 243, 254, 265, 276, 287, 298, 309, 320, 331, 342, 353, 364, 375, 386, 397, 408, 419, 430, 441, 452, 463, 474, 485];

const allImages = selectedNums.map((num, i) => ({
  id: i + 1,
  src: `${import.meta.env.BASE_URL}images/2026/brainstorm-2026-${String(num).padStart(3, '0')}.jpg`,
  alt: `BrainStorm Cancer 2026 — ${titleLabels[i] || `Photo ${i + 1}`}`,
  title: titleLabels[i] || `BrainStorm Cancer 2026 — Photo ${i + 1}`,
  event: "BrainStorm Cancer 2026"
}));

const PhotoGallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [imageLoading, setImageLoading] = useState(new Set());

  const memoizedImages = useMemo(() => allImages, []);

  useEffect(() => {
    if (isAutoPlaying && memoizedImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlideIndex(prev => (prev + 1) % memoizedImages.length);
      }, 4000);
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
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
  };

  useEffect(() => {
    const preloadImage = (src) => {
      const img = new Image();
      img.src = src;
    };
    const currentImage = memoizedImages[currentSlideIndex];
    const nextImage = memoizedImages[(currentSlideIndex + 1) % memoizedImages.length];
    const prevImage = memoizedImages[currentSlideIndex === 0 ? memoizedImages.length - 1 : currentSlideIndex - 1];
    if (currentImage) preloadImage(currentImage.src);
    if (nextImage) preloadImage(nextImage.src);
    if (prevImage) preloadImage(prevImage.src);
  }, [currentSlideIndex, memoizedImages]);

  const openLightbox = (image) => setLightboxImage(image);
  const closeLightbox = () => setLightboxImage(null);

  return (
    <>
      <Helmet>
        <title>Photo Gallery - Living Oncology</title>
        <meta name="description" content="Explore photos from the BrainStorm Cancer 2026 symposium — patients, physicians, researchers, and families united in hope and education." />
      </Helmet>

      <section className="bg-gradient-to-br from-gray-50 to-yellow-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              BrainStorm Cancer 2026
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Capturing moments of hope, learning, and community at our third annual symposium — May 9, 2026
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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

                {memoizedImages.length > 1 && (
                  <>
                    <button onClick={prevSlide} className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation" aria-label="Previous image">
                      <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation" aria-label="Next image">
                      <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                    </button>
                  </>
                )}

                {memoizedImages.length > 1 && (
                  <button onClick={toggleAutoPlay} className="absolute top-2 md:top-4 right-2 md:right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 md:p-3 rounded-full transition-all duration-300 z-10 touch-manipulation" aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}>
                    {isAutoPlaying ? <Pause className="w-4 h-4 md:w-5 md:h-5" /> : <Play className="w-4 h-4 md:w-5 md:h-5" />}
                  </button>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 md:p-6">
                  <div className="text-white">
                    <p className="text-xs md:text-sm opacity-80 mb-1">{memoizedImages[currentSlideIndex]?.event}</p>
                    <h3 className="text-sm md:text-xl font-semibold">{memoizedImages[currentSlideIndex]?.title}</h3>
                  </div>
                </div>
              </div>

              {memoizedImages.length > 1 && (
                <div className="flex justify-center mt-4 md:mt-6 space-x-1 md:space-x-2 overflow-x-auto pb-2 px-4">
                  {memoizedImages.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => goToSlide(index)}
                      className={`flex-shrink-0 w-12 h-10 md:w-20 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 touch-manipulation ${currentSlideIndex === index ? 'border-primary shadow-lg scale-110' : 'border-gray-300 hover:border-gray-400'}`}
                    >
                      <img src={image.src} alt={image.alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}

              {memoizedImages.length > 1 && (
                <div className="text-center mt-3 md:mt-4">
                  <span className="text-gray-600 text-sm md:text-base">{currentSlideIndex + 1} of {memoizedImages.length}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4" onClick={closeLightbox}>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
              <button onClick={closeLightbox} className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10" aria-label="Close lightbox">
                <X className="w-8 h-8" />
              </button>
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <img className="w-full h-auto max-h-[80vh] object-contain" src={lightboxImage.src} alt={lightboxImage.alt} />
                {lightboxImage.title && (
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-semibold text-primary text-center">{lightboxImage.title}</h3>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-16 bg-gradient-to-r from-gray-600 to-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold text-white mb-6">Join Our Community</h2>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              Be part of our growing community and help us create more moments of hope, learning, and connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/brainstorm-cancer" className="bg-white text-gray-700 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">View Our Events</a>
              <a href="/contact" className="btn-primary">Get Involved</a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default PhotoGallery;