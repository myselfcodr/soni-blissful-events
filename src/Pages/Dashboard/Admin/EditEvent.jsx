// src/pages/Admin/EditEvent.jsx
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUpload, FaPlus, FaTrash } from "react-icons/fa";
import api from "../../../api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage, setPreviewImage] = useState("");
  const [imageChanged, setImageChanged] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      tagline: "",
      icon: "",
      color: "#10b981",
      price: "",
      services: [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const colorValue = watch("color");

  // Fetch existing event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        const event = response.data;

        // Reset form with fetched data
        reset({
          name: event.name,
          tagline: event.tagline,
          icon: event.icon,
          color: event.color,
          price: event.price,
          services: event.services.map((s) => ({ value: s })),
        });

        setPreviewImage(event.image);
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch event error:", error);
        toast.error("Failed to load event data");
        navigate("/dashboard/events");
      }
    };

    fetchEvent();
  }, [id, navigate, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!previewImage) {
      toast.error("Please upload an event image");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name.trim(),
        tagline: data.tagline.trim(),
        icon: data.icon,
        color: data.color,
        price: data.price.trim(),
        services: data.services
          .map((s) => s.value.trim())
          .filter((s) => s !== ""),
        image: previewImage,
      };

      const response = await api.put(`/events/${id}`, payload);

      if (response.status === 200) {
        toast.success("Event updated successfully!");
        navigate("/dashboard/events");
      }
    } catch (error) {
      console.error("Update event error:", error);
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update event";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen rounded-2xl bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white text-xl">Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-2xl bg-gray-900 py-8 px-4 sm:px-6 lg:px-12 xl:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-serif">
            Edit Event Type
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Update event card for homepage display
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📝</span> Event Information
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Event name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters",
                      },
                    })}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="e.g. Weddings"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Tagline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Tagline *
                  </label>
                  <input
                    type="text"
                    {...register("tagline", {
                      required: "Tagline is required",
                      maxLength: {
                        value: 50,
                        message: "Tagline must be less than 50 characters",
                      },
                    })}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="e.g. Dream Wedding Moments"
                  />
                  {errors.tagline && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.tagline.message}
                    </p>
                  )}
                </div>

                {/* Icon/Emoji */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Icon/Emoji *
                  </label>
                  <input
                    type="text"
                    {...register("icon", { required: "Icon is required" })}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-3xl text-center transition-all"
                    placeholder="💍"
                    maxLength={2}
                  />
                  {errors.icon && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.icon.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-400 flex items-center gap-1">
                    <span>💡</span> Copy emoji from{" "}
                    <a
                      href="https://emojipedia.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      Emojipedia
                    </a>
                  </p>
                </div>

                {/* Theme Color */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Theme Color *
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      {...register("color", { required: "Color is required" })}
                      className="h-14 w-20 bg-gray-700 border-2 border-gray-600 rounded-lg cursor-pointer"
                    />
                    <div className="flex-1">
                      <input
                        type="text"
                        {...register("color")}
                        className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                                 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all font-mono"
                        placeholder="#10b981"
                      />
                    </div>
                    <div
                      className="w-14 h-14 rounded-lg border-2 border-gray-600"
                      style={{ backgroundColor: colorValue }}
                    ></div>
                  </div>
                  {errors.color && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.color.message}
                    </p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    {...register("price", {
                      required: "Price is required",
                    })}
                    className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                             focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="e.g. ₹50,000"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <span>⚠️</span> {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Services Array */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Services Offered *
                  </label>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {fields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-2"
                      >
                        <div className="flex-1">
                          <input
                            type="text"
                            {...register(`services.${index}.value`, {
                              required:
                                index === 0
                                  ? "At least one service is required"
                                  : false,
                            })}
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg 
                                     focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                            placeholder={`Service ${index + 1} (e.g. Stage Setup)`}
                          />
                        </div>
                        {fields.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg 
                                     transition-colors flex items-center gap-2"
                          >
                            <FaTrash />
                          </button>
                        )}
                      </motion.div>
                    ))}
                    {errors.services?.[0]?.value && (
                      <p className="text-sm text-red-400 flex items-center gap-1">
                        <span>⚠️</span> {errors.services[0].value.message}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => append({ value: "" })}
                    className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 
                             bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-semibold"
                  >
                    <FaPlus /> Add Another Service
                  </button>
                  <p className="mt-2 text-xs text-gray-400">
                    💡 Add all services included in this event package
                  </p>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Event Image *
                  </label>
                  <div className="space-y-4">
                    <label
                      htmlFor="event-image"
                      className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg 
                               border-2 border-dashed border-gray-600 hover:border-yellow-500 
                               flex items-center justify-center gap-2 transition-all text-white font-semibold"
                    >
                      <FaUpload />
                      <span>
                        {imageChanged ? "Change Image" : "Update Event Image"}
                      </span>
                      <input
                        id="event-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>

                    {previewImage && (
                      <div className="relative rounded-lg overflow-hidden border-2 border-gray-600">
                        <img
                          src={previewImage}
                          alt="Event preview"
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute top-3 right-3 flex gap-2">
                          <div
                            className="bg-black bg-opacity-70 backdrop-blur-sm text-white 
                                      px-3 py-1.5 rounded-full text-sm font-semibold border border-white/30"
                          >
                            {imageChanged ? "New Image" : "Current Image"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-gray-400">
                    📸 Recommended: 800x800px square images (JPEG, PNG, WebP) •
                    Max 5MB
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={() => navigate("/dashboard/events")}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold 
                         rounded-lg transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold 
                         rounded-lg shadow-lg transition-colors disabled:opacity-50 
                         disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Updating Event...</span>
                  </>
                ) : (
                  <>
                    <span>✅</span>
                    <span>Update Event</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </div>

        {/* Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>👁️</span> Live Preview
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            This is how your event card will appear on the homepage
          </p>
          <div className="max-w-xs mx-auto">
            <div
              className="w-full aspect-square"
              style={{ perspective: "1000px" }}
            >
              <div className="relative w-full h-full">
                <div className="absolute inset-0 rounded-lg overflow-hidden shadow-lg">
                  <div className="relative w-full h-full">
                    {previewImage && (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-between p-3 text-white">
                      <div
                        className="w-8 h-8 rounded bg-white/20 backdrop-blur-md 
                                  flex items-center justify-center text-lg border border-white/30"
                      >
                        {watch("icon") || "🎉"}
                      </div>
                      <div>
                        <h3 className="text-sm font-black mb-1 leading-none">
                          {watch("name") || "Event Name"}
                        </h3>
                        <p className="text-xs text-gray-200 mb-2 leading-none">
                          {watch("tagline") || "Event Tagline"}
                        </p>
                        <div className="bg-white/20 backdrop-blur-md rounded-full border border-white/30 px-2 py-1 w-fit">
                          <span className="text-xs">Tap to flip ↻</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #eab308;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ca8a04;
        }
      `}</style>
    </div>
  );
};

export default EditEvent;
