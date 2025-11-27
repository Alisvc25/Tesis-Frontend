import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const estudianteApi = {
    listarCalificaciones: async (id, token) => {
        const res = await axios.get(`${API_URL}/estudiante/calificaciones/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
};
