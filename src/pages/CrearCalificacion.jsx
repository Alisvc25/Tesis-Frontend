import { useState } from "react";
import { docenteApi } from "../api/docenteApi.js";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";
import useAuth from "../context/useAuth.jsx";

export default function CrearCalificacion() {
    const { user } = useAuth();

    const [estudiante, setEstudiante] = useState("");
    const [materia, setMateria] = useState("");
    const [deberes, setDeberes] = useState(0);
    const [examenes, setExamenes] = useState(0);
    const [trabajosClase, setTrabajosClase] = useState(0);
    const [proyectos, setProyectos] = useState(0);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [parcial, setParcial] = useState("parcial1");
    const [calificacionId, setCalificacionId] = useState(null);

    /*
        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError("");
            setSuccess("");
    
            try {
                await docenteApi.crearCalificacion(
                    {
                        estudiante,
                        //docente: user._id,
                        materia,
                        parcial1: {
                            deberes,
                            examenes,
                            trabajosClase,
                            proyectos
                        }
                    },
                    user.token
                );
    
                setSuccess("Calificación registrada correctamente");
                setEstudiante("");
                setMateria("");
                setDeberes(0);
                setExamenes(0);
                setTrabajosClase(0);
                setProyectos(0);
            } catch (err) {
                setError(err.response?.data?.msg || "Error al crear calificación");
            } finally {
                setLoading(false);
            }
        };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const notas = {
            deberes,
            examenes,
            trabajosClase,
            proyectos
        };

        try {
            if (parcial === "parcial1" && !calificacionId) {
                // CREAR CALIFICACIÓN
                const res = await docenteApi.crearCalificacion(
                    {
                        estudiante,
                        materia,
                        parcial1: notas
                    },
                    user.token
                );

                setCalificacionId(res.data.nueva._id);
                setSuccess("Parcial 1 registrado correctamente");
            } else {
                // ACTUALIZAR PARCIAL 2 O 3
                await docenteApi.actualizarCalificacion(
                    calificacionId,
                    {
                        [parcial]: notas
                    },
                    user.token
                );

                setSuccess(`${parcial} registrado correctamente`);
            }

            // limpiar notas
            setDeberes(0);
            setExamenes(0);
            setTrabajosClase(0);
            setProyectos(0);

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
                        value={deberes}
                        onChange={(e) => setDeberes(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Exámenes</label>
                    <input
                        type="number"
                        value={examenes}
                        onChange={(e) => setExamenes(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Trabajos en clase</label>
                    <input
                        type="number"
                        value={trabajosClase}
                        onChange={(e) => setTrabajosClase(Number(e.target.value))}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Proyectos</label>
                    <input
                        type="number"
                        value={proyectos}
                        onChange={(e) => setProyectos(Number(e.target.value))}
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
