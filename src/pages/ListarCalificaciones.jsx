import { useEffect, useState } from "react";
import { docenteApi } from "../api/docenteApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function ListarCalificaciones() {
    const { user } = useAuth();
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ materia: "", calificacion: "" });

    const fetchCalificaciones = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await docenteApi.listarCalificaciones(user.id, user.token);
            setCalificaciones(res.data);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al cargar calificaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCalificaciones();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("¿Desea eliminar esta calificación?")) return;
        try {
            await docenteApi.eliminarCalificacion(id, user.token);
            fetchCalificaciones();
        } catch (err) {
            alert(err.response?.data?.msg || "Error al eliminar");
        }
    };

    const handleEdit = (cal) => {
        setEditId(cal._id);
        setEditData({ materia: cal.materia, calificacion: cal.calificacion });
    };

    const handleUpdate = async () => {
        try {
            await docenteApi.actualizarCalificacion(editId, editData, user.token);
            setEditId(null);
            fetchCalificaciones();
        } catch (err) {
            alert(err.response?.data?.msg || "Error al actualizar");
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Calificaciones</h2>

            {error && <ErrorAlert message={error} />}

            <table className="min-w-full bg-white border">
                <thead className="bg-blue-900 text-white">
                    <tr>
                        <th className="py-2 px-4">Estudiante ID</th>
                        <th className="py-2 px-4">Materia</th>
                        <th className="py-2 px-4">Calificación</th>
                        <th className="py-2 px-4">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {calificaciones.map((cal) => (
                        <tr key={cal._id} className="border-b">
                            <td className="py-2 px-4">{cal.estudianteId}</td>
                            <td className="py-2 px-4">
                                {editId === cal._id ? (
                                    <input
                                        type="text"
                                        value={editData.materia}
                                        onChange={(e) => setEditData({ ...editData, materia: e.target.value })}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    cal.materia
                                )}
                            </td>
                            <td className="py-2 px-4">
                                {editId === cal._id ? (
                                    <input
                                        type="number"
                                        value={editData.calificacion}
                                        onChange={(e) =>
                                            setEditData({ ...editData, calificacion: e.target.value })
                                        }
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    cal.calificacion
                                )}
                            </td>
                            <td className="py-2 px-4 flex gap-2">
                                {editId === cal._id ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={() => setEditId(null)}
                                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(cal)}
                                            className="bg-blue-700 text-white px-3 py-1 rounded hover:bg-blue-800"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cal._id)}
                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
