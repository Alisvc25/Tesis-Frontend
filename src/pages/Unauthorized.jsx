import { Link } from "react-router-dom";

export default function Unauthorized() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Acceso denegado</h2>
                <p className="text-gray-700 mb-6">No tienes permisos para ver esta página.</p>
                <Link to="/" className="text-blue-900 hover:underline">Volver al inicio</Link>
            </div>
        </div>
    );
}
