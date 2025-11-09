import api from "./api";

export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
}