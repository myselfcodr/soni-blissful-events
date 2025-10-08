// src/components/ImageUploader.jsx (Reusable Component)

import { useState } from "react";
import { storage } from "../config/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = ({ onUploadComplete, folderName = "images" }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const uploadImages = async () => {
    if (selectedFiles.length === 0) {
      alert("कृपया images select करें!");
      return;
    }

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const storageRef = ref(storage, `${folderName}/${Date.now()}-${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const percent = Math.round(
                ((i + snapshot.bytesTransferred / snapshot.totalBytes) / selectedFiles.length) * 100
              );
              setProgress(percent);
            },
            reject,
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              uploadedUrls.push(url);
              resolve();
            }
          );
        });
      }

      // Call parent callback with URLs
      onUploadComplete(uploadedUrls);
      
      setSelectedFiles([]);
      setProgress(0);
      alert("Images uploaded successfully! ✅");

    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-lg p-6">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="mb-4 w-full"
      />

      {selectedFiles.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">
          {selectedFiles.length} files selected
        </p>
      )}

      {uploading && (
        <div className="mb-4">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-yellow-400 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-center mt-1">{progress}%</p>
        </div>
      )}

      <button
        onClick={uploadImages}
        disabled={uploading || selectedFiles.length === 0}
        className="w-full py-3 bg-yellow-400 text-black font-bold rounded-lg disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Images"}
      </button>
    </div>
  );
};

export default ImageUploader;
