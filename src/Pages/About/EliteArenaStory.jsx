import React from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const containerStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const EliteArenaStory = () => {
  return (
    <section className="bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white px-4 py-24 md:px-20 space-y-24">
      {/* Our Story */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-5xl mx-auto text-center"
      >
        <motion.h2
          variants={fadeUpVariant}
          className="text-4xl md:text-5xl font-bold mb-6 font-serif text-yellow-400 drop-shadow-sm"
        >
          हमारी कहानी
        </motion.h2>
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          2021 में शुरू होकर {" "}
          <span className="text-white font-semibold">Soni Blissful Events</span> रायपुर का प्रमुख
           इवेंट और डेकोरेशन विशेषज्ञ बन गया। एक साधारण आइडिया से शुरू हुआ सफर अब जन्मदिन, शादियाँ, एनिवर्सरी
            और खास पार्टियों को अविस्मरणीय बनाने तक पहुँच चुका है।
        </motion.p>
        <motion.p
          variants={fadeUpVariant}
          className="text-lg md:text-xl text-gray-400 mt-6"
        >
          हम मानते हैं कि इवेंट सिर्फ आयोजन नहीं, अनुभव होते हैं। हर समारोह विशेष, हर डेकोरेशन अद्वितीय,
          और हर मेहमान के लिए यादें अमिट होती हैं।
        </motion.p>
      </motion.div>

      {/* Why We Stand Out */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
      >
        <motion.img
          variants={fadeUpVariant}
          src="https://i.postimg.cc/pL55tjLX/Jason-Brunson-Athletes-Arena-Personal-Training7.jpg"
          alt="Soni Blissful Events Facility"
          className="rounded-xl shadow-2xl w-full h-auto object-cover"
        />
        <motion.div variants={fadeUpVariant}>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            हमारी सेवाएँ और सुविधाएँ
          </h3>
          <ul className="space-y-4 text-gray-300 text-lg list-disc list-inside">
            <li>🏟️ खूबसूरत वीन्यूज और थीम के अनुसार सजावट</li>
            <li>💡 क्रिएटिव लाइटिंग, प्रॉप्स और फूलों की व्यवस्था</li>
            <li>🎉 जन्मदिन, शादियाँ, बेबी शॉवर और अन्य खास अवसरों के लिए कस्टम सेटअप</li>
            <li>🎶 संगीत, माहौल और पूरी इवेंट कॉर्डिनेशन</li>
            <li>🤝 व्यक्तिगत सेवा, ताकि हर इवेंट तनाव मुक्त और परफेक्ट बने</li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Vision & Mission */}
      <motion.div
        variants={fadeUpVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="bg-gray-900/80 p-10 md:p-14 rounded-xl shadow-inner max-w-6xl mx-auto text-center space-y-6 border border-gray-800"
      >
        <h3 className="text-3xl md:text-4xl font-bold font-serif text-yellow-400">
          Our Vision & Mission
        </h3>
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl mx-auto">
          हमारा सपना है कि रायपुर में हर आयोजन अद्वितीय और खास हो।
          
        </p>
        <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto">
         हमारा मिशन है आपके विचारों को जादुई पल में बदलना, हर मेहमान को खुश करना, और स्मृतियों को हमेशा के लिए संजोना।
        </p>
      </motion.div>
    </section>
  );
};

export default EliteArenaStory;
