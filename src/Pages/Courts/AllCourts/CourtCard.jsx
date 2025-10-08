import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const swipeConfidenceThreshold = 10000;

const CourtCard = ({ court }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerHeight, setContainerHeight] = useState("300px");
  const images =
    court.images && court.images.length > 0
      ? court.images
      : [court.image || "/ImgPlaceholder/image-coming-soon-placeholder.webp"];
  const intervalRef = useRef(null);

  useEffect(() => {
    const updateHeight = () => {
      const width = window.innerWidth;
      if (width < 640) setContainerHeight("220px");
      else if (width < 768) setContainerHeight("270px");
      else setContainerHeight("300px");
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [images.length]);

  const paginate = (direction) => {
    clearInterval(intervalRef.current);
    setCurrentIndex(prev => {
      const next = prev + direction;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm select-none"
      style={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.05)"
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${court.name} - Image ${currentIndex + 1}`}
          className="w-full h-[300px] object-cover rounded-t-2xl cursor-grab"
          draggable={false}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          dragSnapToOrigin
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = Math.abs(offset.x) * velocity.x;
            if (swipe < -swipeConfidenceThreshold) paginate(1);
            else if (swipe > swipeConfidenceThreshold) paginate(-1);
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          onError={(e) => (e.target.src = "/ImgPlaceholder/image-coming-soon-placeholder.webp")}
        />
      </AnimatePresence>

      <div className="p-6 text-gray-900">
        <h2 className="text-2xl font-semibold">{court.name}</h2>
        {court.description && (
          <p className="text-base mt-2 text-gray-700 line-clamp-3">{court.description}</p>
        )}

        {court.amenities && (
          <div className="mt-4 flex flex-wrap gap-2">
            {court.amenities.slice(0, 6).map((a, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-xs font-semibold shadow-sm"
                style={{ boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}
              >
                {a}
              </span>
            ))}
            {court.amenities.length > 6 && (
              <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                +{court.amenities.length - 6} more
              </span>
            )}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => alert(`Booking your event for ${court.name}`)}
          className="mt-6 w-full py-3 rounded-lg bg-yellow-400 text-yellow-900 font-semibold shadow-sm transition"
          style={{ boxShadow: "0 2px 5px rgba(255,193,7,0.5)" }}
        >
          Book Now
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CourtCard;
