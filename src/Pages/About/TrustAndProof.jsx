import React, { useEffect, useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";

const TrustAndProof = () => {
  const stats = [
    { label: "खुश ग्राहक", value: "500+" },
    { label: "जन्मदिन की सजावट", value: "300+" },
    { label: "एक्सक्लूसिव इवेंट्स में अनोखी थीम्स", value: "50+" },
    { label: "क्रिएटिव डेकोर पैकेज", value: "45+" },
  ];

  const testimonials = [
  {
    name: "प्रिया शर्मा",
    role: "Bride",
    quote: "मेरी शादी को अविस्मरणीय बनाने के लिए Soni Blissful Events ने हर विवरण पर ध्यान दिया।",
    rating: 5,
  },
  {
    name: "अंजलि वर्मा",
    role: "Parent",
    quote: "मेरी बेटी का जन्मदिन जादुई था। हर कोई हैरान रह गया!",
    rating: 5,
  },
  {
    name: "रमेश और सुमन पटेल",
    role: "Couple",
    quote: "पूरे एनिवर्सरी इवेंट को खास बनाने के लिए टीम ने बहुत मेहनत की। बहुत बढ़िया!",
    rating: 5,
  },
  {
    name: "करण सिंह",
    role: "Guest",
    quote: "उन्होंने एक साधारण इवेंट को यादगार पल में बदल दिया।",
    rating: 5,
  },
  {
    name: "नेहा गुप्ता",
    role: "Organizer",
    quote: "Soni Blissful Events ने हमारी थीम को बिल्कुल वैसा ही सजाया जैसा हमने सोचा था।",
    rating: 5,
  },
  {
    name: "अमित वर्मा",
    role: "Parent",
    quote: "बच्चों की पार्टी के लिए डेकोरेशन और गेम्स शानदार थे। सब खुश थे!",
    rating: 5,
  },
  {
    name: "साक्षी राठी",
    role: "Bride",
    quote: "मेरे विवाह समारोह को Soni Blissful Events ने परी कथा जैसा बना दिया।",
    rating: 5,
  },
  {
    name: "राहुल चौहान",
    role: "Event Planner",
    quote: "टीम ने समय पर और पूरी निष्ठा से सभी तैयारियां कीं।",
    rating: 4,
  },
  {
    name: "पारुल जैन",
    role: "Parent",
    quote: "जन्मदिन पार्टी के लिए सजावट और केक ने सबको मोहित कर दिया।",
    rating: 5,
  },
  {
    name: "संदीप शर्मा",
    role: "Guest",
    quote: "Soni Blissful Events के प्रबंध ने अनुभव को बेहतरीन बना दिया।",
    rating: 4,
  },
  {
    name: "मोनिका पांडेय",
    role: "Bride",
    quote: "हर कोना और विवरण पूरी तरह से शानदार था।",
    rating: 5,
  },
  {
    name: "अर्जुन वर्मा",
    role: "Parent",
    quote: "बच्चों की एनिवर्सरी पार्टी का अनुभव अविस्मरणीय रहा।",
    rating: 5,
  },
  {
    name: "सोनिया सेन",
    role: "Organizer",
    quote: "सजावट और थीमिंग ने इवेंट को एकदम प्रोफेशनल बनाया।",
    rating: 5,
  },
  {
    name: "दीपक मिश्रा",
    role: "Guest",
    quote: "मंच और डेकोरेशन की क्वालिटी शानदार थी।",
    rating: 4,
  },
  {
    name: "प्रीति गुप्ता",
    role: "Bride",
    quote: "मेरे शादी समारोह को यादगार बनाने के लिए टीम ने कमाल किया।",
    rating: 5,
  },
  {
    name: "रवि पटेल",
    role: "Parent",
    quote: "बच्चों के उत्सव के हर पहलू में खुशी और उल्लास था।",
    rating: 5,
  },
  {
    name: "स्मृति सिंह",
    role: "Guest",
    quote: "सजावट और व्यवस्था ने इवेंट को एकदम खास बना दिया।",
    rating: 5,
  },
  {
    name: "निखिल अवस्थी",
    role: "Organizer",
    quote: "टीम की मेहनत और लगन ने इवेंट को उत्तम बनाया।",
    rating: 5,
  },
  {
    name: "रश्मि जैन",
    role: "Bride",
    quote: "हर पल जादुई था, और टीम ने इसे और भी खास बना दिया।",
    rating: 5,
  },
  {
    name: "विवेक त्यागी",
    role: "Parent",
    quote: "बच्चों के जन्मदिन की खुशी को टीम ने यादगार बना दिया।",
    rating: 5,
  }


  ];

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const testimonialContainerRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Auto-scroll testimonials
  useEffect(() => {
    const container = testimonialContainerRef.current;
    if (!container) return;

    let animationFrame;
    let speed = 0.5;
    let position = 0;

    const moveItems = () => {
      position -= speed;
      if (Math.abs(position) >= container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(moveItems);
    };

    animationFrame = requestAnimationFrame(moveItems);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" },
    }),
    hover: {
      scale: 1.05,
      boxShadow:
        "0 0 0 3px rgba(255,255,255,0.2), 0 0 20px rgba(234, 179, 8, 0.6), inset 0 0 30px rgba(0,0,0,0.5)",
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={ref}
      className="bg-black text-white  px-4 py-20 md:px-24 lg:space-y-20 overflow-hidden"
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
        {stats.map((item, i) => {
          const numericValue = parseInt(item.value.replace(/[^0-9]/g, ""), 10);
          const suffix = item.value.replace(/[0-9,]/g, "");

          return (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={statVariants}
              whileHover="hover"
              className="relative bg-yellow-500 text-black p-4 md:p-8 rounded-xl border-2 border-white cursor-default group"
            >
              <div className="absolute inset-0 rounded-xl border-2 border-black opacity-0 group-hover:opacity-100 group-hover:animate-pulse pointer-events-none transition-opacity duration-300" />
              <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] group-hover:shadow-[inset_0_0_30px_rgba(0,0,0,0.3)] transition-all duration-300 pointer-events-none" />

              <span className="block text-3xl md:text-5xl font-extrabold relative z-10">
                <CountUp end={numericValue} duration={2.5} separator="," />
                {suffix}
              </span>

              <p className="text-sm md:text-xl font-semibold mt-2 relative z-10">
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Testimonials */}
      <div className="space-y-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          transition={{ delay: 0.3 }}
          className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10 pb-2 border-b-4 border-yellow-500 inline-block"
        >
          What Our Members Say
        </motion.h3>

        <div className="relative overflow-x-hidden w-full">
          <div
            ref={testimonialContainerRef}
            className="flex gap-6 py-4 w-max"
            style={{ willChange: "transform" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                className="bg-black text-white p-4 md:p-6 rounded-xl shadow-md space-y-3 md:space-y-4 min-w-[80vw] sm:min-w-[60vw] md:min-w-[320px] max-w-[80vw] sm:max-w-[60vw] md:max-w-[320px] border-2 border-yellow-500 transition-all duration-300 cursor-default"
              >
                <div className="flex">
                  {[...Array(5)].map((_, starIdx) => (
                    <svg
                      key={starIdx}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        starIdx < t.rating ? "text-yellow-400" : "text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs md:text-base text-gray-300 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm md:text-base font-bold text-yellow-400">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndProof;
