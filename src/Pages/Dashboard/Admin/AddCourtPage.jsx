import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import api from "../../../api/axiosInstance";

const AddCourtPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImages, setPreviewImages] = useState([]); // multiple images

  // ✅ Multiple Image Upload Handler
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push(reader.result);

        if (newPreviews.length === files.length) {
          setPreviewImages((prev) => [...prev, ...newPreviews]); // Append mode
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Form Submit
  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const payload = {
        name: data.name,
        description: data.description || "",
        amenities: data.amenities || [],
        images: previewImages || [], // send as array
      };

      const response = await api.post("/courts", payload);

      if (response.status === 201) {
        toast.success("Court added successfully!");
        reset();
        setPreviewImages([]);
      } else {
        toast.error("Failed to add court. Please try again.");
      }
    } catch (error) {
      console.error("Add court error:", error);
      toast.error("Failed to add court. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen rounded-2xl bg-gray-900 py-8 px-4 sm:px-6 lg:px-12 xl:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-serif">
            Add New Court
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Fill in the details to add a Premium Events to Soni Blissful Events
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
            <h2 className="text-xl font-bold text-white">Events Information</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              {/* Court Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Event Name *
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: "Court name is required" })}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="e.g. Celebration Hall"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Event Images *
                </label>
                <div className="mt-1 flex flex-col gap-4">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600 flex items-center transition-colors text-white w-fit"
                  >
                    <FaUpload className="mr-2" />
                    <span>Upload Images</span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple // ✅ allow multiple
                      {...register("images", {
                        required: "At least one image is required",
                      })}
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {/* Preview Images Grid */}
                  {previewImages.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {previewImages.map((img, index) => (
                        <div
                          key={index}
                          className="relative h-24 w-full rounded-lg border border-gray-600 overflow-hidden"
                        >
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {errors.images && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.images.message}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Upload multiple high-quality images (JPEG, PNG)
                </p>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Describe the court features, surface type, lighting, etc."
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {[
                    "Lighting",
                    "Sound System",
                    "Parking Area",
                    "Seating Arrangements",
                    "Refreshments",
                  ].map((amenity) => (
                    <div key={amenity} className="flex items-center">
                      <input
                        id={`amenity-${amenity}`}
                        type="checkbox"
                        value={amenity}
                        {...register("amenities")}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-600 rounded bg-gray-700"
                      />
                      <label
                        htmlFor={`amenity-${amenity}`}
                        className="ml-2 text-sm text-gray-300"
                      >
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 flex justify-end">
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
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
                    Adding...
                  </>
                ) : (
                  "Add Court"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddCourtPage;
