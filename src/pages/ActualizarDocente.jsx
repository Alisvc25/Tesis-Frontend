import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function ActualizarDocente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        celular: "",
        direccion: "",
        email: "",
        materias: [],
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError("");
            try {
                const res = await adminApi.visualizarDocente(id, user.token);
                const d = res.docente ?? res;

                setForm({
                    nombre: d.nombre ?? "",
                    apellido: d.apellido ?? "",
                    cedula: d.cedula ?? "",
                    celular: d.celular ?? "",
                    direccion: d.direccion ?? "",
                    email: d.email ?? "",
                    materias: Array.isArray(d.materias) ? d.materias : [],
                });
            } catch (err) {
                setError(err.response?.data?.msg || "No se pudo cargar el docente");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, user.token]);

    const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const toggleMateria = (m) => {
        setForm((prev) => ({
            ...prev,
            materias: prev.materias.includes(m)
                ? prev.materias.filter((x) => x !== m)
                : [...prev.materias, m],
        }));
    };

    const materiasDisponibles = [
        "Matemáticas", "Lengua y Literatura", "Ciencias Naturales", "Historia", "Inglés",
        "Educación Física", "Biología", "Química", "Física", "Estudios Sociales",
        "Ciudadania", "Educacion Artística",
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            await adminApi.actualizarDocente(id, form, user.token);
            setSuccess("Docente actualizado correctamente");
            setTimeout(() => navigate(`/admin/visualizar-docente/${id}`), 800);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al actualizar docente");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-900">Editar Docente</h2>
                <button onClick={() => navigate(-1)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
                    Volver
                </button>
            </div>

            {error && <ErrorAlert message={error} />}
            {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border p-2 rounded" placeholder="Nombre" value={form.nombre} onChange={(e) => handleChange("nombre", e.target.value)} required />
                    <input className="w-full border p-2 rounded" placeholder="Apellido" value={form.apellido} onChange={(e) => handleChange("apellido", e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input className="w-full border p-2 rounded" placeholder="Cédula" value={form.cedula} onChange={(e) => handleChange("cedula", e.target.value.replace(/\D/g, "").slice(0, 10))} required />
                    <input className="w-full border p-2 rounded" placeholder="Celular" value={form.celular} onChange={(e) => handleChange("celular", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                </div>

                <input className="w-full border p-2 rounded" placeholder="Dirección" value={form.direccion} onChange={(e) => handleChange("direccion", e.target.value)} />

                <input type="email" className="w-full border p-2 rounded" placeholder="Correo" value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />

                <div className="border rounded p-4">
                    <p className="font-semibold text-blue-900 mb-2">Materias</p>
                    <div className="grid grid-cols-2 gap-2">
                        {materiasDisponibles.map((m) => (
                            <label key={m} className="text-sm flex items-center gap-2">
                                <input type="checkbox" checked={form.materias.includes(m)} onChange={() => toggleMateria(m)} />
                                {m}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    disabled={saving}
                    className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
                >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                </button>
            </form>
        </div>
    );
}
