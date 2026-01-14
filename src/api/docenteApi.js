import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL + "/apiD";

export const docenteApi = {
    recuperarPassword: async (email) => {
        const res = await axios.post(`${API_URL}/docente/recuperarpassword`, { email });
        return res.data;
    },

    comprobarTokenPassword: async (token) => {
        const res = await axios.get(`${API_URL}/docente/recuperarpassword/${token}`);
        return res.data;
    },

    nuevoPassword: async (token, data) => {
        const res = await axios.post(`${API_URL}/docente/recuperarpassword/${token}`, data);
        return res.data;
    },

    crearCalificacion: async (data, token) => {
        const res = await axios.post(`${API_URL}/calificacion`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    listarCalificaciones: async (id, token) => {
        const res = await axios.get(`${API_URL}/calificaciones/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    actualizarCalificacion: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/calificacion/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    eliminarCalificacion: async (id, token) => {
        const res = await axios.delete(`${API_URL}/calificacion/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    obtenerPerfil: async (token) => {
        const res = await axios.get(`${API_URL}/perfil`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },
    

};
