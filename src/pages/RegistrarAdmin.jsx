import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { adminApi } from "../api/adminApi.js";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function RegistrarAdmin() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [direccion, setDireccion] = useState("");
    const [celular, setCelular] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (celular && !/^\d{10}$/.test(celular)) {
            setError("El número de celular debe tener exactamente 10 dígitos");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                nombre,
                apellido,
                direccion,
                celular,
                email,
                password
            };

            await adminApi.registrarAdmin(payload);
            setSuccess("Administrador registrado correctamente");

            setTimeout(() => {
                navigate("/login?role=administrador");
            }, 1500);

        } catch (err) {
            setError(err.response?.data?.msg || "Error al registrar");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                    Registro Administrador
                </h2>

                {error && <ErrorAlert message={error} />}
                {success && <p className="text-green-600 mb-4 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Nombre</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>

                        <div>
                            <label className="form-label">Apellido</label>
                            <input
                                type="text"
                                value={apellido}
                                onChange={(e) => setApellido(e.target.value)}
                                required
                                className="form-input"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="form-label">Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="form-label">Celular</label>
                        <input
                            type="text"
                            value={celular}
                            onChange={(e) => {
                                if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                                    setCelular(e.target.value);
                                }
                            }}
                            placeholder=""
                            className="form-input"
                        />
                    </div>

                    <div>
                        <label className="form-label">Correo electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                            <label className="form-label">Contraseña</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="form-input pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <div className="relative">
                            <label className="form-label">Confirmar Contraseña</label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="form-input pr-10"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 transition"
                        disabled={loading}
                    >
                        {loading ? <Loader /> : "Registrarse"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        ¿Ya tienes cuenta?{" "}
                        <a href="/login" className="text-blue-900 hover:underline">
                            Iniciar sesión
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
