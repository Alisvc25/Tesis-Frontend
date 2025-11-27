import { useState } from "react";
import AdminLayout from "../layout/AdminLayout.jsx";
import { adminApi } from "../api/adminApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RegistrarDocente() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await adminApi.registrarDocente({ nombre, email, password });
            setSuccess("Docente registrado correctamente");
            setNombre("");
            setEmail("");
            setPassword("");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrar docente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Registrar Docente</h2>

            {error && <ErrorAlert message={error} />}
            {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block text-gray-700 mb-1">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Correo electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-900 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Registrar"}
                </button>
            </form>
        </AdminLayout>
    );
}
