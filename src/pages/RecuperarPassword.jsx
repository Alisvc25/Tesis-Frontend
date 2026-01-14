import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import { docenteApi } from "../api/docenteApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RecuperarPassword() {
    const [params] = useSearchParams();
    const tipo = params.get("tipo") || "admin"; // admin | docente

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const api = tipo === "docente" ? docenteApi : adminApi;
            const res = await api.recuperarPassword(email);
            setSuccess(res?.msg || "Revisa tu correo para continuar.");
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.msg || "No se pudo enviar el correo de recuperación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Recuperar contraseña</h2>
                <p className="text-gray-600 mb-4">
                    Ingresa tu correo y te enviaremos un enlace para crear una nueva contraseña.
                </p>

                {error && <ErrorAlert message={error} />}
                {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="form-label">Correo</label>
                        <input
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tucorreo@ejemplo.com"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Enviar enlace"}
                    </button>
                </form>

                <div className="mt-4 text-sm text-gray-700">
                    <Link to="/login" className="text-blue-900 font-semibold hover:underline">
                        Volver al login
                    </Link>
                </div>
            </div>
        </div>
    );
}
