import { useState } from "react";
import { adminApi } from "../api/adminApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RegistrarDocente() {
    const materiasDisponibles = ["Matemáticas", "Lengua y Literatura", "Ciencias Naturales", "Historia", "Inglés", 
        "Educación Física", "Biología", "Química", "Física", "Estudios Sociales",
    "Ciudadania", "Educacion Artística"];

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cedula, setCedula] = useState("");
    const [celular, setCelular] = useState("");
    const [materias, setMaterias] = useState([]);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const toggleMateria = (m) => {
        setMaterias(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (cedula.length !== 10) return setError("La cédula debe tener 10 dígitos");
        if (celular && celular.length !== 10) return setError("El celular debe tener 10 dígitos");

        setLoading(true);

        try {
            await adminApi.registrarDocente({
                nombre,
                apellido,
                direccion,
                cedula,
                celular,
                email,
                materias
            });

            setSuccess("Docente registrado correctamente");
            setNombre(""); setApellido(""); setDireccion(""); setCedula(""); setCelular(""); setMaterias([]); setEmail("");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrar docente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Registrar Docente</h2>

            {error && <ErrorAlert message={error} />}
            {success && <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">{success}</div>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

                <div className="grid grid-cols-2 gap-4">
                    <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)} required />
                    <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <input
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        placeholder="Cédula"
                        value={cedula}
                        onChange={e => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (v.length <= 10) setCedula(v);
                        }}
                        required
                    />

                    <input
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        placeholder="Celular"
                        value={celular}
                        onChange={e => {
                            const v = e.target.value.replace(/\D/g, "");
                            if (v.length <= 10) setCelular(v);
                        }}
                    />
                </div>

                <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

                <div>
                    <p className="text-gray-700 mb-1 font-semibold">Materias</p>
                    {materiasDisponibles.map(m => (
                        <label key={m} className="block">
                            <input type="checkbox" checked={materias.includes(m)} onChange={() => toggleMateria(m)} /> {m}
                        </label>
                    ))}
                </div>

                <input
                    type="email"
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                />

                <button
                    disabled={loading}
                    className="bg-blue-900 text-white px-6 py-2 rounded font-semibold hover:bg-blue-800 transition"
                >
                    {loading ? <Loader /> : "Registrar"}
                </button>
            </form>
        </div>
    );
}
