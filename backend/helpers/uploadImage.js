import { v2 as cloudinary } from "cloudinary";
const uploadSingleImage = (image) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "menu_images" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result.secure_url);
                }
            }
        );

        stream.end(image.buffer);
    });
};

const uploadMultipleImages = async (images) => {
    
    const uploadPromise = images.map(uploadSingleImage);
    return Promise.all(uploadPromise);
        
}
export { uploadSingleImage, uploadMultipleImages };