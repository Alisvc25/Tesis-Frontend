import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function ConfirmarCuenta() {
    const { token } = useParams();
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/confirmar/${token}`
                );
                setMensaje(res.data.msg || "Cuenta confirmada correctamente");
            } catch (err) {
                setError(
                    err.response?.data?.msg || "Error al confirmar la cuenta"
                );
            } finally {
                setLoading(false);
            }
        };

        confirmarCuenta();
    }, [token]);

    if (loading) return <Loader />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                    Confirmación de cuenta
                </h2>

                {error && <ErrorAlert message={error} />}
                {mensaje && (
                    <p className="text-green-600 font-medium mb-4">{mensaje}</p>
                )}

                <Link
                    to="/login?role=administrador"
                    className="inline-block mt-4 bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
                >
                    Ir a iniciar sesión
                </Link>
            </div>
        </div>
    );
}
