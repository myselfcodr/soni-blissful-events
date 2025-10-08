// import { motion } from "framer-motion";

// const WhyEliteArenaMobile = () => {
//   const valueProps = [
//     {
//       icon: (
//         <motion.svg
//           className="w-6 h-6 text-yellow-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           animate={{ y: [0, -5, 0, 5, 0], rotateY: [0, 15, -15, 15, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M13 10V3L4 14h7v7l9-11h-7z"
//           />
//         </motion.svg>
//       ),
//       title: "Premium Decorations",
//       description: "शानदार और यूनिक डेकोरेशन हर इवेंट के लिए।",
//       stats: "10+ Experts",
//     },
//     {
//       icon: (
//         <motion.svg
//           className="w-6 h-6 text-yellow-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           animate={{ y: [0, -5, 0, 5, 0], rotateY: [0, 15, -15, 15, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//           />
//         </motion.svg>
//       ),
//       title: "On-Time Service",
//       description: "हर बार समय पर और भरोसेमंद सेवा।",
//       stats: "500+ Events",
//     },
//     {
//       icon: (
//         <motion.svg
//           className="w-6 h-6 text-yellow-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//           animate={{ y: [0, -5, 0, 5, 0], rotateY: [0, 15, -15, 15, 0] }}
//           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="1.5"
//             d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
//           />
//         </motion.svg>
//       ),
//       title: "Luxury Packages",
//       description: "हर बजट के लिए लग्ज़री पैकेज।",
//       stats: "200+ Packages",
//     },
//   ];

//   return (
//     <section className="py-6 px-4 bg-black border-t border-gray-800 min-h-screen">
//       <div className="max-w-md mx-auto">
//         {/* Section Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           viewport={{ once: true }}
//           className="text-center mb-6"
//         >
//           <p className="text-yellow-400 mb-1 tracking-widest text-xs font-light">
//             WHY CHOOSE US
//           </p>
//           <h2 className="text-xl font-serif font-light mb-1">
//             The <span className="text-yellow-400 font-normal">Soni Blissful Events</span> Difference
//           </h2>
//           <div className="w-16 h-px bg-yellow-400 mx-auto"></div>
//         </motion.div>

//         {/* Value Props vertically stacked */}
//         <div className="space-y-6">
//           {valueProps.map((prop, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               viewport={{ once: true }}
//               whileHover={{
//                 scale: 1.05,
//                 rotateY: 5,
//                 boxShadow: "0 6px 15px rgba(255, 215, 0, 0.7)",
//               }}
//               style={{ transformStyle: "preserve-3d" }}
//               className="relative flex items-center bg-gray-900 rounded border border-gray-800 p-4 cursor-pointer"
//             >
//               <div className="mr-4">{prop.icon}</div>
//               <div>
//                 <h3 className="text-lg font-serif font-light">{prop.title}</h3>
//                 <p className="text-gray-400 text-xs mt-1 leading-tight">{prop.description}</p>
//                 <p className="text-yellow-400 text-xs font-semibold mt-1">{prop.stats}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Achievement Badges as 2cols */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           viewport={{ once: true }}
//           className="mt-8 grid grid-cols-2 gap-4"
//         >
//           {[
//             { number: "500+", label: "Happy Clients" },
//             { number: "200+", label: "Events" },
//             { number: "50+", label: "Premium" },
//             { number: "10+", label: "Monthly" },
//           ].map((item, index) => (
//             <motion.div
//               key={index}
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: index * 0.1, type: "spring", stiffness: 130 }}
//               className="text-center py-4 px-4 border border-gray-800 rounded hover:bg-gray-900/50 transition cursor-pointer"
//             >
//               <p className="text-xl font-serif text-yellow-400 mb-1">{item.number}</p>
//               <p className="text-gray-400 uppercase tracking-wide text-xs">{item.label}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default WhyEliteArenaMobile;
