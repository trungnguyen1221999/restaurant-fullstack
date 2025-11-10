import api from "./api";

export const getAllCategories = async () => {
  const response = await api.get("/categories");
  return response.data;
}

export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
}

export const editCategory = async (id: string, name: string) => {
  const response = await api.put(`/categories/${id}`,  name );
  return response.data;
}

export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
}