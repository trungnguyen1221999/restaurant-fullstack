import React, { useRef } from "react";
import { X, Image } from "lucide-react";

const ImageUploader = ({
  originalImages, // [{ url, public_id }]
  imageFiles,     // File[]
  setOriginalImages,
  setImageFiles,
  deletedImages,  // [public_id]
  setDeletedImages,
}) => {
  const inputRef = useRef(null);

  // Chọn ảnh mới
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles((prev) => [...prev, ...files]);
    e.target.value = null; // reset input
  };

  // Xóa ảnh
  const handleRemoveImage = (index, isOriginal = false) => {
    if (isOriginal) {
      const removed = originalImages[index];
      if (removed.public_id) {
        setDeletedImages((prev) => [...prev, removed.public_id]);
      }
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
        {[...originalImages, ...imageFiles].map((item, i) => {
          const isOriginal = item.url !== undefined;
          const src = isOriginal ? item.url : URL.createObjectURL(item);

          return (
            <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img src={src} alt={`Menu ${i}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemoveImage(isOriginal ? i : i - originalImages.length, isOriginal)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center p-0 m-0 text-xs"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <input
          type="file"
          multiple
          accept="image/*"
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
