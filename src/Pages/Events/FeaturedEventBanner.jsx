import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import api from "../../api/axiosInstance";

// API endpoints
const API_ENDPOINTS = {
  list: '/api/events',
  create: '/api/events',
  update: (id) => `/api/events/${id}`,
  delete: (id) => `/api/events/${id}`
};

// Default events to show if API fails
const defaultEvents = [
  { 
    name: "Birthdays", 
    image: "/EventsImg/id 2.png",
    color: "#10b981"
  }
];

const FeaturedEventBanner = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastAttempt, setLastAttempt] = useState(null);
  const [lastResult, setLastResult] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setLastAttempt(API_ENDPOINTS.list);

      try {
        const response = await api.get(API_ENDPOINTS.list);

        if (response?.data) {
          // Handle different response formats
          const eventsData = Array.isArray(response.data) ? response.data :
            response.data.success && Array.isArray(response.data.data) ? response.data.data :
            response.data.events && Array.isArray(response.data.events) ? response.data.events : null;

          if (eventsData) {
            setEvents(eventsData);
            setLastResult({
              endpoint: API_ENDPOINTS.list,
              ok: true,
              type: 'success',
              length: eventsData.length
            });
            return;
          }
        }
        throw new Error('Invalid response format');
      } catch (err) {
        console.error('Failed to fetch events:', err.message || err);
        setLastResult({
          endpoint: API_ENDPOINTS.list,
          ok: false,
          error: err.message || String(err)
        });

        const msg = 'Unable to load events from server; showing defaults.';
        console.error(msg);
        Swal.fire({
          icon: 'warning',
          title: 'Events unavailable',
          text: msg,
          timer: 2500,
          showConfirmButton: false
        });
        setEvents(defaultEvents);
      } finally {
        setLoading(false);
      }
    };

    // Call the fetch function once on mount
    fetchEvents();
  }, []);



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
