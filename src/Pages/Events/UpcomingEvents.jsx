import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    title: "Birthday Banquet",
    date: "A Day to Remember",
    location: "Raipur, Chhattisgarh",
    description: "खुशियों से भरा एक जन्मदिन — गुब्बारे, केक और ढेर सारी यादें।",
    image: null,
    category: "Birthday Celebration",
  },
  {
    title: "Mini Birthday Setup",
    date: "A Magical Afternoon",
    location: "Raipur, Chhattisgarh",
    description: "छोटी सी जगह पर भी बड़ा जश्न — प्यारा सा डेकोर और ढेर सारी मुस्कानें।",
    image: null,
    category: "Birthday Celebration",
  },
  {
    title: "Wedding",
    date: "A Fairytale Evening",
    location: "Raipur, Chhattisgarh",
    description: "शादी के हर पल को खास बनाने वाली सजावट — सपनों जैसा माहौल।",
    image: null,
    category: "Wedding Special",
  },
  {
    title: "Corporate",
    date: "Elegant Celebration",
    location: "Raipur, Chhattisgarh",
    description: "ऑफिस की पार्टियों से लेकर मीटिंग्स तक — प्रोफेशनल डेकोर का सही चुनाव।",
    image: null,
    category: "Corporate Event",
  },
  {
    title: "Baby Shower",
    date: "A Day of Joy",
    location: "Raipur, Chhattisgarh",
    description: "नन्हे मेहमान के स्वागत से पहले — प्यार और उम्मीदों से सजी शाम।",
    image: null,
    category: "Baby Shower",
  },
  {
    title: "Baby Welcome",
    date: "A Heartwarming Morning",
    location: "Raipur, Chhattisgarh",
    description: "घर आया नन्हा मेहमान — रंग-बिरंगी सजावट और खुशियों का स्वागत।",
    image: null,
    category: "Baby Celebration",
  },
  {
    title: "Anniversary Moments",
    date: "A Romantic Evening",
    location: "Raipur, Chhattisgarh",
    description: "सालों का साथ, एक खास दिन — रोमांटिक सजावट और खूबसूरत यादें।",
    image: null,
    category: "Anniversary Celebration",
  },
  {
    title: "Surprise Decor",
    date: "A Magical Surprise",
    location: "Raipur, Chhattisgarh",
    description: "बिना बताए किया गया सरप्राइज — झिलमिल लाइट्स और ढेर सारी खुशियाँ।",
    image: null,
    category: "Exclusive Surprise",
  },
  {
    title: "Games Decor",
    date: "A Fun-filled Evening",
    location: "Raipur, Chhattisgarh",
    description: "फन गेम्स और पार्टी मूड के साथ सजी हुई रंगीन शाम।",
    image: null,
    category: "Theme Party",
  }
];



const UpcomingEvents = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 px-4 md:px-8 bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 mb-4 text-sm font-bold text-yellow-400 bg-yellow-400/10 rounded-full">
            EVENT CALENDAR
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white font-serif">
            Upcoming <span className="text-yellow-400">Celebrations</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-400 mx-auto mt-6"></div>
        </motion.div>

        {/* Events Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-yellow-400 transition-all"
            >
              {/* Image */}
              <div className="h-60 overflow-hidden relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 text-xs font-bold text-white bg-gray-900/80 rounded-full backdrop-blur-sm">
                  {event.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center text-yellow-400 text-sm mb-3">
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
                    />
                  </svg>
                  {event.date}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {event.title}
                </h3>

                <div className="flex items-center text-gray-400 text-sm mb-4">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {event.location}
                </div>

                <p className="text-gray-300 mb-5">{event.description}</p>

                <button className="w-full py-2.5 px-4 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-yellow-400 hover:text-black transition-all border border-gray-600">
                 Unwrap the Surprise
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
      </div>
    </motion.section>
  );
};

export default UpcomingEvents;
