import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const events = [
  { title: "Birthday's Decorations", tag: "Trending", type: "birthday", image: "/EventsImg/id 2.png" },
  { title: "Wedding's Decorations", tag: "Most Booked", type: "wedding", image: "/EventsImg/id1.jpg" },
  { title: "Anniversaries Decorations", tag: "Hot Deal", type: "anniversary", image: "/EventsImg/id3.png" },
  { title: "Baby Shower Decorations", tag: "Popular", type: "babyshower", image: "/EventsImg/id4.png" },
  { title: "Corporate Event Decorations", tag: "Premium", type: "corporate", image: "/EventsImg/id5.png" },
  { title: "Engagement Decorations", tag: "Luxury", type: "engagement", image: "/EventsImg/id6.png" },
];

const eventColors = {
  birthday: { tag: "from-pink-400 to-yellow-400", border: "from-pink-400 to-yellow-400", text: "text-pink-400 hover:text-pink-200", heart: "text-pink-500" },
  wedding: { tag: "from-red-500 to-yellow-500", border: "from-red-500 to-yellow-500", text: "text-red-400 hover:text-red-200", heart: "text-red-500" },
  anniversary: { tag: "from-purple-500 to-blue-500", border: "from-purple-500 to-blue-500", text: "text-purple-400 hover:text-purple-200", heart: "text-purple-500" },
  babyshower: { tag: "from-blue-400 to-pink-400", border: "from-blue-400 to-pink-400", text: "text-blue-400 hover:text-blue-200", heart: "text-blue-500" },
  corporate: { tag: "from-gray-500 to-blue-600", border: "from-gray-500 to-blue-600", text: "text-gray-400 hover:text-gray-200", heart: "text-gray-500" },
  engagement: { tag: "from-rose-500 to-orange-500", border: "from-rose-500 to-orange-500", text: "text-rose-400 hover:text-rose-200", heart: "text-rose-500" },
};

const heartVariants = {
  initial: { opacity: 0, y: 0, scale: 0 },
  animate: { opacity: 1, y: -80, scale: 1 },
};

const UpcomingEvents = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scrollSpeed = 1;

    const smoothScroll = () => {
      if (!isPaused && scrollContainer) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
        const maxScroll = scrollWidth - clientWidth;
        const halfScroll = maxScroll / 2;

        if (scrollLeft >= halfScroll) {
          scrollContainer.scrollLeft = scrollLeft - halfScroll;
        }

        scrollContainer.scrollLeft += scrollSpeed;
      }

      animationFrameId = requestAnimationFrame(smoothScroll);
    };

    animationFrameId = requestAnimationFrame(smoothScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isPaused]);

  const doubledEvents = [...events, ...events];

  return (
    <section className="py-6 px-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-full mx-auto md:max-w-7xl">
        <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} viewport={{ once: true }} className="text-center mb-6">
          <h2 className="text-lg md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Recent</span> Events
          </h2>
          <p className="text-xs md:text-base text-gray-300">"Book Early & Secure Your Dream Event Today!"</p>
        </motion.div>

        <div 
          ref={scrollRef} 
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)} 
          className="flex overflow-x-scroll gap-2 pb-2 sm:gap-3 md:gap-4" 
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-x'
          }}
        >
          {doubledEvents.map((event, i) => {
            const colors = eventColors[event.type] || eventColors.birthday;
            return (
              <div 
                key={i} 
                className="relative rounded-lg overflow-hidden min-w-[140px] max-w-[150px] flex-shrink-0 sm:min-w-[180px] sm:max-w-[200px]"
                style={{ 
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${colors.border} rounded-lg p-[1px]`}>
                  <div className="h-full w-full rounded-lg bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-md relative overflow-hidden">
                    <motion.span 
                      className={`absolute bottom-1 text-base ${colors.heart}`} 
                      style={{ left: "50%", transform: "translateX(-50%)" }} 
                      variants={heartVariants} 
                      initial="initial" 
                      animate="animate" 
                      transition={{ duration: 1, repeat: Infinity, repeatType: "loop", ease: "easeOut" }}
                    >
                      ❤️
                    </motion.span>
                  </div>
                </div>
                <div className="relative bg-transparent rounded-lg">
                  <div className={`absolute top-1 right-1 bg-gradient-to-r ${colors.tag} text-white text-[9px] px-1.5 py-0.5 rounded-full shadow z-10`}>
                    {event.tag}
                  </div>
                  <div className="relative w-full">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-20 sm:h-32 object-cover rounded-t-lg" 
                      loading="lazy"
                      draggable="false"
                    />
                  </div>
                  <div className="p-1 sm:p-3 text-center">
                    <h3 className={`text-[10px] sm:text-sm font-semibold ${colors.text}`}>
                      {event.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-2">
          <p className="text-[10px] text-gray-400">
            {isPaused ? "⏸️ Paused" : "▶️ Auto-scrolling"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
