import { useState } from "react";
// Rendered inside AdminLayout via routes; no layout wrapper here
import { adminApi } from "../api/adminApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RegistrarDocente() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cedula, setCedula] = useState("");
    const [celular, setCelular] = useState("");
    const [materias, setMaterias] = useState(""); // comma separated
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                nombre,
                apellido,
                direccion,
                cedula,
                celular,
                email,
                materias: materias.split(",").map((m) => m.trim()).filter(Boolean)
            };
            await adminApi.registrarDocente(payload);
            setSuccess("Docente registrado correctamente");
            setNombre("");
            setApellido("");
            setDireccion("");
            setCedula("");
            setCelular("");
            setMaterias("");
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrar docente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Registrar Docente</h2>

            {error && <ErrorAlert message={error} />}
            {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
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
                        <label className="block text-gray-700 mb-1">Apellido</label>
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 mb-1">Cédula</label>
                        <input
                            type="text"
                            value={cedula}
                            onChange={(e) => setCedula(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-1">Celular</label>
                        <input
                            type="text"
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Dirección</label>
                    <input
                        type="text"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Materias (separadas por comas)</label>
                    <input
                        type="text"
                        value={materias}
                        onChange={(e) => setMaterias(e.target.value)}
                        placeholder="Matemáticas, Ciencias"
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

                <button
                    type="submit"
                    className="bg-blue-900 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Registrar"}
                </button>
            </form>
        </div>
    );
}
