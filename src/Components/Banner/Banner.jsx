import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const slides = [
  { id: 1, title: "Birthdays", image: "/BannerImg/slide-1.webp", link: "/events/birthdays" },
  { id: 2, title: "Weddings", image: "/BannerImg/slide-2.webp", link: "/events/weddings" },
  { id: 3, title: "Anniversaries", image: "/BannerImg/slide-3.webp", link: "/events/anniversaries" },
  { id: 4, title: "Baby Showers", image: "/BannerImg/slide-4.webp", link: "/events/baby-showers" },
  { id: 5, title: "Corporate Events", image: "/BannerImg/slide-5.webp", link: "/events/corporate" },
  { id: 6, title: "Social Gatherings", image: "/BannerImg/slide-6.webp", link: "/events/social" },
  { id: 7, title: "Festivals & Parties", image: "/BannerImg/slide-7.webp", link: "/events/festivals" },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setDirection(-1);
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  return (
    <section 
      className="relative bg-gray-950 pt-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main Carousel Container */}
      <div className="relative w-full">
        
        {/* Image Container - Full Width with Aspect Ratio */}
        <div className="relative w-full bg-gray-900">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              initial={{ 
                x: shouldReduceMotion ? 0 : (direction > 0 ? "100%" : "-100%"),
                opacity: 0 
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ 
                x: shouldReduceMotion ? 0 : (direction > 0 ? "-100%" : "100%"),
                opacity: 0 
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {/* Full Image with object-contain for complete visibility */}
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-contain"
                style={{
                  maxHeight: '70vh',
                }}
                loading={currentSlide === 0 ? "eager" : "lazy"}
              />
            </motion.div>
          </AnimatePresence>

          {/* Aspect Ratio Container - Maintains space */}
          <div className="relative w-full" style={{ paddingTop: '56.25%' }} />
        </div>

        {/* Content Section Below Image */}
        <div className="relative bg-gray-950 px-6 py-6">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            {/* Title - Smaller Size */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {slides[currentSlide].title}
            </h2>

            {/* CTA Button - Smaller Size */}
            <Link
              to={slides[currentSlide].link}
              className="inline-flex items-center gap-2 px-6 py-3
                        bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600
                        text-gray-900 text-sm font-semibold rounded-full
                        active:scale-95 transition-all
                        shadow-lg"
            >
              <span>Book Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Navigation Dots */}
        <div className="relative bg-gray-950 pb-6 px-6">
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300
                  ${index === currentSlide 
                    ? 'w-8 bg-yellow-400' 
                    : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                  }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
