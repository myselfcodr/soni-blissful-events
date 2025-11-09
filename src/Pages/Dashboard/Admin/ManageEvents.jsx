import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import api from '../../../api/axiosInstance';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    color: '#000000',
    icon: '',
    tagline: '',
    services: [''],
    price: ''
  });

  // Fetch events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/events');
      if (response.data.success) {
        setEvents(response.data.data || []);
      } else {
        throw new Error(response.data.message || 'Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to fetch events',
        text: error.response?.data?.message || error.message || 'Could not connect to the server',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle services changes
  const handleServiceChange = (index, value) => {
    const newServices = [...formData.services];
    newServices[index] = value;
    setFormData(prev => ({
      ...prev,
      services: newServices
    }));
  };

  // Add new service field
  const addServiceField = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, '']
    }));
  };

  // Remove service field
  const removeServiceField = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingEvent) {
        const response = await api.put(`/api/v1/events/${editingEvent._id}`, formData);
        if (response.data.success) {
          Swal.fire('Success', 'Event updated successfully', 'success');
        } else {
          throw new Error(response.data.message || 'Failed to update event');
        }
      } else {
        const response = await api.post('/api/v1/events', formData);
        if (response.data.success) {
          Swal.fire('Success', 'Event created successfully', 'success');
        } else {
          throw new Error(response.data.message || 'Failed to create event');
        }
      }
      
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      Swal.fire('Error', 'Failed to save event', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      image: event.image,
      color: event.color,
      icon: event.icon,
      tagline: event.tagline,
      services: event.services,
      price: event.price
    });
  };

  // Handle delete
  const handleDelete = async (eventId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await api.delete(`/api/v1/events/${eventId}`);
        if (response.data.success) {
          Swal.fire('Deleted!', 'Event has been deleted.', 'success');
          fetchEvents();
        } else {
          throw new Error(response.data.message || 'Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        Swal.fire({
          icon: 'error',
          title: 'Failed to delete event',
          text: error.response?.data?.message || error.message || 'Could not delete the event',
        });
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setEditingEvent(null);
    setFormData({
      name: '',
      image: '',
      color: '#000000',
      icon: '',
      tagline: '',
      services: [''],
      price: ''
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Events</h2>

      {/* Event Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6"> {/* form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md h-10"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icon (Emoji)
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tagline
            </label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>

        {/* Services */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Services
          </label>
          {formData.services.map((service, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={service}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md"
                required
              />
              <button
                type="button"
                onClick={() => removeServiceField(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addServiceField}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md"
          >
            Add Service
          </button>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 bg-blue-500 text-white rounded-md ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
            }`}
          >
            {loading ? 'Saving...' : editingEvent ? 'Update Event' : 'Add Event'}
          </button>
          {editingEvent && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Events List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <motion.div
            key={event._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{event.icon}</span>
              <h3 className="text-xl font-bold">{event.name}</h3>
            </div>
            <p className="text-gray-600 mb-2">{event.tagline}</p>
            <p className="text-lg font-bold mb-2" style={{ color: event.color }}>
              {event.price}
            </p>
            <div className="mb-4">
              <h4 className="font-bold mb-1">Services:</h4>
              <ul className="list-disc list-inside">
                {event.services.map((service, index) => (
                  <li key={index} className="text-gray-600">{service}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(event)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;