import { motion } from "framer-motion";

const WhyEliteArena = () => {
  const valueProps = [
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Premium Decorations",
      description: "शानदार और यूनिक डेकोरेशन हर इवेंट के लिए।",
      stats: "10+ Experts",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      title: "On-Time Service",
      description: "हर बार समय पर और भरोसेमंद सेवा।",
      stats: "500+ Events",
    },
    {
      icon: (
        <svg
          className="w-5 h-5 text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
      ),
      title: "Luxury Packages",
      description: "हर बजट के लिए लग्ज़री पैकेज।",
      stats: "200+ Packages",
    },
  ];

  return (
    <section className="py-10 px-4 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-yellow-400 mb-1 tracking-widest text-[10px] font-light">
            WHY CHOOSE US
          </p>
          <h2 className="text-xl font-serif font-light mb-1">
            The <span className="text-yellow-400 font-normal">Soni Blissful Events</span> Difference
          </h2>
          <div className="w-12 h-px bg-yellow-400 mx-auto"></div>
        </motion.div>

        {/* Value Proposition Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="h-full bg-gray-900 rounded border border-gray-800 group-hover:border-yellow-400 transition-all p-2 flex flex-col relative">
                {/* Icon */}
                <div className="mb-1">{prop.icon}</div>

                {/* Content */}
                <h3 className="text-xs font-serif font-light mb-1">
                  {prop.title}
                </h3>
                <p className="text-gray-400 mb-1 flex-grow text-[10px] leading-tight">
                  {prop.description}
                </p>
                <p className="text-yellow-400 text-[10px] font-medium">
                  {prop.stats}
                </p>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {[
            { number: "500+", label: "Happy Clients" },
            { number: "200+", label: "Events" },
            { number: "50+", label: "Premium" },
            { number: "10+", label: "Monthly" },
          ].map((item, index) => (
            <div
              key={index}
              className="text-center py-1 px-1 border border-gray-800 rounded hover:bg-gray-900/50 transition-all"
            >
              <p className="text-sm font-serif text-yellow-400 mb-0.5">
                {item.number}
              </p>
              <p className="text-gray-400 uppercase tracking-wide text-[9px]">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyEliteArena;
