import { motion } from "framer-motion";

const CourtFacilities = () => {
  const facilities = [
    {
      title: "Custom Theme Decor",
      description: "From superhero adventures to elegant milestone themes, tailored to your vision",
      icon: "🎉",
    },
    {
      title: "Balloon Arches & Styling",
      description: "Vibrant balloon arches and backdrops in any color or style.",
      icon: "🎈",
    },
    {
      title: "Special Effects",
      description: "Add magic with Cold Pyro, confetti showers, or fairy lights.",
      icon: "✨",
    },
    {
      title: "Themed Cake Tables",
      description: "Stunning cake and dessert displays to match your party theme.",
      icon: "🎂",
    },
    {
      title: "Entertainment & DJ",
      description: "Lively games and our 250W Party Speaker DJ setup for all ages..",
      icon: "🎶",
    },
    {
      title: "Photography & Videography",
      description: "Capture every smile with professional media services..",
      icon: "📸"  }
  ];

  return (
    <section className="py-20 px-4 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 font-serif">
            <span className="text-yellow-400">Events</span> Facilities
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Complete Solutions for Your Perfect Celebration
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{facility.icon}</div>
              <h3 className="text-xl font-bold mb-2">{facility.title}</h3>
              <p className="text-gray-300">{facility.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtFacilities;
