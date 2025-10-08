// src/pages/Admin/ManageBanners.jsx
import React, { useEffect, useState } from "react";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaArrowUp, FaArrowDown } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageBanners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const navigate = useNavigate();

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const res = await api.get("/banners");
      if (Array.isArray(res.data)) {
        setBanners(res.data);
        setError(null);
      } else {
        throw new Error("Invalid data received");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch banners");
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleEditClick = (banner) => {
    setEditingBannerId(banner._id);
    setEditFormData({
      title: banner.title || "",
      image: banner.image || "",
      link: banner.link || "",
      order: banner.order || 0,
    });
  };

  const handleCancelEdit = () => {
    setEditingBannerId(null);
    setEditFormData({});
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditFormData({
            ...editFormData,
            image: reader.result,
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to process image",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  const handleSaveEdit = async (id) => {
    try {
      const patchData = {
        ...editFormData,
        order: parseInt(editFormData.order) || 0,
      };

      await api.patch(`/banners/${id}`, patchData);

      Swal.fire({
        title: "Success!",
        text: "Banner updated successfully",
        icon: "success",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#fff",
      });

      setEditingBannerId(null);
      setEditFormData({});
      fetchBanners();
    } catch (err) {
      Swal.fire({
        title: "Error!",
        text: err.response?.data?.error || "Failed to update banner",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/banners/${id}`);

        await Swal.fire({
          title: "Deleted!",
          text: "Banner has been deleted.",
          icon: "success",
          confirmButtonColor: "#10b981",
          background: "#1f2937",
          color: "#fff",
        });

        fetchBanners();
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: err.response?.data?.error || "Failed to delete banner",
          icon: "error",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      }
    }
  };

  const moveSlide = async (index, direction) => {
    const newBanners = [...banners];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= banners.length) return;

    [newBanners[index], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[index]];
    
    try {
      await Promise.all(
        newBanners.map((banner, idx) =>
          api.patch(`/banners/${banner._id}`, { order: idx })
        )
      );
      fetchBanners();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to reorder banners",
        icon: "error",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#fff",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto rounded-2xl bg-gray-900 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Manage Banner Slides
          </h2>
          <p className="text-gray-300 mt-1">
            Add, edit, reorder and manage homepage banner slides
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/banners/add")}
          className="px-4 sm:px-5 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition flex items-center justify-center gap-2"
        >
          <FaPlus />
          Add New Banner
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-xl h-96" />
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && banners.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-700 rounded-xl">
          <h3 className="mt-4 text-lg font-medium text-white">
            No banner slides found
          </h3>
          <p className="mt-2 text-gray-400">
            Add your first banner slide for homepage carousel
          </p>
        </div>
      )}

      {!loading && !error && banners.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={banner._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-xl shadow-md border border-gray-700 overflow-hidden flex flex-col"
            >
              <div className="relative h-48 group overflow-hidden">
                <img
                  src={banner.image || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1470&q=80"}
                  alt={banner.title}
                  onError={(e) =>
                    (e.target.src = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1470&q=80")
                  }
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {index > 0 && (
                    <button
                      onClick={() => moveSlide(index, 'up')}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                      title="Move up"
                    >
                      <FaArrowUp />
                    </button>
                  )}
                  {index < banners.length - 1 && (
                    <button
                      onClick={() => moveSlide(index, 'down')}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg"
                      title="Move down"
                    >
                      <FaArrowDown />
                    </button>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white font-bold text-xl">
                  {banner.title}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow text-gray-200">
                {editingBannerId === banner._id ? (
                  <>
                    <div className="space-y-3 mb-4 flex-grow overflow-auto max-h-96">
                      <input
                        name="title"
                        value={editFormData.title}
                        onChange={handleInputChange}
                        className="border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 w-full"
                        placeholder="Banner Title"
                      />
                      <input
                        name="link"
                        value={editFormData.link}
                        onChange={handleInputChange}
                        className="border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 w-full"
                        placeholder="Link (e.g., /events/weddings)"
                      />
                      <input
                        name="order"
                        type="number"
                        value={editFormData.order}
                        onChange={handleInputChange}
                        className="border border-gray-600 bg-gray-700 text-white rounded px-3 py-2 w-full"
                        placeholder="Display Order"
                      />

                      <div>
                        <p className="mb-1 font-semibold text-gray-300">Banner Image:</p>
                        {editFormData.image && (
                          <img
                            src={editFormData.image}
                            alt="banner"
                            className="w-full h-32 object-cover rounded mb-2 border border-gray-600"
                          />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="mt-1 text-sm text-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-auto">
                      <button
                        onClick={() => handleSaveEdit(banner._id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition flex-1"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded transition flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-sm mb-2 text-gray-400">
                      Link: {banner.link || "No link"}
                    </p>
                    <p className="text-sm mb-4 text-gray-400">
                      Order: #{banner.order || index + 1}
                    </p>

                    <div className="flex space-x-3 mt-auto">
                      <button
                        onClick={() => handleEditClick(banner)}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition flex-1 flex items-center justify-center gap-2"
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition flex-1 flex items-center justify-center gap-2"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBanners;
