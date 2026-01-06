import { Link } from "react-router-dom";
import useAuth from "../../context/useAuth.jsx";

export default function Sidebar() {
    const { user } = useAuth();

    if (!user) return null;

    const links = [];

    if (user.role === "administrador") {
        links.push(
            { name: "Dashboard", path: "/admin" },
            { name: "Registrar Docente", path: "/admin/registrar-docente" },
            { name: "Registrar Estudiante", path: "/admin/registrar-estudiante" },
            { name: "Actualizar Contraseña", path: "/admin/actualizar-password" }
        );
    }

    if (user.role === "docente") {
        links.push(
            { name: "Dashboard", path: "/docente" },
            { name: "Crear Calificación", path: "/docente/crear-calificacion" },
            { name: "Listar Calificaciones", path: "/docente/listar-calificaciones" }
        );
    }

    if (user.role === "estudiante") {
        links.push(
            { name: "Dashboard", path: "/estudiante" },
            { name: "Mis Calificaciones", path: "/estudiante/ver-calificaciones" }
        );
    }

    return (
        <aside className="bg-blue-100 w-64 min-h-screen p-6">
            <ul className="space-y-4">
                {links.map((link) => (
                    <li key={link.path}>
                        <Link
                            to={link.path}
                            className="block text-blue-900 font-semibold hover:bg-blue-200 px-4 py-2 rounded"
                        >
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
