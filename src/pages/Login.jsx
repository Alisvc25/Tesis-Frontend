import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role") || null; // 'administrador' | 'docente' | 'estudiante'

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
            // Elegir endpoint según el role seleccionado (o por defecto administrador)
            let endpoint = "/administrador/login";
            if (roleParam === "docente") endpoint = "/apiD/login";
            else if (roleParam === "estudiante") endpoint = "/apiE/login";

            const res = await axios.post(`${API_URL}${endpoint}`, { email, password });

            const userData = res.data;
            // Guardar usuario y token en contexto
            login(userData, res.data.token);

            // Redirigir según rol que devuelve el backend (campo 'rol')
            const rolBackend = userData.rol || userData.role || null;
            if (rolBackend === "administrador") navigate("/admin");
            else if (rolBackend === "docente") navigate("/docente");
            else if (rolBackend === "estudiante") navigate("/estudiante");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Iniciar Sesión
                </h2>

                {error && <ErrorAlert message={error} />}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Iniciar Sesión"}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    {roleParam === "administrador" && (
                        <Link to="/registro" className="text-sm text-blue-900 hover:underline">Registrarse</Link>
                    )}
                </div>

            </div>
        </div>
    );
}
