import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useState, useRef } from "react";

const sports = [
  { 
    name: "Birthdays", 
    image: "/EventsImg/id 2.png",
    backImage: "/EventsImg/id2-back.png", // Optional different back image
    color: "#10b981",
    icon: "🎂",
    tagline: "Magical Celebrations",
    services: ["Theme Decor", "Balloon Art", "LED Lights", "Photo Booth"],
    price: "Starting ₹15,000"
  },
  { 
    name: "Weddings", 
    image: "/EventsImg/id1.jpg",
    backImage: "/EventsImg/id1-back.jpg",
    color: "#f43f5e",
    icon: "💍",
    tagline: "Dream Wedding Moments",
    services: ["Stage Setup", "Floral Decor", "Mandap Design", "Lighting"],
    price: "Starting ₹50,000"
  },
  { 
    name: "Anniversaries", 
    image: "https://i.postimg.cc/nzcBCc1L/premium-photo-1666913667082-c1fecc45275d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
    color: "#f59e0b",
    icon: "💝",
    tagline: "Romantic Celebrations",
    services: ["Candle Setup", "Flower Walls", "Table Decor", "Ambience"],
    price: "Starting ₹20,000"
  },
  { 
    name: "Baby Showers", 
    image: "https://i.postimg.cc/90D9Y8K5/photo-1530549387789-4c1017266635-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
    color: "#3b82f6",
    icon: "👶",
    tagline: "Welcome New Life",
    services: ["Cute Themes", "Balloon Arch", "Props", "Cake Table"],
    price: "Starting ₹18,000"
  },
  { 
    name: "Corporate Events", 
    image: "https://i.postimg.cc/N0QrzfSx/photo-1624897174291-1bd715e371d5-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
    color: "#8b5cf6",
    icon: "🏢",
    tagline: "Professional Excellence",
    services: ["Stage Design", "Branding", "Audio Visual", "Seating"],
    price: "Starting ₹35,000"
  },
];

// Floating Action Button with Radial Menu
const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "📞", label: "Call Us", action: "tel:8319594037", color: "#10b981" },
    { icon: "💬", label: "WhatsApp", action: "https://wa.me/8319594037", color: "#25D366" },
    // { icon: "📧", label: "Email", action: "soniblissfulevents@gmail.com", color: "#f59e0b" },
    // { icon: "📍", label: "Location", action: "/contact", color: "#3b82f6" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Radial Menu Items */}
      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => {
          const angle = (index * -160) / menuItems.length - 90;
          const radius = 80;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.a
              key={index}
              href={item.action}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                x, 
                y, 
                opacity: 1,
              }}
              exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-14 h-14 rounded-full shadow-2xl
                        flex items-center justify-center text-2xl
                        backdrop-blur-xl border-2 border-white/30"
              style={{ backgroundColor: item.color }}
              aria-label={item.label}
            >
              {item.icon}
            </motion.a>
          );
        })}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-16 h-16 rounded-full bg-yellow-500 hover:bg-yellow-600
                  shadow-2xl flex items-center justify-center text-3xl
                  border-4 border-white z-10"
        aria-label={isOpen ? "Close menu" : "Open quick actions"}
      >
        <span className="text-gray-900 font-bold">+</span>
      </motion.button>
    </div>
  );
};

// Flip Card Component
const FlipCard = ({ sport, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects - different speeds for depth
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className="w-full max-w-sm mx-auto mb-8"
    >
      <motion.div
        className="relative cursor-pointer"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        onClick={() => setIsFlipped(!isFlipped)}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            height: "500px",
          }}
        >
          {/* Front Side */}
          <motion.div
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="relative w-full h-full">
              {/* Image */}
              <img
                src={sport.image}
                alt={`${sport.name} decoration`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                {/* Top Badge */}
                <div className="flex items-center gap-3 self-start">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md 
                                flex items-center justify-center text-3xl border border-white/30">
                    {sport.icon}
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-5xl font-black mb-2 tracking-tight">
                      {sport.name}
                    </h3>
                    <p className="text-xl text-gray-200 font-light">
                      {sport.tagline}
                    </p>
                  </div>

                  {/* Tap to Flip Hint */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-2 
                              bg-white/20 backdrop-blur-md rounded-full border border-white/30"
                  >
                    <span className="text-sm font-semibold">Tap to see details</span>
                    <span className="text-lg">↻</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Back Side */}
          <motion.div
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "rotateY(180deg)",
            }}
            className="rounded-3xl overflow-hidden shadow-2xl bg-white"
          >
            <div className="w-full h-full p-8 flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-5xl">{sport.icon}</span>
                    <div>
                      <h4 className="text-2xl font-black text-gray-900">
                        {sport.name}
                      </h4>
                      <p className="text-sm text-gray-600">{sport.tagline}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              </div>

              {/* Services List */}
              <div className="flex-1 py-4">
                <h5 className="text-lg font-bold text-gray-900 mb-4">
                  Our Services Include:
                </h5>
                <div className="grid grid-cols-2 gap-3">
                  {sport.services.map((service, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 p-3 rounded-xl"
                      style={{ backgroundColor: `${sport.color}10` }}
                    >
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: sport.color }}
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {service}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="space-y-4">
                {/* Price */}
                <div 
                  className="p-4 rounded-2xl text-center"
                  style={{ backgroundColor: `${sport.color}20` }}
                >
                  <p className="text-sm text-gray-600 mb-1">Package Price</p>
                  <p className="text-2xl font-black" style={{ color: sport.color }}>
                    {sport.price}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  to="/events#events"
                  className="block w-full text-center px-6 py-4 
                            text-white text-base font-bold rounded-2xl
                            transition-all duration-200 shadow-lg
                            min-h-[56px] flex items-center justify-center gap-2"
                  style={{ backgroundColor: sport.color }}
                >
                  <span>Book Now</span>
                  <span className="text-xl">→</span>
                </Link>

                {/* Flip Back Hint */}
                <p className="text-center text-sm text-gray-500">
                  Tap to flip back
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedSportsDecorated = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // Parallax for header
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <>
      <section ref={containerRef} className="relative min-h-screen bg-gray-50 py-16 px-4 overflow-hidden">
        {/* Parallax Background Elements */}
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
          className="absolute top-20 left-10 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -500]) }}
          className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Parallax Header */}
          <motion.div
            style={{ y: headerY, opacity: headerOpacity }}
            className="text-center mb-16 sticky top-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight"
            >
              Soni <span className="text-yellow-500">Blissful</span> Events
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600 max-w-xl mx-auto"
            >
              Tap cards to discover our premium decoration services
            </motion.p>
          </motion.div>

          {/* Flip Cards with Parallax */}
          <div className="space-y-16">
            {sports.map((sport, index) => (
              <FlipCard key={index} sport={sport} index={index} />
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-3 px-10 py-5
                        bg-gray-900 hover:bg-gray-800 text-white
                        text-lg font-bold rounded-2xl shadow-xl
                        transition-all duration-300
                        min-h-[60px]"
            >
              <span>Explore All Events</span>
              <span className="text-2xl">✨</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Menu */}
      <FloatingActionMenu />
    </>
  );
};

export default FeaturedSportsDecorated;
