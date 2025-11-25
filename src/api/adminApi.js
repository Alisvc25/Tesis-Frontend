import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

export default {
    registrarDocente: (data) => api.post("/api/registroDocente", data),
    registrarEstudiante: (data) => api.post("/api/registroEstudiante", data),
};
