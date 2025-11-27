import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const adminApi = {
    registrarDocente: async (data) => {
        const res = await axios.post(`${API_URL}/registroDocente`, data);
        return res.data;
    },
    registrarEstudiante: async (data) => {
        const res = await axios.post(`${API_URL}/registroEstudiante`, data);
        return res.data;
    },
    actualizarPassword: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/administrador/actualizarpassword/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
};
