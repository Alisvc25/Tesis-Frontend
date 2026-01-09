import { useState } from "react";
import { adminApi } from "../api/adminApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RegistrarEstudiante() {
    const cursos = ["Inicial1", "Inicial2", "2do", "3ro", "4to",
        "5to", "6to", "7mo", "8vo", "9no", "10mo", 
        "1ro BGU", "2do BGU", "3ro BGU"];
    const nacionalidades = ["Ecuatoriana", "Colombiana", "Venezolana", "Otro"];

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [nacionalidad, setNacionalidad] = useState("");
    const [otraNacionalidad, setOtraNacionalidad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [curso, setCurso] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (cedula.length !== 10) return setError("La cédula debe tener 10 dígitos");
        if (celular && celular.length !== 10) return setError("El celular debe tener 10 dígitos");

        setLoading(true);

        try {
            await adminApi.registrarEstudiante({
                nombre,
                apellido,
                cedula,
                fechaNacimiento,
                nacionalidad: nacionalidad === "Otro" ? otraNacionalidad : nacionalidad,
                direccion,
                curso,
                celular,
                email,
            });

            setSuccess("Estudiante registrado correctamente");
            setNombre("");
            setApellido("");
            setCedula("");
            setFechaNacimiento("");
            setNacionalidad("");
            setOtraNacionalidad("");
            setDireccion("");
            setCurso("");
            setCelular("");
            setEmail("");
        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrar estudiante");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Registrar Estudiante</h2>

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
                        type="date"
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        value={fechaNacimiento}
                        onChange={e => setFechaNacimiento(e.target.value)}
                        required
                    />
                </div>

                <select
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    value={nacionalidad}
                    onChange={e => setNacionalidad(e.target.value)}
                    required
                >
                    <option value="">Seleccione nacionalidad</option>
                    {nacionalidades.map(n => <option key={n}>{n}</option>)}
                </select>

                {nacionalidad === "Otro" && (
                    <input
                        className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                        placeholder="Especifique nacionalidad"
                        value={otraNacionalidad}
                        onChange={e => setOtraNacionalidad(e.target.value)}
                        required
                    />
                )}

                <input className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />

                <select
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    value={curso}
                    onChange={e => setCurso(e.target.value)}
                    required
                >
                    <option value="">Seleccione curso</option>
                    {cursos.map(c => <option key={c}>{c}</option>)}
                </select>

                <input
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-900"
                    placeholder="Celular"
                    value={celular}
                    onChange={e => {
                        const v = e.target.value.replace(/\D/g, "");
                        if (v.length <= 10) setCelular(v);
                    }}
                />

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
