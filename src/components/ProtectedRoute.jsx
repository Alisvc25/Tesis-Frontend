import { Navigate } from "react-router-dom";
import useAuth from "../../context/useAuth";

export default function ProtectedRoute({ children, role }) {
    const { usuario, cargando } = useAuth();

    if (cargando) return <p className="text-center mt-10">Cargando...</p>;

    if (!usuario) return <Navigate to="/login" />;

    if (role && usuario.rol !== role) return <Navigate to="/" />;

    return children;
}
