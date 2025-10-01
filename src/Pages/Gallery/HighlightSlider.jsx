import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const highlights = [
  {
    caption: "Birthday Bash",
    year: "2021",
    description: "खुशियों से भरा एक यादगार जन्मदिन — सजावट हम पर छोड़ दीजिए।",
    stats: "Balloons, Cake & Magical Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Mini Birthday Setup",
    year: "2021",
    description: "छोटे पर खास जन्मदिन का अनुभव, हर पल को यादगार बनाने के लिए।",
    stats: "Sweet Surprises & Cherished Memories",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Wedding Celebration",
    year: "2022",
    description: "सपनों की शादी, जहाँ हर सजावट में प्यार झलकता है।",
    stats: "Decor, Music & Magical Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Corporate Party",
    year: "2022",
    description: "कंपनी के लिए स्टाइलिश और यादगार इवेंट्स।",
    stats: "Elegant Setup & Memorable Experiences",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Baby Shower",
    year: "2022",
    description: "नवजात स्वागत समारोह, हर पल को खास बनाने के लिए।",
    stats: "Decor, Sweet Surprises & Joyful Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Anniversary Celebration",
    year: "2023",
    description: "प्यार और यादों का जश्न, हर पल को संजोकर रखा गया।",
    stats: "Elegant Decor & Cherished Memories",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Surprise Party",
    year: "2023",
    description: "अचानक खुशियों से भरा पल, जिसे हमेशा याद रखा जाएगा।",
    stats: "Sweet Surprises & Magical Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Games Decor Event",
    year: "2023",
    description: "खेलों के लिए रंग-बिरंगी और आकर्षक सजावट।",
    stats: "Vibrant Setup & Fun Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Grand Stage Event",
    year: "2024",
    description: "विशेष अवसरों के लिए शानदार मंच और सजावट।",
    stats: "Stage Decor & Memorable Experiences",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Exclusive VIP Celebration",
    year: "2024",
    description: "VIP ग्राहकों के लिए प्रीमियम अनुभव और सजावट।",
    stats: "Luxury Setup & Cherished Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Festive Decor Showcase",
    year: "2024",
    description: "त्योहारों और विशेष मौकों के लिए शानदार सजावट।",
    stats: "Colorful Decor & Joyful Celebrations",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Seasonal Gala",
    year: "2025",
    description: "मौसमी जश्न और यादगार पल।",
    stats: "Elegant Setup & Magical Experiences",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Birthday Bonanza",
    year: "2025",
    description: "हर जन्मदिन को खास बनाने वाली सजावट और अनुभव।",
    stats: "Cake, Balloons & Cherished Memories",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Anniversary Gala",
    year: "2025",
    description: "विशेष वर्षगाँठ समारोह, प्यार और यादों से भरा।",
    stats: "Elegant Decor & Memorable Moments",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Exclusive Celebration Event",
    year: "2025",
    description: "खास मौकों के लिए प्रीमियम सजावट और अनुभव।",
    stats: "Luxury Setup & Magical Memories",
    location: "Raipur",
    src: "hi"
  },
  {
    caption: "Grand Surprise Party",
    year: "2025",
    description: "यादगार और रोमांचक पल, हर सजावट में खुशियाँ।",
    stats: "Sweet Surprises & Cherished Memories",
    location: "Raipur",
    src: "hi"
  }
];




const HighlightSlider = () => {
  const sliderRef = useRef(null);
  const [selectedHighlight, setSelectedHighlight] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Auto-scroll effect
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || highlights.length <= 3) return;

    let scrollAmount = 0;
    const speed = 0.5;
    let animationFrame;

    const animate = () => {
      scrollAmount += speed;
      if (scrollAmount >= slider.scrollWidth / 2) {
        scrollAmount = 0;
      }
      slider.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Drag to scroll functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="bg-gray-900 py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4 font-serif tracking-tight">
            वो खास पल जो हमारी पहचान बने।
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Memorable Moments
          </p>
        </motion.div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto no-scrollbar py-4 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              className="flex-shrink-0 w-80 md:w-96 relative group rounded-xl overflow-hidden"
              onClick={() => setSelectedHighlight(highlight)}
            >
              <img
                src={highlight.src}
                alt={highlight.caption}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 mb-2 text-xs font-semibold text-yellow-400 bg-black/50 rounded-full">
                    {highlight.year}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {highlight.caption}
                  </h3>
                  <p className="text-gray-300 text-sm mt-2 flex items-center">
                    View details <span className="ml-2 text-yellow-400">→</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedHighlight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedHighlight(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="h-[60vh]">
                  <img
                    src={selectedHighlight.src}
                    alt={selectedHighlight.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-400 bg-gray-800 rounded-full mb-4">
                      {selectedHighlight.year}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {selectedHighlight.caption}
                    </h3>
                  </div>

                  <div className="prose prose-invert text-gray-300 mb-6">
                    <p>{selectedHighlight.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                      <h4 className="text-sm text-gray-400 uppercase mb-2">
                        Key Stats
                      </h4>
                      <p className="text-yellow-400">
                        {selectedHighlight.stats}
                      </p>
                    </div>

                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center">
                      View Full Story
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 rounded-full p-2 text-white hover:text-yellow-400 transition-all"
                onClick={() => setSelectedHighlight(null)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default HighlightSlider;
