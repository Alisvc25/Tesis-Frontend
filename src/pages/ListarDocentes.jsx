import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

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
            setError(err.response?.data?.msg || "Error al cargar docentes");
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
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Docentes</h2>

            {error && <ErrorAlert message={error} />}

            <table className="min-w-full bg-white border">
                <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="py-2 px-4 text-left">Nombre</th>
                        <th className="py-2 px-4 text-left">Correo electrónico</th>
                        <th className="py-2 px-4 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {docentes.map((d) => (
                        <tr key={d._id} className="border-b">
                            <td className="py-2 px-4">
                                {d.nombre} {d.apellido}
                            </td>

                            <td className="py-2 px-4">{d.email}</td>

                            <td className="py-2 px-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() => navigate(`/admin/visualizar-docente/${d._id}`)}
                                        className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                                    >
                                        Ver
                                    </button>

                                    <button
                                        onClick={() => navigate(`/admin/actualizar-docente/${d._id}`)}
                                        className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(d._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                    {docentes.length === 0 && (
                        <tr>
                            <td colSpan="3" className="py-4 text-center text-gray-500">
                                No hay docentes registrados
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
