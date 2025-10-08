// src/Components/Banner/Banner.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await api.get('/banners');
      if (response.data && response.data.length > 0) {
        setSlides(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast.error('Failed to load banner slides');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

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

  if (loading) {
    return (
      <section className="relative bg-gray-950 pt-16 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400"></div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative bg-gray-950 pt-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center text-gray-400">
          <p className="text-xl">No banner slides available</p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative bg-gray-950 pt-16"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full">
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
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-contain"
                style={{ maxHeight: '70vh' }}
                loading={currentSlide === 0 ? "eager" : "lazy"}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1470&q=80";
                }}
              />
            </motion.div>
          </AnimatePresence>
          <div className="relative w-full" style={{ paddingTop: '56.25%' }} />
        </div>

        <div className="relative bg-gray-950 px-6 py-6">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {slides[currentSlide].title}
            </h2>
            <Link
              to={slides[currentSlide].link || "/events"}
              className="inline-flex items-center gap-2 px-6 py-3
                        bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600
                        text-gray-900 text-sm font-semibold rounded-full
                        active:scale-95 transition-all shadow-lg"
            >
              <span>Book Now</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

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
