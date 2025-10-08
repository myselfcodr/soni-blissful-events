import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const CourtBanner = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] w-full overflow-hidden">
      {/* Background Image */}
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/SignatureImg/CourtFrontImg.webp"
          alt="Premium event facilities in Raipur"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-4 sm:px-8 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-serif leading-tight">
            <span className="block text-white drop-shadow-2xl">
              Make Every Moment
            </span>
            <span className="block text-yellow-400 drop-shadow-2xl">
              Grand in Raipur
            </span>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 sm:mb-6 leading-relaxed max-w-xl"
          >
            Premium Event Facilities for Your Special Celebrations
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a
              href="#premium-courts"
              className="inline-block px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-3.5 bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 text-black text-sm sm:text-base md:text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 min-h-[44px]"
              aria-label="Book your event now"
            >
              Book Your Event
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourtBanner;
