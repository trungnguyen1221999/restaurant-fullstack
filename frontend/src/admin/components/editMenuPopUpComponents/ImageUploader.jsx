import React from "react";
import { X, Image } from "lucide-react";

const ImageUploader = ({
  originalImages,
  imageFiles,
  setOriginalImages,
  setImageFiles,
}) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index, isOriginal = false) => {
    if (isOriginal) {
      setOriginalImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImageFiles((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
        <Image className="w-4 h-4" /> Menu Images
      </label>

      {/* Original Images */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {originalImages.map((url, index) => (
          <div key={index} className="relative">
            <img
              src={url}
              alt={`Menu ${index}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index, true)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <X />
            </button>
          </div>
        ))}
      </div>

      {/* New Uploaded Images */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        {imageFiles.map((file, index) => (
          <div key={index} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`New ${index}`}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              <X />
            </button>
          </div>
        ))}
      </div>

      <label className="cursor-pointer inline-block mt-2">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          className="px-3 py-1 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition"
        >
          Upload Images
        </button>
      </label>
    </div>
  );
};

export default ImageUploader;
