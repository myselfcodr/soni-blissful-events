import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { useState } from "react";

const sports = [
  { 
    name: "Birthdays", 
    image: "/EventsImg/id 2.png",
    color: "#10b981",
    icon: "🎂",
    tagline: "Magical Celebrations",
    services: ["Theme Decor", "Balloon Art", "LED Lights", "Photo Booth", "Backdrop Setup", "Party Props", "Cake Table", "Gift Corner"],
    price: "₹15,000"
  },
  { 
    name: "Weddings", 
    image: "/EventsImg/id1.jpg",
    color: "#f43f5e",
    icon: "💍",
    tagline: "Dream Wedding Moments",
    services: ["Stage Setup", "Floral Decor", "Mandap Design", "Lighting", "Entry Gate", "Seating Arrangements", "Canopy Setup", "Red Carpet"],
    price: "₹50,000"
  },
  { 
    name: "Anniversaries", 
    image: "https://i.postimg.cc/nzcBCc1L/premium-photo-1666913667082-c1fecc45275d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
    color: "#f59e0b",
    icon: "💝",
    tagline: "Romantic Celebrations",
    services: ["Candle Setup", "Flower Walls", "Table Decor", "Ambience", "Romantic Lighting", "Photo Corner", "Flower Petals", "Music Setup"],
    price: "₹20,000"
  },
  { 
    name: "Baby Showers", 
    image: "https://i.postimg.cc/90D9Y8K5/photo-1530549387789-4c1017266635-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg",
    color: "#3b82f6",
    icon: "👶",
    tagline: "Welcome New Life",
    services: ["Cute Themes", "Balloon Arch", "Props", "Cake Table", "Name Banner", "Mom-to-Be Chair", "Games Corner", "Welcome Board"],
    price: "₹18,000"
  },
  { 
    name: "Corporate Events", 
    image: "https://i.postimg.cc/N0QrzfSx/photo-1624897174291-1bd715e371d5-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
    color: "#8b5cf6",
    icon: "🏢",
    tagline: "Professional Excellence",
    services: ["Stage Design", "Branding", "Audio Visual", "Seating", "Registration Desk", "Standees", "LED Screens", "Podium Setup"],
    price: "₹35,000"
  },
];

// Floating Action Menu
const FloatingActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: "📞", action: "tel:8319594037", color: "#10b981" },
    { icon: "💬", action: "https://wa.me/8319594037", color: "#25D366" },
  ];

  return (
    <div className="fixed bottom-2 right-2 z-50">
      <AnimatePresence>
        {isOpen && menuItems.map((item, index) => {
          const angle = (index * -90) - 90;
          const radius = 45;
          const x = Math.cos((angle * Math.PI) / 180) * radius;
          const y = Math.sin((angle * Math.PI) / 180) * radius;

          return (
            <motion.a
              key={index}
              href={item.action}
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{ scale: 1, x, y, opacity: 1 }}
              exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full shadow-lg
                        flex items-center justify-center text-sm backdrop-blur-xl border border-white/30"
              style={{ backgroundColor: item.color }}
              aria-label={item.icon}
            >
              {item.icon}
            </motion.a>
          );
        })}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        className="relative w-10 h-10 rounded-full bg-yellow-500 shadow-lg
                  flex items-center justify-center text-lg border border-white z-10"
        aria-label={isOpen ? "Close menu" : "Open quick actions"}
      >
        <span className="text-gray-900 font-bold">+</span>
      </motion.button>
    </div>
  );
};

// Expandable Card Component
const FlipCard = ({ sport, index, expandedCard, setExpandedCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isExpanded = expandedCard === index;

  const handleCardClick = () => {
    if (!isExpanded) {
      setExpandedCard(index);
      setIsFlipped(false);
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setExpandedCard(null);
    setIsFlipped(false);
  };

  const handleFlip = (e) => {
    if (isExpanded) {
      e.stopPropagation();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <>
      {/* Original Card Position */}
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 }}
        className="w-full aspect-square"
        style={{ visibility: isExpanded ? 'hidden' : 'visible' }}
      >
        <motion.div
          onClick={handleCardClick}
          className="relative cursor-pointer w-full h-full rounded-lg overflow-hidden shadow-md"
          whileTap={{ scale: 0.97 }}
        >
          <img
            src={sport.image}
            alt={sport.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-between p-2 text-white">
            <div className="w-6 h-6 rounded bg-white/20 backdrop-blur-md 
                          flex items-center justify-center text-sm border border-white/30">
              {sport.icon}
            </div>

            <div>
              <h3 style={{ fontSize: '11px' }} className="font-black mb-0.5 leading-none">
                {sport.name}
              </h3>
              <p style={{ fontSize: '9px' }} className="text-gray-200 mb-1 leading-none">
                {sport.tagline}
              </p>
              
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md 
                            rounded-full border border-white/30 px-1.5 py-0.5 w-fit">
                <span style={{ fontSize: '8px' }}>Click to expand</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Expanded Modal Card */}
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Expanded Card */}
            <motion.div
              layoutId={`card-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-24 z-[70] flex items-center justify-center"
            >
              <motion.div
                className="relative w-full h-full max-w-2xl max-h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={handleFlip}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front Side - Expanded */}
                  <div
                    style={{ backfaceVisibility: "hidden" }}
                    className="absolute inset-0"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={sport.image}
                        alt={sport.name}
                        className="w-full h-full object-cover"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md 
                                        flex items-center justify-center text-2xl border border-white/30">
                            {sport.icon}
                          </div>
                          
                          {/* Close Button */}
                          <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md 
                                      flex items-center justify-center border border-white/30
                                      hover:bg-white/30 transition-colors"
                          >
                            <span className="text-xl">✕</span>
                          </button>
                        </div>

                        <div>
                          <h3 className="text-4xl sm:text-5xl font-black mb-2 leading-tight">
                            {sport.name}
                          </h3>
                          <p className="text-lg sm:text-xl text-gray-200 mb-4 leading-tight">
                            {sport.tagline}
                          </p>
                          
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md 
                                        rounded-full border border-white/30 px-4 py-2 w-fit">
                            <span className="text-sm">Tap to see details</span>
                            <span className="text-base">↻</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Expanded */}
                  <div
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                    className="absolute inset-0 bg-white overflow-auto"
                  >
                    <div className="w-full h-full p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl">{sport.icon}</span>
                          <div>
                            <h4 className="text-2xl font-black text-gray-900 leading-tight">
                              {sport.name}
                            </h4>
                            <p className="text-sm text-gray-600 leading-tight">
                              {sport.tagline}
                            </p>
                          </div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                          onClick={handleClose}
                          className="w-10 h-10 rounded-full bg-gray-100 
                                    flex items-center justify-center
                                    hover:bg-gray-200 transition-colors flex-shrink-0"
                        >
                          <span className="text-xl">✕</span>
                        </button>
                      </div>

                      <div className="h-px bg-gray-200 mb-4" />

                      {/* Services Section */}
                      <div className="mb-4">
                        <h5 className="text-lg font-bold text-gray-900 mb-3">
                          Our Services:
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          {sport.services.map((service, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 p-3 rounded-lg"
                              style={{ backgroundColor: `${sport.color}10` }}
                            >
                              <span 
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: sport.color }}
                              />
                              <span className="text-sm text-gray-700 leading-tight">
                                {service}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price & CTA Section */}
                      <div className="space-y-3">
                        <div 
                          className="p-4 rounded-xl text-center"
                          style={{ backgroundColor: `${sport.color}20` }}
                        >
                          <p className="text-sm text-gray-600 mb-1">Starting from</p>
                          <p className="text-3xl font-black" style={{ color: sport.color }}>
                            {sport.price}
                          </p>
                        </div>

                        <Link
                          to="/events#events"
                          className="block w-full text-center px-6 py-4 
                                    text-white text-lg font-bold rounded-xl
                                    transition-all duration-200 shadow-lg"
                          style={{ backgroundColor: sport.color }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Now →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const FeaturedSportsDecorated = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  return (
    <>
      <section className="bg-gray-50 py-4 px-2 relative">
        <div className="max-w-6xl mx-auto">
          {/* Compact Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-0.5">
              Soni <span className="text-yellow-500">Blissful</span> Events
            </h1>
            <p style={{ fontSize: '10px' }} className="text-gray-600">
              Premium decoration services • Click to expand
            </p>
          </motion.div>

          {/* Ultra-Compact Square Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {sports.map((sport, index) => (
              <FlipCard 
                key={index} 
                sport={sport} 
                index={index}
                expandedCard={expandedCard}
                setExpandedCard={setExpandedCard}
              />
            ))}
          </div>

          {/* Compact Bottom CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-1 px-3 py-1.5
                        bg-gray-900 text-white font-bold rounded-lg shadow-lg"
              style={{ fontSize: '10px' }}
            >
              <span>View All Events</span>
              <span>✨</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <FloatingActionMenu />
    </>
  );
};

export default FeaturedSportsDecorated;
