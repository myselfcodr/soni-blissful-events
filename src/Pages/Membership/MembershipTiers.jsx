import { motion } from "framer-motion";

const MembershipTiers = () => {
  const tiers = [
    {
      name: "Bronze",
      price: "৳1",
      period: "/Person",
      features: [
        "Sperks access to basic benefits",
        "Your Next Celebration 10% Extra discount on events",
        "Next time priority booking",
       
      ],
      highlight: false,
    },
    {
      name: "Gold",
      price: "৳2",
      period: "/Person",
      features: [
        "All Basic benefits",
        "Your Next Celebration Extra 20% discount on events",
        "Next time priority booking",
      ],
      highlight: true,
    },
    {
      name: "Diamond",
      price: "৳3",
      period: "/Person",
      features: [
        "All Premium benefits",
        "Upto 30% discount on events",
        "VIP access to special events",
        "Next time priority booking",
        ],
      highlight: false,
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 font-serif">
            Referal <span className="text-yellow-500">Tiers</span>
          </h2>
          <div className="w-20 h-1 bg-yellow-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-xl overflow-hidden shadow-lg ${
                tier.highlight
                  ? "border-2 border-yellow-400"
                  : "border border-gray-200"
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-black px-4 py-1 text-sm font-bold">
                 After Booking you will get a discount
                </div>
              )}
              <div className="p-8 bg-white">
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-4xl font-bold mb-4">
                  {tier.price}
                  <span className="text-lg text-gray-500">{tier.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-yellow-500 mr-2 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium ${
                    tier.highlight
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : "bg-gray-900 hover:bg-black text-white"
                  }`}
                >
                  Refer Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipTiers;
