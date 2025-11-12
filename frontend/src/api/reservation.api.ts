import api from "./api";

export const getAllReservations = async () => {
  const response = await api.get("/reservations");
  return response.data;
};

export const getReservationById = async (id: string) => {
  const response = await api.get(`/reservations/${id}`);
  return response.data;
};

export const updateReservationById = async (id: string, data: any) => {
  const response = await api.put(`/reservations/${id}`, data);
  return response.data;
};

export const createReservation = async (data: any) => {
  const response = await api.post("/reservations", data);
  return response.data;
};

export const deleteReservationById = async (id: string) => {
  const response = await api.delete(`/reservations/${id}`);
  return response.data;
};
