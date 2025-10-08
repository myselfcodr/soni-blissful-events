import { motion } from "framer-motion";



const events = [
  { title: "Birthday's Decorations", tag: "Trending", type: "birthday", image: "/EventsImg/id 2.png" },
  { title: "Wedding's Decorations", tag: "Most Booked", type: "wedding", image: "/EventsImg/id1.jpg" },
  { title: "Anniversaries Decorations", tag: "Hot Deal", type: "anniversary", image: "/EventsImg/id3.png" },
  { title: "Baby Shower Decorations", tag: "Popular", type: "babyshower", image: "/EventsImg/id4.png" },
  { title: "Corporate Event Decorations", tag: "Premium", type: "corporate", image: "/EventsImg/id5.png" },
  { title: "Engagement Decorations", tag: "Luxury", type: "engagement", image: "/EventsImg/id6.png" },
];


// Color themes
const eventColors = {
  birthday: {
    tag: "from-pink-400 to-yellow-400",
    border: "from-pink-400 to-yellow-400",
    text: "text-pink-400 hover:text-pink-200",
    heart: "text-pink-500",
  },
  wedding: {
    tag: "from-red-500 to-yellow-500",
    border: "from-red-500 to-yellow-500",
    text: "text-red-400 hover:text-red-200",
    heart: "text-red-500",
  },
  anniversary: {
    tag: "from-purple-500 to-blue-500",
    border: "from-purple-500 to-blue-500",
    text: "text-purple-400 hover:text-purple-200",
    heart: "text-purple-500",
  },
  babyshower: {
    tag: "from-blue-400 to-pink-400",
    border: "from-blue-400 to-pink-400",
    text: "text-blue-400 hover:text-blue-200",
    heart: "text-blue-500",
  },
  corporate: {
    tag: "from-gray-500 to-blue-600",
    border: "from-gray-500 to-blue-600",
    text: "text-gray-400 hover:text-gray-200",
    heart: "text-gray-500",
  },
  engagement: {
    tag: "from-rose-500 to-orange-500",
    border: "from-rose-500 to-orange-500",
    text: "text-rose-400 hover:text-rose-200",
    heart: "text-rose-500",
  },
};


const heartVariants = {
  initial: { opacity: 0, y: 0, scale: 0 },
  animate: { opacity: 1, y: -80, scale: 1 },
};


const UpcomingEvents = () => (
  <section className="py-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <div className="max-w-md mx-auto md:max-w-7xl">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-2xl md:text-4xl font-extrabold font-serif tracking-wide">
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Recent
          </span>{" "}
          Events
        </h2>
        <p className="text-sm md:text-lg text-gray-300 italic">
          "Book Early & Secure Your Dream Event Today!"
        </p>
      </motion.div>


      {/* Event Cards - 6 Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {events.map((event, i) => {
          const colors = eventColors[event.type] || eventColors.birthday;


          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-2xl overflow-hidden max-w-sm mx-auto cursor-pointer"
            >
              {/* Animated Gradient Border */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${colors.border} rounded-2xl p-[2px] animate-border-move`}
              >
                <div className="h-full w-full rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 shadow-md relative overflow-hidden">
                  {/* Flying Hearts */}
                  {[...Array(3)].map((_, idx) => (
                    <motion.span
                      key={idx}
                      className={`absolute bottom-3 text-2xl ${colors.heart}`}
                      style={{ left: `${20 + idx * 25}%` }}
                      variants={heartVariants}
                      initial="initial"
                      animate="animate"
                      transition={{
                        duration: 1.5 + idx * 0.3,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeOut",
                        delay: idx * 0.2,
                      }}
                    >
                      ❤️
                    </motion.span>
                  ))}
                </div>
              </div>


              {/* Card Content */}
              <div className="relative bg-transparent rounded-2xl">
                {/* Tag */}
                <div
                  className={`absolute top-3 right-3 bg-gradient-to-r ${colors.tag} text-white text-[11px] md:text-xs px-2 py-1 rounded-full shadow z-10`}
                >
                  {event.tag}
                </div>


                {/* Full Image */}
                <div className="relative w-full">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-auto object-cover rounded-t-2xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  />
                </div>


                {/* Content */}
                <div className="p-5 md:p-6 text-center">
                  {/* Event Title with Type Color */}
                  <motion.h3
                    className={`text-lg md:text-xl font-semibold ${colors.text}`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {event.title}
                  </motion.h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);


export default UpcomingEvents;
