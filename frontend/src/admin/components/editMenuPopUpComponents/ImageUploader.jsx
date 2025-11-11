import React, { useRef } from "react";
import { X, Image } from "lucide-react";

const ImageUploader = ({
  originalImages,
  imageFiles,
  setOriginalImages,
  setImageFiles,
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    // Reset input để có thể upload cùng file nhiều lần
    e.target.value = null;
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

      <div className="flex gap-3 mb-4 flex-wrap">
        {[...originalImages, ...imageFiles].map((item, index) => {
          // Kiểm tra xem item là original (string URL) hay mới upload (File object)
          const isOriginal = typeof item === "string";
          const src = isOriginal ? item : URL.createObjectURL(item);

          return (
            <div
              key={index}
              className="relative w-24 h-24 rounded-lg overflow-hidden"
            >
              <img
                src={src}
                alt={`Menu ${index}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  if (isOriginal) handleRemoveImage(index, true);
                  else handleRemoveImage(index - originalImages.length);
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center p-0 m-0 text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Upload Button */}
      <div>
        <input
          type="file"
          multiple
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          className="px-3 py-1 bg-gray-700 rounded-lg text-white hover:bg-gray-600 transition"
        >
          Upload Images
        </button>
      </div>
    </div>
  );
};

export default ImageUploader;
