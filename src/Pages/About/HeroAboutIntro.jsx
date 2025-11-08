import React from "react";
import { motion } from "framer-motion";

const HeroAboutIntro = () => {
  const sentence =
    "Soni Blissful Events में कदम रखें — जहाँ हर समारोह चमकता है, हर इवेंट यादगार बनता है,और हर पल पूर्ण सजावट के साथ खास होता है";

  return (
    <section className="relative w-full min-h-[280px] max-h-[85vh] h-[30vh] sm:h-[35vh] md:h-[40vh] pt-6 sm:pt-8 bg-[#1f1f23] overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <img
          src="https://i.ibb.co/XfzCKmyV/above-horizon-IFM5-DHr-Ilio-unsplash.jpg"
          alt="Soni Blissful Events"
          className="w-full h-full object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-gray-900/70 to-gray-800/60" />
      </motion.div>

      {/* Content - One Screen Fit */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center h-full px-3 sm:px-4 text-center text-white py-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Compact Heading */}
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold font-serif leading-tight mb-1.5 sm:mb-2 tracking-tight drop-shadow-md">
          सिर्फ समारोह नहीं। खुशियों की एक विरासत।
        </h1>

        {/* Tiny divider */}
        <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
          <div className="h-px w-3 sm:w-4 bg-yellow-400/30" />
          <svg 
            className="text-yellow-400" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24" 
            fill="currentColor"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <div className="h-px w-3 sm:w-4 bg-yellow-400/30" />
        </div>

        {/* Ultra compact paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm text-gray-300 max-w-[220px] sm:max-w-[280px] md:max-w-sm lg:max-w-md mx-auto leading-tight"
        >
          {sentence}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default HeroAboutIntro;
