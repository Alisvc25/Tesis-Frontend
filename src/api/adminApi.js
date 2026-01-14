import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const adminApi = {
    registrarAdmin: async (data) => {
        const res = await axios.post(`${API_URL}/administrador/registro`, data);
        return res.data;
    },

    recuperarPassword: async (email) => {
        const res = await axios.post(`${API_URL}/administrador/recuperarPassword`, { email });
        return res.data;
    },

    comprobarTokenPassword: async (token) => {
        const res = await axios.get(`${API_URL}/administrador/recuperarPassword/${token}`);
        return res.data;
    },

    nuevoPassword: async (token, data) => {
        const res = await axios.post(`${API_URL}/administrador/recuperarPassword/${token}`, data);
        return res.data;
    },

    registrarDocente: async (data, token) => {
        const res = await axios.post(`${API_URL}/administrador/registroDocente`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    listarDocente: async (token) => {
        const res = await axios.get(`${API_URL}/administrador/listarDocentes`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    visualizarDocente: async (id, token) => {
        const res = await axios.get(`${API_URL}/administrador/visualizarDocente/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    actualizarDocente: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/administrador/actualizarDocente/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    eliminarDocente: async (id, token) => {
        const res = await axios.delete(`${API_URL}/administrador/eliminarDocente/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    registrarEstudiante: async (data, token) => {
        const res = await axios.post(`${API_URL}/administrador/registroEstudiante`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    listarEstudiante: async (token) => {
        const res = await axios.get(`${API_URL}/administrador/listarEstudiantes`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    visualizarEstudiante: async (id, token) => {
        const res = await axios.get(`${API_URL}/administrador/visualizarEstudiante/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    actualizarEstudiante: async (id, data, token) => {
        const res = await axios.put(`${API_URL}/administrador/actualizarEstudiante/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

    eliminarEstudiante: async (id, token) => {
        const res = await axios.delete(`${API_URL}/administrador/eliminarEstudiante/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    },

};