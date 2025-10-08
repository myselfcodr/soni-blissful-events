import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import locations from '../../locations.json';

const Location = () => {
  const [activeCity, setActiveCity] = useState(locations[0].city);
  const [selectedLocation, setSelectedLocation] = useState(locations[0].locations[0]);

  const currentCityLocations =
    locations.find((city) => city.city === activeCity)?.locations || [];

  // Social media links
  const phoneNumber = "8319594037";
  const whatsappLink = `https://wa.me/91${phoneNumber}?text=Hi, I'm interested in your event decoration services`;
  const instagramLink = "https://instagram.com/soniblissfulevents"; // Update with actual handle

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Visit Us
          </h2>
          <p className="text-sm text-gray-600">
          Our Office Location
          </p>
        </div>

        {/* City Tabs - Clean Pills */}
        <div className="flex overflow-x-auto gap-2 pb-3 mb-6 scrollbar-hide">
          {locations.map((cityData) => (
            <button
              key={cityData.city}
              onClick={() => {
                setActiveCity(cityData.city);
                setSelectedLocation(cityData.locations[0]);
              }}
              className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-semibold
                transition-all whitespace-nowrap
                ${activeCity === cityData.city
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 active:bg-gray-200"
                }`}
            >
              {cityData.city}
            </button>
          ))}
        </div>

        {/* Location Cards - Mobile Stack */}
        <div className="space-y-4 mb-6">
          {currentCityLocations.map((location, index) => (
            <motion.div
              key={location.branch}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedLocation(location)}
              className={`p-4 rounded-2xl cursor-pointer transition-all
                ${selectedLocation?.branch === location.branch
                  ? "bg-gray-50 border-2 border-gray-900"
                  : "bg-white border-2 border-gray-100"
                }`}
            >
              {/* Branch Name */}
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {location.branch}
              </h3>
              
              {/* Address */}
              <p className="text-sm text-gray-600 mb-3">
                {location.address}
              </p>

              {/* Action Buttons Row */}
              <div className="flex gap-2">
                <a
                  href={location.map}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 px-4 py-2 bg-gray-900 text-white text-sm font-medium
                           rounded-xl flex items-center justify-center gap-2
                           active:bg-gray-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>Directions</span>
                </a>

                <a
                  href={`tel:${phoneNumber}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 bg-gray-100 text-gray-900 rounded-xl
                           active:bg-gray-200 transition-colors"
                  aria-label="Call us"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Location Map */}
        <AnimatePresence mode="wait">
          {selectedLocation && (
            <motion.div
              key={selectedLocation.branch}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-50 rounded-2xl overflow-hidden mb-6"
            >
              {/* Map Container */}
              <div className="relative w-full bg-gray-200" style={{ paddingTop: '75%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  scrolling="no"
                  src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                    selectedLocation.lng - 0.01
                  },${selectedLocation.lat - 0.01},${
                    selectedLocation.lng + 0.01
                  },${selectedLocation.lat + 0.01}&layer=mapnik&marker=${
                    selectedLocation.lat
                  },${selectedLocation.lng}`}
                  title={`Map of ${selectedLocation.branch}`}
                />
              </div>

              {/* Map Label */}
              <div className="p-4 text-center">
                <p className="text-sm font-medium text-gray-600">
                  📍 {selectedLocation.branch}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Section - Clean Cards */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
            Connect With Us
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-[#25D366] 
                       text-white rounded-2xl font-semibold
                       active:scale-95 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* Instagram */}
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r 
                       from-purple-500 via-pink-500 to-orange-500 text-white rounded-2xl 
                       font-semibold active:scale-95 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>Instagram</span>
            </a>

            {/* Phone Call */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center justify-center gap-3 p-4 bg-gray-900 
                       text-white rounded-2xl font-semibold
                       active:scale-95 transition-transform shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Now</span>
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Available in {locations.length} locations • Open Daily
          </p>
        </div>
      </div>

      {/* Scrollbar Hide Style */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Location;
