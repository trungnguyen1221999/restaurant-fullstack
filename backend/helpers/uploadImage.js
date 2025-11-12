import { v2 as cloudinary } from "cloudinary";

// ⚙️ Cấu hình Cloudinary (chỉ cần làm 1 lần trong project)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📤 Upload 1 ảnh (trả về { url, public_id })
const uploadSingleImage = (image) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "menu_images" }, // ảnh sẽ nằm trong thư mục menu_images
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id, // ⚠️ Lưu thêm public_id
          });
        }
      }
    );

    stream.end(image.buffer);
  });
};

// 📤 Upload nhiều ảnh
const uploadMultipleImages = async (images) => {
  const uploadPromises = images.map(uploadSingleImage);
  return Promise.all(uploadPromises);
};

// ❌ Xóa 1 ảnh theo public_id
const deleteImage = async (public_id) => {
  try {
    await cloudinary.uploader.destroy(public_id);
  } catch (error) {
    console.error("❌ Failed to delete image:", error);
  }
};

export { uploadSingleImage, uploadMultipleImages, deleteImage };
