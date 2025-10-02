import { motion } from "framer-motion";
import { Link } from "react-router";

const sports = [
  { name: "Birthdays", icon: "🎂", image: "https://i.postimg.cc/vZfWKKBG/photo-1579952363873-27f3bade9f55-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg", gradient: "from-green-500 to-green-700" },
  { name: "Weddings", icon: "💍", image: "https://i.postimg.cc/FKx0rJ3q/photo-1546519638-68e109498ffc-q-80-w-1190-auto-format-fit-crop-ixlib-rb-4-1.jpg", gradient: "from-orange-500 to-orange-700" },
  { name: "Anniversaries", icon: "🎉", image: "https://i.postimg.cc/nzcBCc1L/premium-photo-1666913667082-c1fecc45275d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg", gradient: "from-yellow-400 to-yellow-600" },
  { name: "Baby Showers", icon: "👶", image: "https://i.postimg.cc/90D9Y8K5/photo-1530549387789-4c1017266635-q-80-w-1170-auto-format-fit-crop-ixlib-rb-4-1.jpg", gradient: "from-blue-400 to-blue-600" },
  { name: "Corporate Events", icon: "🏢", image: "https://i.postimg.cc/N0QrzfSx/photo-1624897174291-1bd715e371d5-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg", gradient: "from-red-500 to-red-700" },
  { name: "Social Gatherings", icon: "🕺", image: "https://i.postimg.cc/8PrWFYLL/photo-1708312604109-16c0be9326cd-w-600-auto-format-fit-crop-ixlib-rb-4-1.jpg", gradient: "from-purple-500 to-purple-700" },
  { name: "Festivals & Cultural Events", icon: "🎊", image: "https://i.postimg.cc/Gpzswn1n/premium-photo-1666913667023-4bfd0f6cff0a-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg", gradient: "from-pink-500 to-pink-700" },
  { name: "Surprise Decorations", icon: "🎈", image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1", gradient: "from-indigo-500 to-indigo-700" },
  { name: "Games Dcorations", icon: "🏅", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5", gradient: "from-amber-500 to-amber-700" },
  { name: "Farewell Fiestas", icon: "🎓", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b", gradient: "from-rose-500 to-rose-700" },
];

const FeaturedSports = () => {
  return (
    <section className="py-10 px-3 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2 font-serif">
            Soni <span className="text-yellow-500">Blissful</span> Events
          </h2>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            Explore Our Premium Event Decoration Services
          </p>
          <div className="w-16 h-0.5 bg-yellow-500 mx-auto mt-2"></div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {sports.map((sport, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${sport.gradient} opacity-80 z-10`}
              ></div>

              {/* Event Image */}
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-28 object-cover transform group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-2 text-center text-white">
                <span className="text-2xl mb-1">{sport.icon}</span>
                <h3 className="text-xs font-semibold">{sport.name}</h3>
                <Link
                  to="/events#events"
                  className="mt-1 px-3 py-0.5 bg-white text-gray-900 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-6"
        >
          <Link
            to="/events"
            className="px-4 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold text-sm rounded-full shadow-sm transition-all transform hover:scale-105"
          >
            View All Events Facilities
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedSports;
