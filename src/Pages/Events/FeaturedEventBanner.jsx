import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import api from "../../api/axiosInstance";

const FeaturedEventBanner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const endpoints = ['/api/v1/events', '/events', '/events.json'];
      let loaded = false;

      for (const ep of endpoints) {
        setLastAttempt(ep);
        try {
          // use axios for API-like endpoints, fetch for static json
          let response;
          if (ep.endsWith('.json')) {
            // public file
            const res = await fetch(ep);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            setEvents(data);
            setLastResult({ endpoint: ep, ok: true, type: 'json', length: Array.isArray(data) ? data.length : null });
            loaded = true;
            break;
          } else {
            response = await api.get(ep);
          }

          // axios response handling
          if (response && response.data) {
            // common shapes: { success: true, data: [...] } or raw array
            if (Array.isArray(response.data)) {
              setEvents(response.data);
              setLastResult({ endpoint: ep, ok: true, type: 'array', length: response.data.length });
              loaded = true;
              break;
            }
            if (response.data.success && Array.isArray(response.data.data)) {
              setEvents(response.data.data);
              setLastResult({ endpoint: ep, ok: true, type: 'data', length: response.data.data.length });
              loaded = true;
              break;
            }
            // try if server returns { events: [...] }
            if (response.data.events && Array.isArray(response.data.events)) {
              setEvents(response.data.events);
              setLastResult({ endpoint: ep, ok: true, type: 'events', length: response.data.events.length });
              loaded = true;
              break;
            }
          }
        } catch (err) {
          // try next endpoint
          console.warn(`Failed to load from ${ep}:`, err.message || err);
          setLastResult({ endpoint: ep, ok: false, error: err.message || String(err) });
          continue;
        }
      }

      if (!loaded) {
        const msg = 'Unable to load events from server; showing defaults.';
        console.error(msg);
        Swal.fire({ icon: 'warning', title: 'Events unavailable', text: msg, timer: 2500, showConfirmButton: false });
        setEvents(defaultEvents);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  const defaultEvents = [
    { 
      name: "Birthdays", 
      image: "/EventsImg/id 2.png",
      color: "#10b981",
      icon: "🎂",
      tagline: "Magical Celebrations",
      services: ["Theme Decor", "Balloon Art", "LED Lights", "Photo Booth", "Backdrop Setup", "Party Props", "Cake Table", "Gift Corner"],
      price: "₹15,000"
    },
    { 
      name: "Weddings", 
      image: "/EventsImg/id1.jpg",
      color: "#f43f5e",
      icon: "💍",
      tagline: "Dream Wedding Moments",
      services: ["Stage Setup", "Floral Decor", "Mandap Design", "Lighting", "Entry Gate", "Seating Arrangements", "Canopy Setup", "Red Carpet"],
      price: "₹50,000"
    },
    { 
      name: "Anniversaries", 
      image: "https://i.postimg.cc/nzcBCc1L/premium-photo-1666913667082-c1fecc45275d-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
      color: "#f59e0b",
      icon: "💝",
      tagline: "Romantic Celebrations",
      services: ["Candle Setup", "Flower Walls", "Table Decor", "Ambience", "Romantic Lighting", "Photo Corner", "Flower Petals", "Music Setup"],
      price: "₹20,000"
    },
    { 
      name: "Baby Showers", 
      image: "https://i.postimg.cc/90D9Y8K5/photo-1530549387789-4c1017266635-q-80-w-1170-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
      color: "#3b82f6",
      icon: "👶",
      tagline: "Welcome New Life",
      services: ["Cute Themes", "Balloon Arch", "Props", "Cake Table", "Name Banner", "Mom-to-Be Chair", "Games Corner", "Welcome Board"],
      price: "₹18,000"
    },
    { 
      name: "Corporate Events", 
      image: "https://i.postimg.cc/N0QrzfSx/photo-1624897174291-1bd715e371d5-w-600-auto-format-fit-crop-q-60-ixlib-rb-4-1.jpg",
      color: "#8b5cf6",
      icon: "🏢",
      tagline: "Professional Excellence",
      services: ["Stage Design", "Branding", "Audio Visual", "Seating", "Registration Desk", "Standees", "LED Screens", "Podium Setup"],
      price: "₹35,000"
    },
  ];

  return (
    <>
      <section className="bg-gray-50 py-4 px-2">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-0.5">
              Soni <span className="text-yellow-500">Blissful</span> Events
            </h1>
            <p style={{ fontSize: '10px' }} className="text-gray-600">
              Premium decoration services • Tap cards for details
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {(events.length > 0 ? events : defaultEvents).map((event, index) => (
              <FlipCard key={event._id || index} sport={event} />
            ))}
          </div>

            {/* Debug panel (visible in dev or with ?debugEvents=1) */}
            {(import.meta.env && import.meta.env.DEV) || new URLSearchParams(window.location.search).get('debugEvents') ? (
              <div className="mt-4 p-3 text-xs bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
                <div><strong>Events debug</strong></div>
                <div>Last attempted endpoint: <code>{lastAttempt || '—'}</code></div>
                <div>Last result: <code>{lastResult ? JSON.stringify(lastResult) : '—'}</code></div>
              </div>
            ) : null}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-4"
          >
            <Link
              to="/events"
              className="inline-flex items-center gap-1 px-3 py-1.5
                        bg-gray-900 text-white font-bold rounded-lg shadow-lg
                        hover:bg-gray-800 transition-colors"
              style={{ fontSize: '10px' }}
            >
              <span>View All Events</span>
              <span>✨</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="fixed bottom-2 right-2 z-50 flex flex-col gap-2">
        <a
          href="tel:8319594037"
          className="w-10 h-10 rounded-full bg-green-500 shadow-lg
                    flex items-center justify-center text-lg border border-white
                    hover:scale-110 transition-transform"
          aria-label="Call"
        >
          📞
        </a>
        <a
          href="https://wa.me/918319594037"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full shadow-lg
                    flex items-center justify-center text-lg border border-white
                    hover:scale-110 transition-transform"
          style={{ backgroundColor: '#25D366' }}
          aria-label="WhatsApp"
        >
          💬
        </a>
      </div>
    </>
  );
};

const FlipCard = ({ sport }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const whatsappMessage = `Hello! I'm interested in booking ${sport.name} decoration. Starting price: ${sport.price}. Please share more details.`;
  const whatsappLink = `https://wa.me/918319594037?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="w-full aspect-square" style={{ perspective: "1000px" }}>
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative cursor-pointer w-full h-full"
        style={{
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s',
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute inset-0 rounded-lg overflow-hidden shadow-md"
        >
          <div className="relative w-full h-full">
            <img
              src={sport.image}
              alt={sport.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-between p-2 text-white">
              <div className="w-6 h-6 rounded bg-white/20 backdrop-blur-md 
                            flex items-center justify-center text-sm border border-white/30">
                {sport.icon}
              </div>

              <div>
                <h3 style={{ fontSize: '11px' }} className="font-black mb-0.5 leading-none">
                  {sport.name}
                </h3>
                <p style={{ fontSize: '9px' }} className="text-gray-200 mb-1 leading-none">
                  {sport.tagline}
                </p>
                
                <div className="bg-white/20 backdrop-blur-md rounded-full border border-white/30 px-1.5 py-0.5 w-fit">
                  <span style={{ fontSize: '8px' }}>Tap to flip ↻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-lg overflow-hidden shadow-md bg-white"
        >
          <div className="p-2 h-full flex flex-col">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1">
                <span className="text-sm">{sport.icon}</span>
                <h4 style={{ fontSize: '10px' }} className="font-black text-gray-900 leading-none">
                  {sport.name}
                </h4>
              </div>
            </div>

            <div className="h-px bg-gray-200 mb-1" />

            <div className="flex-1 overflow-auto mb-1">
              <h5 style={{ fontSize: '9px' }} className="font-bold text-gray-900 mb-0.5">
                Services:
              </h5>
              <div className="space-y-0.5">
                {sport.services.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-1">
                    <span 
                      className="w-0.5 h-0.5 rounded-full mt-1"
                      style={{ backgroundColor: sport.color }}
                    />
                    <span style={{ fontSize: '8px' }} className="text-gray-700">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div 
              className="p-1 rounded text-center mb-1"
              style={{ backgroundColor: `${sport.color}20` }}
            >
              <p style={{ fontSize: '8px' }} className="text-gray-600">Starting from</p>
              <p style={{ fontSize: '10px', color: sport.color }} className="font-black">
                {sport.price}
              </p>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-full py-1 rounded text-white font-bold text-center
                        flex items-center justify-center gap-1 shadow-md
                        hover:opacity-90 transition-opacity"
              style={{ 
                backgroundColor: sport.color,
                fontSize: '9px'
              }}
            >
              <span>📱</span>
              <span>Book Now</span>
            </a>

            <p style={{ fontSize: '8px' }} className="text-center text-gray-400 mt-1">
              Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedEventBanner;
