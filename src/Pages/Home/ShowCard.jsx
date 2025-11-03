// src/components/Home/ShowCard.jsx
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { FaTimes, FaDownload, FaPause, FaPlay } from 'react-icons/fa';

// Event type color themes
const eventColors = {
  birthday: {
    border: "from-pink-400 via-yellow-400 to-pink-400",
  },
  wedding: {
    border: "from-red-500 via-yellow-500 to-red-500",
  },
  anniversary: {
    border: "from-purple-500 via-blue-500 to-purple-500",
  },
  babyshower: {
    border: "from-blue-400 via-pink-400 to-blue-400",
  },
  corporate: {
    border: "from-gray-500 via-blue-600 to-gray-500",
  },
  engagement: {
    border: "from-rose-500 via-orange-500 to-rose-500",
  },
  default: {
    border: "from-yellow-500 via-amber-500 to-yellow-500",
  }
};

// Different slide durations - 3s to 6s
const slideDurations = [3000, 3500, 4000, 4500, 5000, 5500, 6000];

// Different animation variants for cards entry
const cardAnimations = [
  { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" } },
  { initial: { opacity: 0, y: -40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, ease: "easeOut" } },
  { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.4, ease: "easeOut" } },
  { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.4, ease: "easeOut" } },
  { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 0.4, ease: "backOut" } },
];

// Multiple Image Transition Effects
const imageTransitionEffects = [
  // 1. Circular Reveal (Iris)
  {
    name: 'circular',
    initial: { clipPath: 'circle(0% at center)', scale: 1.2 },
    animate: { clipPath: 'circle(150% at center)', scale: 1 },
    exit: { clipPath: 'circle(0% at center)', scale: 1.2 },
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
  },
  // 2. Zoom In
  {
    name: 'zoomIn',
    initial: { scale: 0, opacity: 0, rotate: 10 },
    animate: { scale: 1, opacity: 1, rotate: 0 },
    exit: { scale: 1.3, opacity: 0, rotate: -10 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  // 3. Slide Fade
  {
    name: 'slideFade',
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  // 4. Flip Horizontal
  {
    name: 'flipX',
    initial: { rotateY: -90, opacity: 0 },
    animate: { rotateY: 0, opacity: 1 },
    exit: { rotateY: 90, opacity: 0 },
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  // 5. Flip Vertical
  {
    name: 'flipY',
    initial: { rotateX: 90, opacity: 0 },
    animate: { rotateX: 0, opacity: 1 },
    exit: { rotateX: -90, opacity: 0 },
    transition: { duration: 0.6, ease: "easeInOut" }
  },
  // 6. Blur Zoom
  {
    name: 'blurZoom',
    initial: { scale: 1.5, opacity: 0, filter: 'blur(20px)' },
    animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
    exit: { scale: 0.8, opacity: 0, filter: 'blur(20px)' },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  // 7. Diagonal Slide
  {
    name: 'diagonal',
    initial: { x: 100, y: 100, opacity: 0, scale: 0.8 },
    animate: { x: 0, y: 0, opacity: 1, scale: 1 },
    exit: { x: -100, y: -100, opacity: 0, scale: 0.8 },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  // 8. Bounce Scale
  {
    name: 'bounceScale',
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.6, type: "spring", bounce: 0.5 }
  },
  // 9. Wipe Left to Right
  {
    name: 'wipe',
    initial: { clipPath: 'inset(0 100% 0 0)' },
    animate: { clipPath: 'inset(0 0% 0 0)' },
    exit: { clipPath: 'inset(0 0 0 100%)' },
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  // 10. Rotate Zoom
  {
    name: 'rotateZoom',
    initial: { scale: 0, rotate: -180, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1 },
    exit: { scale: 0, rotate: 180, opacity: 0 },
    transition: { duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }
  }
];

const ShowCard = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [previewCourtName, setPreviewCourtName] = useState('');
  const styleInjected = useRef(false);
  const scrollPosition = useRef(0);

  useEffect(() => {
    if (!styleInjected.current) {
      const style = document.createElement('style');
      style.textContent = `
        @keyframes border-glow {
          0%, 100% { 
            opacity: 0.5;
            filter: brightness(1);
          }
          50% { 
            opacity: 0.8;
            filter: brightness(1.2);
          }
        }
        
        .animate-border-glow {
          animation: border-glow 3s ease-in-out infinite;
          will-change: opacity, filter;
        }

        .mobile-slider-container {
          touch-action: pan-y pinch-zoom;
          -webkit-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
        }

        .mobile-draggable-image {
          touch-action: none;
          -webkit-user-drag: none;
          -webkit-user-select: none;
          user-select: none;
        }
      `;
      document.head.appendChild(style);
      styleInjected.current = true;
    }
  }, []);

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await api.get('/courts');
      setCourts(response.data);
      
      const initialIndexes = {};
      response.data.forEach(court => {
        initialIndexes[court._id] = 0;
      });
      setActiveImageIndex(initialIndexes);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courts:', error);
      toast.error('Failed to load courts');
      setLoading(false);
    }
  };

  const openImagePreview = (imageUrl, courtName) => {
    scrollPosition.current = window.pageYOffset || document.documentElement.scrollTop;
    
    setPreviewImage(imageUrl);
    setPreviewCourtName(courtName);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition.current}px`;
    document.body.style.width = '100%';
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
    setPreviewCourtName('');
    
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, scrollPosition.current);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (previewImage && e.key === 'Escape') {
        closeImagePreview();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [previewImage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-20 w-20 border-4 border-t-yellow-500 border-r-yellow-400 border-b-transparent border-l-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <section className="py-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="max-w-md mx-auto md:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-4xl font-extrabold font-serif tracking-wide">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Premium
              </span>{" "}
              Events
            </h2>
            <p className="text-sm md:text-lg text-gray-300 italic mt-2">
              "Book Early & Secure Your Dream Event Today!"
            </p>
          </motion.div>

          {courts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg md:text-2xl">No events available</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {courts.map((court, index) => (
                <EventCard 
                  key={court._id} 
                  court={court} 
                  index={index} 
                  activeImageIndex={activeImageIndex} 
                  setActiveImageIndex={setActiveImageIndex}
                  openImagePreview={openImagePreview}
                  animationVariant={cardAnimations[index % cardAnimations.length]}
                  slideDuration={slideDurations[index % slideDurations.length]}
                  initialDelay={index * 500}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <ImagePreviewModal 
        imageUrl={previewImage}
        courtName={previewCourtName}
        onClose={closeImagePreview}
      />
    </>
  );
};

const ImagePreviewModal = ({ imageUrl, courtName, onClose }) => {
  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${courtName}-image.jpg`;
    link.click();
  };

  return (
    <AnimatePresence mode="wait">
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.button
            type="button"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-red-600/90 hover:bg-red-500 text-white p-2.5 sm:p-3 rounded-full shadow-2xl z-[10001]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaTimes size={16} className="sm:w-4 sm:h-4" />
          </motion.button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 z-[10001]"
          >
            <h3 className="text-sm sm:text-lg font-bold bg-black/50 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white">
              {courtName}
            </h3>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-[10001]"
          >
            <motion.button
              type="button"
              onClick={handleDownload}
              className="bg-blue-600/90 hover:bg-blue-500 text-white p-2.5 sm:p-3 rounded-full shadow-xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Download"
            >
              <FaDownload size={16} className="sm:w-4 sm:h-4" />
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imageUrl}
              alt={courtName}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl select-none"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Event Card - Bigger Size, Clean Transitions Only
const EventCard = ({ 
  court, 
  index, 
  activeImageIndex, 
  setActiveImageIndex, 
  openImagePreview, 
  animationVariant,
  slideDuration = 4000,
  initialDelay = 0
}) => {
  const [direction, setDirection] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progressKey, setProgressKey] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(0);
  const intervalRef = useRef(null);
  const isHovering = useRef(false);
  const hasStarted = useRef(false);

  const getEventType = (name) => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('birthday')) return 'birthday';
    if (nameLower.includes('wedding')) return 'wedding';
    if (nameLower.includes('anniversary')) return 'anniversary';
    if (nameLower.includes('baby') || nameLower.includes('shower')) return 'babyshower';
    if (nameLower.includes('corporate')) return 'corporate';
    if (nameLower.includes('engagement')) return 'engagement';
    return 'default';
  };

  const eventType = getEventType(court.name);
  const colors = eventColors[eventType];

  const paginate = (newDirection) => {
    if (!court.images || court.images.length <= 1) return;
    
    // Randomly select animation effect
    const randomEffect = Math.floor(Math.random() * imageTransitionEffects.length);
    setCurrentEffect(randomEffect);
    
    changeImage(newDirection);
  };

  const changeImage = (newDirection) => {
    const currentIndex = activeImageIndex[court._id] || 0;
    let newIndex;
    
    if (newDirection === 1) {
      newIndex = currentIndex === court.images.length - 1 ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex === 0 ? court.images.length - 1 : currentIndex - 1;
    }
    
    setDirection(newDirection);
    setActiveImageIndex(prev => ({
      ...prev,
      [court._id]: newIndex
    }));
    setProgressKey(prev => prev + 1);
  };

  useEffect(() => {
    if (!court.images || court.images.length <= 1 || !isAutoPlaying) {
      return;
    }

    const startTimeout = setTimeout(() => {
      hasStarted.current = true;
      
      intervalRef.current = setInterval(() => {
        if (!isHovering.current && !isDragging) {
          paginate(1);
        }
      }, slideDuration);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [court._id, activeImageIndex, isAutoPlaying, isDragging, slideDuration, initialDelay]);

  const handleDragStart = () => {
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = offset.x * velocity.x;
    const threshold = 200;

    if (swipe < -threshold || offset.x < -50) {
      paginate(1);
    } else if (swipe > threshold || offset.x > 50) {
      paginate(-1);
    }
    
    setTimeout(() => {
      setIsDragging(false);
      setIsAutoPlaying(true);
    }, 100);
  };

  const handleClick = (e) => {
    if (!isDragging && court.images && court.images.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      const currentIndex = activeImageIndex[court._id] || 0;
      openImagePreview(court.images[currentIndex], court.name);
    }
  };

  const toggleAutoPlay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAutoPlaying(!isAutoPlaying);
    setProgressKey(prev => prev + 1);
  };

  const handleMouseEnter = () => {
    isHovering.current = true;
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
  };

  const currentIndex = activeImageIndex[court._id] || 0;
  const durationInSeconds = slideDuration / 1000;
  const effect = imageTransitionEffects[currentEffect];

  return (
    <motion.div
      initial={animationVariant.initial}
      whileInView={animationVariant.animate}
      transition={{ ...animationVariant.transition, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative rounded-2xl overflow-hidden w-full max-w-lg mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colors.border} rounded-2xl animate-border-glow`}>
        <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-2xl relative overflow-hidden m-[2px]">
        </div>
      </div>

      <div className="relative bg-transparent rounded-2xl m-[2px]">
        <div 
          className="relative w-full cursor-pointer overflow-hidden mobile-slider-container"
          onClick={handleClick}
          style={{ aspectRatio: '16/10', minHeight: '320px' }}
        >
          {/* Progress Bar */}
          {court.images && court.images.length > 1 && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-30">
              <motion.div
                key={progressKey}
                className={`h-full bg-gradient-to-r ${colors.border}`}
                initial={{ width: '0%' }}
                animate={{ 
                  width: isAutoPlaying && !isHovering.current && hasStarted.current ? '100%' : '0%' 
                }}
                transition={{ 
                  duration: durationInSeconds,
                  ease: "linear",
                  repeat: 0
                }}
              />
            </div>
          )}

          {/* Image with Random Transition Effect */}
          {court.images && court.images.length > 0 && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={court._id + '-' + currentIndex}
                src={court.images[currentIndex]}
                alt={court.name}
                className="absolute inset-0 w-full h-full object-cover rounded-2xl mobile-draggable-image"
                initial={effect.initial}
                animate={effect.animate}
                exit={effect.exit}
                transition={effect.transition}
                drag="x"
                dragDirectionLock
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.3}
                dragMomentum={false}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?auto=format&fit=crop&w=1470&q=80";
                }}
                loading="lazy"
                decoding="async"
                style={{ 
                  perspective: '1200px',
                  transformStyle: 'preserve-3d'
                }}
              />
            </AnimatePresence>
          )}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 pointer-events-none">
            <h3
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent leading-tight mb-2"
              style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.9)' }}
            >
              {court.name}
            </h3>

            {court.description && (
              <p
                className="text-gray-200 text-sm sm:text-base leading-snug line-clamp-2 font-light mb-2"
                style={{ textShadow: '0 1px 8px rgba(0, 0, 0, 0.9)' }}
              >
                {court.description}
              </p>
            )}

            {court.amenities && court.amenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {court.amenities.slice(0, 3).map((amenity, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-yellow-500/30 text-yellow-300 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md border border-yellow-400/40"
                  >
                    {amenity}
                  </span>
                ))}
                {court.amenities.length > 3 && (
                  <span className="px-3 py-1 bg-gray-800/60 text-gray-300 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-md">
                    +{court.amenities.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Controls */}
          {court.images && court.images.length > 1 && (
            <>
              <motion.button
                type="button"
                onClick={toggleAutoPlay}
                className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white p-2.5 rounded-full z-30 pointer-events-auto"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={isAutoPlaying ? "Pause" : "Play"}
              >
                {isAutoPlaying ? <FaPause size={12} /> : <FaPlay size={12} />}
              </motion.button>

              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-bold z-20 pointer-events-none">
                {currentIndex + 1}/{court.images.length}
              </div>

              <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {court.images.map((_, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImageIndex(prev => ({
                        ...prev,
                        [court._id]: idx
                      }));
                      setProgressKey(prev => prev + 1);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? `bg-gradient-to-r ${colors.border} w-8 shadow-lg`
                        : 'bg-white/50 w-2'
                    }`}
                    style={{ 
                      touchAction: 'manipulation',
                      minWidth: idx === currentIndex ? '32px' : '8px',
                      minHeight: '8px'
                    }}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ShowCard;
