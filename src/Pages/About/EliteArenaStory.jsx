import React from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const EliteArenaStory = () => {
  return (
    <section className="bg-black text-white px-2 py-4 sm:py-5 space-y-4 sm:space-y-5">
      
      {/* Our Story - Compact */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="text-sm sm:text-base md:text-lg font-bold mb-1 sm:mb-1.5 text-yellow-500 flex items-center justify-center gap-1"
        >
          <span>✨</span>
          <span>हमारी कहानी</span>
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="text-[9px] sm:text-[10px] md:text-xs text-gray-400 leading-snug"
        >
          2021 में शुरू होकर{" "}
          <span className="text-yellow-500 font-semibold">Soni Blissful Events</span> रायपुर का प्रमुख
          इवेंट और डेकोरेशन विशेषज्ञ बन गया। एक साधारण आइडिया से शुरू हुआ सफर अब जन्मदिन, शादियाँ, एनिवर्सरी
          और खास पार्टियों को अविस्मरणीय बनाने तक पहुँच चुका है।
        </motion.p>
        <motion.p
          variants={fadeUpVariant}
          className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-1 sm:mt-1.5"
        >
          हम मानते हैं कि इवेंट सिर्फ आयोजन नहीं, अनुभव होते हैं। हर समारोह विशेष, हर डेकोरेशन अद्वितीय,
          और हर मेहमान के लिए यादें अमिट होती हैं।
        </motion.p>
      </motion.div>

      {/* Services - Compact Grid */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-2 gap-2 sm:gap-3 items-center max-w-2xl mx-auto"
      >
        <motion.img
          variants={fadeUpVariant}
          src="/MomentsImg/id1.jpg"
          alt="Soni Blissful Events"
          className="rounded w-full h-[100px] sm:h-[120px] md:h-[140px] object-cover border border-yellow-500/20"
          loading="lazy"
        />
        <motion.div variants={fadeUpVariant}>
          <h3 className="text-xs sm:text-sm md:text-base font-bold text-yellow-500 mb-1 sm:mb-1.5 flex items-center gap-1">
            <span>🎯</span>
            <span>हमारी सेवाएँ</span>
          </h3>
          <ul className="space-y-0.5 sm:space-y-1 text-gray-400 text-[9px] sm:text-[10px] md:text-xs">
            <li className="flex items-start gap-1">
              <span className="text-yellow-500 text-[10px]">🏟️</span>
              <span>खूबसूरत वीन्यूज और थीम सजावट</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-yellow-500 text-[10px]">💡</span>
              <span>क्रिएटिव लाइटिंग और फूलों की व्यवस्था</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-yellow-500 text-[10px]">🎉</span>
              <span>जन्मदिन, शादी, बेबी शॉवर सेटअप</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-yellow-500 text-[10px]">🎶</span>
              <span>संगीत और इवेंट कॉर्डिनेशन</span>
            </li>
            <li className="flex items-start gap-1">
              <span className="text-yellow-500 text-[10px]">🤝</span>
              <span>व्यक्तिगत सेवा और तनाव मुक्त अनुभव</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Vision & Mission - Compact Card */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gradient-to-br from-gray-900 to-black p-2 sm:p-3 md:p-4 rounded border border-yellow-500/30 shadow-lg shadow-yellow-500/5 max-w-2xl mx-auto text-center space-y-1 sm:space-y-1.5"
      >
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-yellow-500 flex items-center justify-center gap-1">
          <span>🎯</span>
          <span>Vision & Mission</span>
        </h3>
        <p className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs max-w-md mx-auto">
          हमारा सपना है कि रायपुर में हर आयोजन अद्वितीय और खास हो।
        </p>
        <p className="text-gray-500 text-[8px] sm:text-[9px] md:text-[10px] max-w-xs mx-auto">
          हमारा मिशन है आपके विचारों को जादुई पल में बदलना, हर मेहमान को खुश करना, और स्मृतियों को हमेशा के लिए संजोना।
        </p>
      </motion.div>
    </section>
  );
};

export default EliteArenaStory;
