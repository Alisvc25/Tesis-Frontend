import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

const EyeIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const PencilIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const TrashIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
        <path d="M3 6h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 6V4h8v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export default function ListarDocente() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [docentes, setDocentes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDocentes = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await adminApi.listarDocente(user.token);
            setDocentes(res.docentes ?? res);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al cargar los docentes");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocentes();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Desea eliminar este docente?")) return;
        try {
            await adminApi.eliminarDocente(id, user.token);
            fetchDocentes();
        } catch (err) {
            alert(err.response?.data?.msg || "Error al eliminar");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-900">Docentes</h2>

                <button
                    onClick={() => navigate("/admin/registrar-docente")}
                    className="bg-blue-900 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800 transition"
                >
                    + Nuevo
                </button>
            </div>

            {error && <ErrorAlert message={error} />}

            <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-blue-900 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">Nombre</th>
                            <th className="py-3 px-4 text-left">Correo</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {docentes.map((d) => (
                            <tr key={d._id} className="border-b hover:bg-gray-50 transition">
                                <td className="py-3 px-4 font-semibold text-blue-900">
                                    {d.nombre} {d.apellido}
                                </td>

                                <td className="py-3 px-4">{d.email}</td>

                                <td className="py-3 px-4">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            title="Ver"
                                            onClick={() => navigate(`/admin/visualizar-docente/${d._id}`)}
                                            className="p-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                                        >
                                            <EyeIcon className="w-4 h-4" />
                                        </button>

                                        <button
                                            title="Editar"
                                            onClick={() => navigate(`/admin/actualizar-docente/${d._id}`)}
                                            className="p-2 rounded bg-blue-700 text-white hover:bg-blue-800 transition"
                                        >
                                            <PencilIcon className="w-4 h-4" />
                                        </button>

                                        <button
                                            title="Eliminar"
                                            onClick={() => handleDelete(d._id)}
                                            className="p-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {docentes.length === 0 && (
                            <tr>
                                <td colSpan="3" className="py-8 text-center text-gray-500">
                                    No hay docentes registrados
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
