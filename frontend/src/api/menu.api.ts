import api from "./api";

export const getAllMenus = async () => {
  const response = await api.get("/menu");
  return response.data;
};

export const getMenuById = async (id: string) => {
  const response = await api.get(`/menu/${id}`);
  return response.data;
};

export const editMenuById = async (id: string, menuData: any) => {
  const response = await api.put(`/menu/${id}`, menuData);
  return response.data;
};

export const createNewMenu = async (menuData: any) => {
  const response = await api.post("/menu", menuData);
  return response.data;
};

export const deleteMenuById = async (id: string) => {
  const response = await api.delete(`/menu/${id}`);
  return response.data;
};
