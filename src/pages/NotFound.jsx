import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50 text-blue-900">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-6">Página no encontrada</p>
            <Link
                to="/"
                className="bg-blue-900 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-800 transition"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
