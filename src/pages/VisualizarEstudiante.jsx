import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function VisualizarEstudiante() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [estudiante, setEstudiante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await adminApi.visualizarEstudiante(id, user.token);
                setEstudiante(res.estudiante ?? res);
            } catch (err) {
                setError(err.response?.data?.msg || "No se pudo cargar el estudiante");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, user.token]);

    if (loading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-900">Detalle del Estudiante</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Volver
                </button>
            </div>

            {error && <ErrorAlert message={error} />}

            {estudiante && (
                <div className="space-y-3">
                    <div className="border rounded p-4">
                        <p className="text-sm text-gray-500">Nombre completo</p>
                        <p className="font-semibold text-blue-900">
                            {estudiante.nombre} {estudiante.apellido}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Cédula</p>
                            <p className="font-semibold">{estudiante.cedula}</p>
                        </div>

                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Celular</p>
                            <p className="font-semibold">{estudiante.celular}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Fecha Nacimiento</p>
                            <p className="font-semibold">
                                {estudiante.fechaNacimiento
                                    ? String(estudiante.fechaNacimiento).slice(0, 10)
                                    : "—"}
                            </p>
                        </div>

                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Curso</p>
                            <p className="font-semibold">{estudiante.curso}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Nacionalidad</p>
                            <p className="font-semibold">{estudiante.nacionalidad}</p>
                        </div>

                        <div className="border rounded p-4">
                            <p className="text-sm text-gray-500">Cultura</p>
                            <p className="font-semibold">{estudiante.cultura}</p>
                        </div>
                    </div>

                    <div className="border rounded p-4">
                        <p className="text-sm text-gray-500">Dirección</p>
                        <p className="font-semibold">{estudiante.direccion}</p>
                    </div>

                    <div className="border rounded p-4">
                        <p className="text-sm text-gray-500">Correo</p>
                        <p className="font-semibold">{estudiante.email}</p>
                    </div>

                    <button
                        onClick={() => navigate(`/admin/actualizar-estudiante/${estudiante._id}`)}
                        className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
                    >
                        Editar
                    </button>
                </div>
            )}
        </div>
    );
}
