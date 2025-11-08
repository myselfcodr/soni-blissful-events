import React, { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

/**
 * TrustAndProof Component - Mobile-Optimized Animations
 * Lighter animations for better mobile performance
 */
const TrustAndProof = () => {
  const stats = [
    { label: "ग्राहक", value: "500+", emoji: "👥" },
    { label: "इवेंट", value: "300+", emoji: "🎉" },
    { label: "थीम", value: "50+", emoji: "✨" },
  ];

  const initialTestimonials = [
    { name: "प्रिया", quote: "शादी अविस्मरणीय!", rating: 5 },
    { name: "अंजलि", quote: "जन्मदिन जादुई!", rating: 5 },
    { name: "रमेश", quote: "बढ़िया सेवा!", rating: 5 },
    { name: "करण", quote: "यादगार अनुभव!", rating: 5 },
  ];

  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", quote: "", rating: 5 });
  const testimonialRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    const container = testimonialRef.current;
    if (!container) return;

    let frame, speed = 0.4, pos = 0;
    const move = () => {
      pos -= speed;
      if (Math.abs(pos) >= container.scrollWidth / 2) pos = 0;
      container.style.transform = `translateX(${pos}px)`;
      frame = requestAnimationFrame(move);
    };
    frame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(frame);
  }, [testimonials]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newT = { ...formData, isNew: true };
    setTestimonials(prev => [newT, ...prev]);
    setFormData({ name: "", quote: "", rating: 5 });
    setShowForm(false);
    setTimeout(() => setTestimonials(prev => prev.map(t => ({ ...t, isNew: false }))), 1000);
  };

  return (
    <div className="bg-black text-white px-2 py-2.5 space-y-2">
      
      {/* Stats - Simple Fade In */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1"
      >
        {stats.map((item, i) => {
          const num = parseInt(item.value.replace(/[^0-9]/g, ""), 10);
          const suffix = item.value.replace(/[0-9,]/g, "");
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: i * 0.08,
                duration: 0.3
              }}
              className="flex-shrink-0 flex items-center gap-1.5 bg-gradient-to-r from-amber-400/90 to-yellow-400/90 text-gray-900 px-2.5 py-1.5 rounded-full shadow-sm shadow-amber-500/10 active:scale-95 transition-transform"
            >
              <span className="text-sm opacity-80">{item.emoji}</span>
              <div className="flex items-baseline gap-0.5">
                <span className="text-sm font-bold">
                  <CountUp end={num} duration={1.5} separator="," />
                  {suffix}
                </span>
                <span className="text-[8px] font-semibold opacity-70">{item.label}</span>
              </div>
            </motion.div>
          );
        })}
        
        {/* Add Button - Simple Animation */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.24, duration: 0.3 }}
          whileTap={{ scale: 0.92 }}
          className="flex-shrink-0 relative bg-gradient-to-r from-amber-400/90 to-yellow-500/80 text-gray-900 font-bold px-3 py-1.5 rounded-full shadow-sm shadow-amber-500/15 flex items-center gap-1"
        >
          {/* Simple pulse - low CPU */}
          <motion.span 
            className="absolute -inset-0.5 bg-amber-400/20 rounded-full blur-sm"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          
          <span className="relative flex w-1.5 h-1.5">
            <motion.span 
              className="absolute w-full h-full bg-gray-900/30 rounded-full"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            <span className="relative w-1.5 h-1.5 bg-gray-900 rounded-full" />
          </span>
          
          <span className="relative text-[10px] font-extrabold">Add</span>
        </motion.button>
      </motion.div>

      {/* Form - Simple Slide */}
      {showForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          onSubmit={handleSubmit}
          className="bg-gradient-to-br from-gray-900/95 to-black border-2 border-amber-500/40 rounded-lg p-2 space-y-1.5 shadow-md shadow-amber-500/5 overflow-hidden"
        >
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
              <span>✨</span>
              <span>Quick Feedback</span>
            </span>
            <button 
              type="button" 
              onClick={() => setShowForm(false)}
              className="text-amber-400 hover:text-amber-300 text-xs font-bold active:scale-90 transition-transform"
            >
              ✕
            </button>
          </div>
          
          <div className="flex gap-1.5">
            <input
              type="text"
              name="name"
              placeholder="नाम"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
              className="flex-1 bg-gray-900/90 text-white text-[11px] px-2 py-1.5 rounded border border-amber-500/25 focus:border-amber-400/60 outline-none placeholder:text-gray-500 transition-colors"
            />
            <div className="flex gap-0.5 bg-gray-900/90 px-1 rounded border border-amber-500/25">
              {[1,2,3,4,5].map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setFormData({...formData, rating: s})}
                  className="text-sm active:scale-90 transition-transform"
                >
                  {s <= formData.rating ? "⭐" : "☆"}
                </button>
              ))}
            </div>
          </div>
          
          <input
            type="text"
            name="quote"
            placeholder="अनुभव साझा करें..."
            value={formData.quote}
            onChange={(e) => setFormData({...formData, quote: e.target.value})}
            required
            maxLength={50}
            className="w-full bg-gray-900/90 text-white text-[11px] px-2 py-1.5 rounded border border-amber-500/25 focus:border-amber-400/60 outline-none placeholder:text-gray-500 transition-colors"
          />
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-400/90 to-yellow-400/90 active:from-amber-400 active:to-yellow-400 text-gray-900 font-bold text-[11px] py-1.5 rounded shadow-sm shadow-amber-500/10 active:scale-98 transition-all"
          >
            ✓ Submit
          </button>
        </motion.form>
      )}

      {/* Testimonials - Minimal Animation */}
      <div>
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[9px] text-amber-400 font-bold flex items-center gap-1">
            <motion.span 
              className="w-1 h-1 bg-amber-400/80 rounded-full shadow-sm shadow-amber-500/40"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            Reviews ({testimonials.length})
          </span>
          <motion.span 
            animate={{ x: [0, 2, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="text-[9px] opacity-70"
          >
            ▶️
          </motion.span>
        </div>

        <div className="relative overflow-hidden rounded">
          <div ref={testimonialRef} className="flex gap-1.5" style={{ willChange: "transform" }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                initial={t.isNew ? { scale: 0, opacity: 0 } : {}}
                animate={t.isNew ? { scale: 1, opacity: 1 } : {}}
                transition={t.isNew ? { duration: 0.3 } : {}}
                className={`flex-shrink-0 bg-gradient-to-br from-gray-900/95 to-black border-2 rounded-lg p-1.5 w-[70vw] max-w-[200px] ${
                  t.isNew 
                    ? 'border-amber-500/60 shadow-md shadow-amber-500/15' 
                    : 'border-amber-500/25 shadow-sm shadow-amber-500/5'
                }`}
              >
                {t.isNew && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400/90 to-yellow-400/90 px-1.5 py-0.5 rounded-full mb-1 shadow-sm shadow-amber-500/15"
                  >
                    <span className="text-[7px] text-gray-900 font-extrabold">LIVE</span>
                    <motion.span 
                      className="w-1 h-1 bg-gray-900/70 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.div>
                )}
                
                <div className="flex gap-0.5 mb-1">
                  {[...Array(t.rating)].map((_, idx) => (
                    <span key={idx} className="text-amber-400 text-[9px]">★</span>
                  ))}
                </div>
                
                <p className="text-[9px] text-gray-400 mb-1 line-clamp-2 leading-tight">
                  "{t.quote}"
                </p>
                
                <p className="text-[8px] font-semibold text-amber-400 flex items-center gap-0.5 border-t border-amber-500/20 pt-1">
                  <span className="text-[8px] opacity-70">👤</span>
                  {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default TrustAndProof;
