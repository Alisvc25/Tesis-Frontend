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
    const [editData, setEditData] = useState({
        materia: "",
        parcial1: { deberes: 0, examenes: 0, trabajosClase: 0, proyectos: 0 },
        parcial2: { deberes: 0, examenes: 0, trabajosClase: 0, proyectos: 0 },
        parcial3: { deberes: 0, examenes: 0, trabajosClase: 0, proyectos: 0 }
    });

    const fetchCalificaciones = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await docenteApi.listarCalificaciones(user._id, user.token);
            setCalificaciones(res);
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
        setEditData({
            materia: cal.materia,
            parcial1: cal.parcial1,
            parcial2: cal.parcial2,
            parcial3: cal.parcial3
        });
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
                        <th className="py-2 px-4">Materia</th>
                        <th className="py-2 px-4">Parcial 1</th>
                        <th className="py-2 px-4">Parcial 2</th>
                        <th className="py-2 px-4">Parcial 3</th>
                        <th className="py-2 px-4">Promedio Final</th>
                        <th className="py-2 px-4">Estudiante</th>
                        <th className="py-2 px-4">Docente</th>
                        <th className="py-2 px-4">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {calificaciones.map((cal) => (
                        <tr key={cal._id} className="border-b">

                            {/* MATERIA */}
                            <td className="py-2 px-4">
                                {editId === cal._id ? (
                                    <input
                                        type="text"
                                        value={editData.materia}
                                        onChange={(e) =>
                                            setEditData({ ...editData, materia: e.target.value })
                                        }
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    cal.materia
                                )}
                            </td>

                            {/* PARCIAL 1 */}
                            <td className="py-2 px-4">
                                <strong>Promedio:</strong> {cal.parcial1.promedio} <br />
                                <span className="text-sm text-gray-600">
                                    D: {cal.parcial1.deberes} | E: {cal.parcial1.examenes} | T: {cal.parcial1.trabajosClase} | P: {cal.parcial1.proyectos}
                                </span>
                            </td>

                            {/* PARCIAL 2 */}
                            <td className="py-2 px-4">
                                <strong>Promedio:</strong> {cal.parcial2.promedio} <br />
                                <span className="text-sm text-gray-600">
                                    D: {cal.parcial2.deberes} | E: {cal.parcial2.examenes} | T: {cal.parcial2.trabajosClase} | P: {cal.parcial2.proyectos}
                                </span>
                            </td>

                            {/* PARCIAL 3 */}
                            <td className="py-2 px-4">
                                <strong>Promedio:</strong> {cal.parcial3.promedio} <br />
                                <span className="text-sm text-gray-600">
                                    D: {cal.parcial3.deberes} | E: {cal.parcial3.examenes} | T: {cal.parcial3.trabajosClase} | P: {cal.parcial3.proyectos}
                                </span>
                            </td>

                            {/* PROMEDIO FINAL */}
                            <td className="py-2 px-4 font-bold text-blue-900">
                                {cal.promedioFinal}
                            </td>

                            {/* ESTUDIANTE */}
                            <td className="py-2 px-4">
                                {cal.estudiante?.nombres} {cal.estudiante?.apellidos}
                            </td>

                            {/* DOCENTE */}
                            <td className="py-2 px-4">
                                {cal.docente?.nombres} {cal.docente?.apellidos}
                            </td>

                            {/* BOTONES */}
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
