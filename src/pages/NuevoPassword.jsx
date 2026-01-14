import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import { docenteApi } from "../api/docenteApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function NuevoPassword() {
    const { token } = useParams();
    const [params] = useSearchParams();
    const tipo = params.get("tipo") || "admin"; 

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [valid, setValid] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    useEffect(() => {
        const validar = async () => {
            setLoading(true);
            setError("");
            try {
                const api = tipo === "docente" ? docenteApi : adminApi;
                await api.comprobarTokenPassword(token);
                setValid(true);
            } catch (err) {
                setError(err.response?.data?.msg || "Token inválido o expirado");
                setValid(false);
            } finally {
                setLoading(false);
            }
        };
        if (token) validar();
    }, [token, tipo]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres");
        if (password !== confirmpassword) return setError("Las contraseñas no coinciden");

        try {
            const api = tipo === "docente" ? docenteApi : adminApi;
            const res = await api.nuevoPassword(token, { password, confirmpassword });
            setSuccess(res?.msg || "Contraseña actualizada correctamente");

            setTimeout(() => {
                navigate("/login");
            }, 1200);
        } catch (err) {
            setError(err.response?.data?.msg || "No se pudo actualizar la contraseña");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Nueva contraseña</h2>

                {error && <ErrorAlert message={error} />}
                {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

                {!valid ? (
                    <div className="text-sm text-gray-700">
                        <Link to="/recuperar-password" className="text-blue-900 font-semibold hover:underline">
                            Volver a recuperar contraseña
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="form-label">Contraseña nueva</label>
                            <input
                                type="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="form-label">Confirmar contraseña</label>
                            <input
                                type="password"
                                className="form-input"
                                value={confirmpassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                        >
                            Guardar contraseña
                        </button>

                        <div className="text-sm text-gray-700">
                            <Link to="/login" className="text-blue-900 font-semibold hover:underline">
                                Volver al login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
