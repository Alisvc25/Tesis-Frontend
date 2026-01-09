import { useState } from "react";
import { docenteApi } from "../api/docenteApi.js";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";
import useAuth from "../context/useAuth.jsx";

export default function CrearCalificacion() {
    const { user } = useAuth();

    const [estudiante, setEstudiante] = useState("");
    const [materia, setMateria] = useState("");
    const [deberes, setDeberes] = useState("");
    const [examenes, setExamenes] = useState("");
    const [trabajosClase, setTrabajosClase] = useState("");
    const [proyectos, setProyectos] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [parcial, setParcial] = useState("parcial1");
    const [calificacionId, setCalificacionId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const notas = {
            deberes: Number(deberes) || 0,
            examenes: Number(examenes) || 0,
            trabajosClase: Number(trabajosClase) || 0,
            proyectos: Number(proyectos) || 0
        };


        try {
            if (parcial === "parcial1" && !calificacionId) {
                const res = await docenteApi.crearCalificacion(
                    {
                        estudiante,
                        docente: user._id,
                        materia,
                        parcial1: notas
                    },
                    user.token
                );
                setCalificacionId(res.nueva._id);
                setSuccess("Parcial 1 registrado correctamente");
            } else {
                await docenteApi.actualizarCalificacion(
                    calificacionId,
                    {
                        [parcial]: notas
                    },
                    user.token
                );
                setSuccess(`${parcial} registrado correctamente`);
            }

            setDeberes("");
            setExamenes("");
            setTrabajosClase("");
            setProyectos("");

        } catch (err) {
            setError(err.response?.data?.msg || "Error al guardar calificación");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Registrar Calificación</h2>

            {error && <ErrorAlert message={error} />}
            {success && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-2">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

                <div>
                    <label>Estudiante (ID)</label>
                    <input
                        type="text"
                        value={estudiante}
                        onChange={(e) => setEstudiante(e.target.value)}
                        className="w-full border p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label>Materia</label>
                    <select
                        value={materia}
                        onChange={(e) => setMateria(e.target.value)}
                        required
                    >
                        <option value="">Seleccione una materia</option>
                        {user.materias.map((m, i) => (
                            <option key={i} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Parcial</label>
                    <select
                        value={parcial}
                        onChange={(e) => setParcial(e.target.value)}
                        className="w-full border p-2 rounded"
                    >
                        <option value="parcial1">Parcial 1</option>
                        <option value="parcial2">Parcial 2</option>
                        <option value="parcial3">Parcial 3</option>
                    </select>
                </div>


                <div>
                    <label>Deberes</label>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={deberes}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || (!isNaN(val) && Number(val) >= 0 && Number(val) <= 20)) {
                                setDeberes(val);
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Exámenes</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        max="20"
                        value={examenes}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || (!isNaN(val) && Number(val) >= 0 && Number(val) <= 20)) {
                                setExamenes(val);
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Trabajos en clase</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        max="20"
                        value={trabajosClase}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || (!isNaN(val) && Number(val) >= 0 && Number(val) <= 20)) {
                                setTrabajosClase(val);
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Proyectos</label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        max="20"
                        value={proyectos}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val === "" || (!isNaN(val) && Number(val) >= 0 && Number(val) <= 20)) {
                                setProyectos(val);
                            }
                        }}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
                    disabled={loading}
                >
                    {loading ? "Guardando..." : "Guardar"}
                </button>
            </form>
        </>
    );
}
