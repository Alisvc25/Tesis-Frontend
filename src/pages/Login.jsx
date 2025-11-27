import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js"; // Para admin
import { docenteApi } from "../api/docenteApi.js"; // Para docente
import { estudianteApi } from "../api/estudianteApi.js"; // Para estudiante
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";
import axios from "axios";

export default function Login() {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await axios.post(`${API_URL}/login`, { email, password });

            const userData = res.data;
            setUser(userData);

            // Redirigir según rol
            if (userData.role === "admin") navigate("/admin");
            else if (userData.role === "docente") navigate("/docente");
            else if (userData.role === "estudiante") navigate("/estudiante");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Iniciar Sesión</h2>

                {error && <ErrorAlert message={error} />}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-900"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Iniciar Sesión"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        ¿Olvidaste tu contraseña? <a href="/recuperar-password" className="text-blue-900 hover:underline">Recuperar</a>
                    </p>

                    <p className="text-gray-600 text-sm">
                        ¿No tienes cuenta?{" "}
                        <a href="/registro" className="text-blue-900 hover:underline">
                            Registrarse
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
