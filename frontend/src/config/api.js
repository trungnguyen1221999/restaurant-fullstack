// API Configuration
const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://restaurant-fullstack-yt2f.onrender.com/api" // Your actual backend URL
    : "http://localhost:5000/api";

export { API_BASE_URL };
