import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const roleParam = params.get("role") || null;

    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let endpoint = "/administrador/login";
            if (roleParam === "docente") endpoint = "/apiD/login";
            else if (roleParam === "estudiante") endpoint = "/apiE/login";

            const res = await axios.post(`${API_URL}${endpoint}`, { email, password });

            const userData = res.data;

            const normalizedUser = {
                ...userData,
                role: userData.rol ?? userData.role ?? roleParam,
            };

            login(normalizedUser, normalizedUser.token);

            if
                (normalizedUser.role === "administrador") navigate("/admin");
            else if
                (normalizedUser.role === "docente") navigate("/docente");
            else if
                (normalizedUser.role === "estudiante") navigate("/estudiante");


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

                    <div className="relative">
                        <label className="form-label">Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-input pr-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
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
                    {(roleParam === "administrador" || roleParam === "docente") && (
                        <Link to={`/recuperar-password?role=${roleParam}`} className="text-blue-900 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
}
