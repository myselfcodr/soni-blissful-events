import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EliteMomentsGallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch moments from public/moments.json
  useEffect(() => {
    fetch("/moments.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMoments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load gallery data", err);
        setError("Failed to load gallery. Please try again later.");
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(moments.map((moment) => moment.category)),
  ];

  const filteredMoments =
    activeCategory === "All"
      ? moments
      : moments.filter((moment) => moment.category === activeCategory);

  const getColSpan = (aspect) => {
    if (window.innerWidth < 640) return "col-span-2";
    return aspect === "horizontal" ? "col-span-2" : "col-span-1";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-600 to-gray-300 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-600 to-gray-300 flex items-center justify-center">
        <div className="text-red-400 text-xl">{error}</div>
      </div>
    );
  }

  const heartVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, y: [0, -20, -40], scale: [0, 1, 0.8] },
  };

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, y: [0, -15, -30], scale: [0, 1, 0.5] },
  };

  const cardWrapperStyle = {
    position: "relative",
    borderRadius: "1rem",
    padding: "2px",
    background: "linear-gradient(45deg, #facc15, #f59e0b, #b45309, #fbbf24)",
    boxShadow: "0 4px 15px rgba(251, 191, 36, 0.7), inset 0 0 6px rgba(255, 255, 255, 0.1)",
    perspective: "1000px",
  };

  const cardInnerStyle = {
    borderRadius: "0.75rem",
    overflow: "hidden",
    backgroundColor: "#1f2937",
    position: "relative",
    transformStyle: "preserve-3d",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow:
      "0 8px 10px rgba(0,0,0,0.4), inset 0 -4px 10px rgba(0,0,0,0.6)",
  };

  return (
    <section className="py-10 px-4 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif">
            Elite <span className="text-yellow-400">Moments</span> Gallery
          </h2>
          <p className="text-sm md:text-lg text-gray-300 max-w-xl mx-auto">
            Where every frame tells a story of joy, celebration, and unforgettable decorations
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-4 rounded-full shadow-lg"></div>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-yellow-400 text-black shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6">
          {filteredMoments.map((moment, index) => (
            <div key={index} style={cardWrapperStyle} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  rotateX: 8,
                  rotateY: 8,
                  boxShadow:
                    "0 20px 30px rgba(251, 191, 36, 0.9), inset 0 0 15px rgba(255, 255, 255, 0.2)",
                }}
                style={cardInnerStyle}
                className="shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(moment)}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-xl z-10`}
                ></div>

                {/* Hearts */}
                {[...Array(2)].map((_, idx) => (
                  <motion.span
                    key={idx}
                    className="absolute text-xl"
                    style={{ left: `${15 + idx * 35}%`, bottom: "5%" }}
                    variants={heartVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      duration: 1.2 + idx * 0.3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeOut",
                      delay: idx * 0.2,
                    }}
                  >
                    ❤️
                  </motion.span>
                ))}

                {/* Sparkles */}
                {[...Array(3)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{ left: `${20 + idx * 25}%`, bottom: `${10 + idx * 10}%` }}
                    variants={sparkleVariants}
                    initial="initial"
                    animate="animate"
                    transition={{
                      duration: 1 + idx * 0.3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeOut",
                      delay: idx * 0.1,
                    }}
                  />
                ))}

                {/* Event Image with inset shadow */}
                <img
                  src={moment.src}
                  alt={moment.caption}
                  className="w-full h-64 sm:h-72 md:h-72 object-cover"
                  style={{ boxShadow: "inset 0 0 25px rgba(0,0,0,0.7)" }}
                  loading="lazy"
                />

                {/* Event name top-left */}
                <h3 className="absolute top-0 left-0 z-30 font-semibold bg-yellow-400 px-2 py-1 rounded-br-md text-sm max-w-max border-2 border-yellow-500 shadow-lg">
                  {moment.caption}
                </h3>

                {/* Explore button bottom center with 3d shadow and hover */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0 0 8px rgba(251, 191, 36, 0.9)",
                      boxShadow: "0 0 10px 2px rgba(251, 191, 36, 0.8)",
                      rotateX: 5,
                    }}
                  >
                    <button
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black text-sm font-semibold rounded-full border-2 border-yellow-500 shadow-yellow-400/80 shadow-lg transition-all duration-300"
                    >
                      Explore
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-6xl w-full bg-white rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="grid md:grid-cols-2">
                <div className="h-[70vh]">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col">
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-yellow-400 bg-gray-100 rounded-full mb-4">
                      {selectedImage.category}
                    </span>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedImage.caption}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-4">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      {selectedImage.date}
                      <svg
                        className="w-4 h-4 mx-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      {selectedImage.location}
                    </div>
                  </div>

                  <div className="prose text-gray-700 mb-8">
                    <p>{selectedImage.description}</p>
                  </div>

                  <div className="mt-auto">
                    <div className="bg-gray-100 rounded-lg p-4 mb-6">
                      <h4 className="text-sm text-gray-500 uppercase mb-2">
                        Key Stats
                      </h4>
                      <p className="text-yellow-500">{selectedImage.stats}</p>
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
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full p-2 text-gray-800 hover:text-yellow-500 transition-all"
                onClick={() => setSelectedImage(null)}
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

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <button
            className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-base md:text-lg rounded-full shadow-md transition-all transform hover:scale-105"
          >
            View All Events Facilities
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default EliteMomentsGallery;
