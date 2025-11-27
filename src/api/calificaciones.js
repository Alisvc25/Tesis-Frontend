import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const calificacionesApi = {
    crear: async (data, token) => {
        const res = await axios.post(`${API_URL}/calificaciones/crear`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    listar: async (token) => {
        const res = await axios.get(`${API_URL}/calificaciones/listar`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    obtener: async (id, token) => {
        const res = await axios.get(`${API_URL}/calificaciones/obtener/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    actualizar: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/calificaciones/actualizar/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    eliminar: async (id, token) => {
        const res = await axios.delete(`${API_URL}/calificaciones/eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
};
