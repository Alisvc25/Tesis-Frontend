import { useState } from "react";
import DocenteLayout from "../layout/DocenteLayout.jsx";
import { docenteApi } from "../api/docenteApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function CrearCalificacion() {
    const [asignatura, setAsignatura] = useState("");
    const [nota, setNota] = useState("");
    const [observacion, setObservacion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await docenteApi.crearCalificacion({ asignatura, nota, observacion });
            setSuccess("Calificación creada exitosamente");
            setAsignatura("");
            setNota("");
            setObservacion("");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al crear calificación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DocenteLayout>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Crear Calificación</h2>

            {error && <ErrorAlert message={error} />}
            {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label className="block text-gray-700 mb-1">Asignatura</label>
                    <input
                        type="text"
                        value={asignatura}
                        onChange={(e) => setAsignatura(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Nota</label>
                    <input
                        type="number"
                        value={nota}
                        onChange={(e) => setNota(e.target.value)}
                        required
                        min="0"
                        max="100"
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 mb-1">Observación</label>
                    <textarea
                        value={observacion}
                        onChange={(e) => setObservacion(e.target.value)}
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-900 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Crear"}
                </button>
            </form>
        </DocenteLayout>
    );
}
