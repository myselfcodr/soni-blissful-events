// src/components/Home/ShowCard.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ShowCard = () => {
  const [courts, setCourts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});

  useEffect(() => {
    fetchCourts();
  }, []);

  const fetchCourts = async () => {
    try {
      const response = await api.get('/courts');
      setCourts(response.data);
      
      // Initialize active image index for each court
      const initialIndexes = {};
      response.data.forEach(court => {
        initialIndexes[court._id] = 0;
      });
      setActiveImageIndex(initialIndexes);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courts:', error);
      toast.error('Failed to load courts');
      setLoading(false);
    }
  };

  const handlePrevImage = (courtId, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [courtId]: prev[courtId] === 0 ? totalImages - 1 : prev[courtId] - 1
    }));
  };

  const handleNextImage = (courtId, totalImages) => {
    setActiveImageIndex(prev => ({
      ...prev,
      [courtId]: prev[courtId] === totalImages - 1 ? 0 : prev[courtId] + 1
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Premium Events
          </h2>
          <p className="text-gray-400 text-lg">
            Discover the perfect venue for your special moments
          </p>
        </motion.div>

        {courts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-xl">No courts available at the moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courts.map((court, index) => (
              <motion.div
                key={court._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-700 group"
              >
                {/* Image Carousel Section */}
                {court.images && court.images.length > 0 && (
                  <div className="relative h-64 overflow-hidden">
                    {/* Current Image Display */}
                    <img
                      src={court.images[activeImageIndex[court._id] || 0]}
                      alt={`${court.name} - Image ${(activeImageIndex[court._id] || 0) + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1543357480-c60d400e7ef6?auto=format&fit=crop&w=1470&q=80";
                      }}
                    />

                    {/* Image Counter */}
                    {court.images.length > 1 && (
                      <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {(activeImageIndex[court._id] || 0) + 1} / {court.images.length}
                      </div>
                    )}

                    {/* Navigation Arrows */}
                    {court.images.length > 1 && (
                      <>
                        <button
                          onClick={() => handlePrevImage(court._id, court.images.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <FaChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => handleNextImage(court._id, court.images.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100"
                        >
                          <FaChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Dots Indicator */}
                    {court.images.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {court.images.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setActiveImageIndex(prev => ({
                              ...prev,
                              [court._id]: idx
                            }))}
                            className={`w-2 h-2 rounded-full transition-all ${
                              idx === (activeImageIndex[court._id] || 0)
                                ? 'bg-yellow-500 w-6'
                                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                  </div>
                )}

                {/* Court Details */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2 hover:text-yellow-500 transition-colors">
                    {court.name}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 line-clamp-2 text-sm">
                    {court.description || "Premium event space with excellent facilities"}
                  </p>

                  {/* Amenities Tags */}
                  {court.amenities && court.amenities.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {court.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-yellow-500 bg-opacity-20 text-yellow-400 rounded-full text-xs font-semibold"
                        >
                          {amenity}
                        </span>
                      ))}
                      {court.amenities.length > 3 && (
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-semibold">
                          +{court.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button className="flex-1 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg transition-all transform hover:scale-105">
                      Book Now
                    </button>
                    <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all">
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowCard;
