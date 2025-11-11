import React, { useEffect, useState } from "react";
import { X, Clock, Utensils, Star, Leaf } from "lucide-react";

interface ProductDetailPopupProps {
  product: any;
  onClose: () => void;
}

const ProductDetailPopup: React.FC<ProductDetailPopupProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  // 🔹 Ngăn scroll khi popup mở
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // 🔹 Click ra ngoài để đóng popup
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  // State để quản lý ảnh đang được hiển thị
  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gradient-to-br from-back-800 to-back-900 border border-gray-700/50 rounded-2xl shadow-2xl max-w-5xl w-full mx-4 p-6 animate-in fade-in-50 overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-gray-700/70 hover:bg-red-500/80 transition-colors duration-200"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Main Content: Image + Info */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-20">
          {/* Image Gallery */}
          <div className="flex-col">
            <div className="relative flex-1">
              <div className="h-100 w-100">
                <img
                  src={selectedImage || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl mx-auto"
                />
              </div>
              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 text-white text-xs">
                <Clock className="w-4 h-4 text-primary" />
                <span>15–20 min</span>
              </div>
            </div>

            {/* Image Thumbnails */}
            <div className="flex justify-center mt-3">
              <div className="flex gap-3 mb-6 md:mb-0 flex-wrap ">
                {product.images?.map((image: string, index: number) => (
                  <button
                    key={index}
                    onMouseEnter={() => setSelectedImage(image)}
                    className={`w-24 h-24 ${
                      selectedImage === image
                        ? "border-2 border-primary p-0 opacity-100"
                        : ""
                    } rounded-md overflow-hidden p-0 opacity-80`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover bg-black"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <h2 className="text-3xl font-bold text-primary">{product.name}</h2>
            <p className="text-gray-300 leading-relaxed">
              {product.description || "Delicious meal made with love."}
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Utensils className="w-4 h-4 text-primary" />
                <span>{product.categoryName}</span>
              </div>
              <div className="flex items-center gap-2 text-yellow-400">
                <Star className="w-4 h-4" />
                <span>4.8 (120 reviews)</span>
              </div>
            </div>

            {/* Ingredients */}
            {Array.isArray(product.ingredients) &&
              product.ingredients.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                    Ingredients
                  </h3>
                  <ul className="space-y-2">
                    {product.ingredients.map((ing: string, index: number) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-gray-300 text-sm bg-white/5 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/10 transition"
                      >
                        <Leaf className="w-4 h-4 text-primary" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Price & Action */}
            <div className="flex justify-between items-center mt-8">
              <div className="text-3xl font-bold text-primary">
                €{product.price}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
