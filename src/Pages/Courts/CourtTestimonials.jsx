import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

const CourtTestimonials = () => {
  const testimonials = [ 
  {
    quote: "The wedding decor was absolutely stunning! Every detail was perfect.",
    author: "Rohit Sharma",
    role: "Bride's Family Member",
  },
  {
    quote: "Our corporate gala was flawless, thanks to their professional setup.",
    author: "Priya Mehta",
    role: "Event Manager",
  },
  {
    quote: "The birthday party exceeded our expectations. Kids loved every bit!",
    author: "Sanjay Kapoor",
    role: "Parent",
  },
  {
    quote: "The stage and lighting transformed our anniversary celebration beautifully.",
    author: "Neha Verma",
    role: "Celebrant",
  },
  {
    quote: "Spacious halls and impeccable service made our seminar a success.",
    author: "Vikram Singh",
    role: "Corporate Client",
  },
  {
    quote: "Perfect arrangement for our team-building events. Highly recommend!",
    author: "Anjali Rao",
    role: "HR Manager",
  },
  {
    quote: "The kids’ party corner was fun, safe, and engaging. Loved it!",
    author: "Karan Patel",
    role: "Parent",
  },
  {
    quote: "The catering services served top-quality food for all guests.",
    author: "Ritika Sharma",
    role: "Event Planner",
  },
  {
    quote: "Excellent value for money. Every event felt grand and seamless.",
    author: "Manish Gupta",
    role: "Client",
  },
  {
    quote: "Staff went above and beyond to make our wedding memorable.",
    author: "Sakshi Jain",
    role: "Bride",
  },
  {
    quote: "The lighting and decor created an amazing evening ambiance.",
    author: "Amit Desai",
    role: "Event Guest",
  },
  {
    quote: "Healthy and delicious food options were a huge hit among attendees.",
    author: "Shreya Nair",
    role: "Catering Coordinator",
  },
  {
    quote: "Our music event sounded incredible with their AV setup.",
    author: "Rohit Verma",
    role: "Organizer",
  },
  {
    quote: "The lounge areas and seating were comfortable for all guests.",
    author: "Meera Kapoor",
    role: "Guest",
  },
  {
    quote: "Flexible packages suited all our requirements perfectly.",
    author: "Pankaj Sharma",
    role: "Event Coordinator",
  },
  {
    quote: "Friendly staff and amazing ambience made our corporate event special.",
    author: "Divya Singh",
    role: "Manager",
  },
  {
    quote: "They handled last-minute changes smoothly. Very professional!",
    author: "Rohan Mehta",
    role: "Client",
  },
  {
    quote: "Affordable and transparent pricing made planning stress-free.",
    author: "Ananya Rao",
    role: "Organizer",
  },
  {
    quote: "Kids enjoyed the workshops and fun activities thoroughly.",
    author: "Aditya Gupta",
    role: "Parent",
  },
  {
    quote: "Professional coordination ensured our gala was executed flawlessly.",
    author: "Isha Sharma",
    role: "Event Planner",
  },


  ];

  const containerRef = useRef(null);
  const controls = useAnimation();
  const duration = 40; // seconds for one complete loop

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const contentWidth = container.firstChild.scrollWidth / 2; // Since we duplicate content

    const sequence = async () => {
      await controls.start({
        x: -contentWidth,
        transition: { duration: duration, ease: "linear" },
      });
      controls.set({ x: 0 });
      sequence();
    };

    sequence();
  }, [controls]);

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">
            <span className="text-yellow-500">Celebration </span> Stories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from those who've experienced our facilities firsthand
          </p>
          <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="relative py-8">
          <div ref={containerRef} className="overflow-hidden">
            <motion.div
              animate={controls}
              className="flex gap-8 w-max"
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Original testimonials */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`original-${index}`}
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-yellow-500 relative group hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-yellow-400/30 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 pointer-events-none"></div>

                  <div className="text-yellow-400 text-4xl mb-4 font-serif">
                    "
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Duplicated testimonials for seamless looping */}
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={`duplicate-${index}`}
                  className="bg-white p-8 rounded-xl shadow-lg w-80 flex-shrink-0 border border-gray-200 relative group hover:shadow-xl transition-all"
                  whileHover={{ y: -5 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-yellow-400/30 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all duration-300 pointer-events-none"></div>

                  <div className="text-yellow-400 text-4xl mb-4 font-serif">
                    "
                  </div>
                  <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                    {testimonial.quote}
                  </p>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="font-bold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Gradient fade effects */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className={`w-3 h-3 rounded-full ${
                dot === 1 ? "bg-yellow-500" : "bg-gray-300"
              }`}
              animate={{
                scale: dot === 1 ? [1, 1.2, 1] : 1,
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtTestimonials;
