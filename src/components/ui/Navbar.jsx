import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth.jsx";

export default function Navbar() {
    const { user, setUser } = useAuth();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <nav className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">
                Unidad Educativa
            </Link>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span>{user.nombre}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-gray-200 transition"
                        >
                            Cerrar Sesión
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-gray-200 transition"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
