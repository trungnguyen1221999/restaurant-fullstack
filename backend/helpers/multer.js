import multer from "multer";

// Configure multer storage (in-memory storage for simplicity)
const storage = multer.memoryStorage();
const upload = multer({ storage });
export default upload;