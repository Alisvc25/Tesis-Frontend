import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const docenteApi = {
    crearCalificacion: async (data, token) => {
        const res = await axios.post(`${API_URL}/docente/calificacion`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    listarCalificaciones: async (id, token) => {
        const res = await axios.get(`${API_URL}/docente/calificaciones/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    actualizarCalificacion: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/docente/calificacion/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    eliminarCalificacion: async (id, token) => {
        const res = await axios.delete(`${API_URL}/calificaciones/eliminar/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
};
