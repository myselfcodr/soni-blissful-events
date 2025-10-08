// src/pages/Admin/AddBanner.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FaUpload } from "react-icons/fa";
import api from "../../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddBanner = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!previewImage) {
      toast.error("Please upload a banner image");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: data.title,
        link: data.link || "/events",
        order: parseInt(data.order) || 0,
        image: previewImage,
      };

      const response = await api.post("/banners", payload);

      if (response.status === 201) {
        toast.success("Banner added successfully!");
        reset();
        setPreviewImage("");
        navigate("/dashboard/banners");
      } else {
        toast.error("Failed to add banner. Please try again.");
      }
    } catch (error) {
      console.error("Add banner error:", error);
      if (error.response) {
        const backendMsg = error.response.data?.error || error.response.data?.details || error.message;
        toast.error(`Failed to add banner: ${backendMsg}`);
      } else {
        toast.error(`Failed to add banner: ${error.message}`);
      }
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
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white font-serif">
            Add New Banner Slide
          </h1>
          <p className="mt-2 text-lg text-gray-400">
            Create a new slide for homepage carousel
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6">
            <h2 className="text-xl font-bold text-white">Banner Information</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-4 sm:p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Banner Title *
                </label>
                <input
                  type="text"
                  {...register("title", { required: "Title is required" })}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="e.g. Weddings"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Link URL
                </label>
                <input
                  type="text"
                  {...register("link")}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="e.g. /events/weddings"
                  defaultValue="/events"
                />
                <p className="mt-1 text-xs text-gray-400">
                  Where users go when clicking "Book Now"
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  {...register("order")}
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="0"
                  defaultValue={0}
                />
                <p className="mt-1 text-xs text-gray-400">
                  Lower numbers appear first
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Banner Image * (Recommended: 1920x1080px)
                </label>
                <div className="mt-1 flex flex-col gap-4">
                  <label
                    htmlFor="banner-image"
                    className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600 flex items-center transition-colors text-white w-fit"
                  >
                    <FaUpload className="mr-2" />
                    <span>Upload Banner Image</span>
                    <input
                      id="banner-image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {previewImage && (
                    <div className="relative">
                      <img
                        src={previewImage}
                        alt="Banner preview"
                        className="w-full h-64 object-cover rounded-lg border border-gray-600"
                      />
                      <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                        Preview
                      </div>
                    </div>
                  )}
                </div>
                {!previewImage && (
                  <p className="mt-1 text-sm text-red-400">Image is required</p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  Upload high-quality landscape images (JPEG, PNG, WebP)
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate("/dashboard/banners")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={isSubmitting || !previewImage}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
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
                  "Add Banner"
                )}
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddBanner;
