import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function ActualizarEstudiante() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        cedula: "",
        fechaNacimiento: "",
        celular: "",
        cultura: "",
        nacionalidad: "",
        email: "",
        curso: "",
        direccion: "",
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
                const res = await adminApi.visualizarEstudiante(id, user.token);
                const e = res.estudiante ?? res;

                setForm({
                    nombre: e.nombre ?? "",
                    apellido: e.apellido ?? "",
                    cedula: e.cedula ?? "",
                    fechaNacimiento: e.fechaNacimiento ? String(e.fechaNacimiento).slice(0, 10) : "",
                    celular: e.celular ?? "",
                    cultura: e.cultura ?? "",
                    nacionalidad: e.nacionalidad ?? "",
                    email: e.email ?? "",
                    curso: e.curso ?? "",
                    direccion: e.direccion ?? "",
                });
            } catch (err) {
                setError(err.response?.data?.msg || "No se pudo cargar el estudiante");
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [id, user.token]);

    const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setSaving(true);

        try {
            await adminApi.actualizarEstudiante(id, form, user.token);
            setSuccess("Estudiante actualizado correctamente");
            setTimeout(() => navigate(`/admin/visualizar-estudiante/${id}`), 800);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al actualizar estudiante");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-900">Editar Estudiante</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    Volver
                </button>
            </div>

            {error && <ErrorAlert message={error} />}
            {success && (
                <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Nombre"
                        value={form.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        required
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Apellido"
                        value={form.apellido}
                        onChange={(e) => handleChange("apellido", e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Cédula"
                        value={form.cedula}
                        onChange={(e) =>
                            handleChange("cedula", e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                        required
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Celular"
                        value={form.celular}
                        onChange={(e) =>
                            handleChange("celular", e.target.value.replace(/\D/g, "").slice(0, 10))
                        }
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        className="w-full border p-2 rounded"
                        value={form.fechaNacimiento}
                        onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Curso"
                        value={form.curso}
                        onChange={(e) => handleChange("curso", e.target.value)}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Nacionalidad"
                        value={form.nacionalidad}
                        onChange={(e) => handleChange("nacionalidad", e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Cultura"
                        value={form.cultura}
                        onChange={(e) => handleChange("cultura", e.target.value)}
                    />
                </div>

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Dirección"
                    value={form.direccion}
                    onChange={(e) => handleChange("direccion", e.target.value)}
                />

                <input
                    type="email"
                    className="w-full border p-2 rounded"
                    placeholder="Correo"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    required
                />

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
