import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth.jsx";

export default function ProtectedRoute({ children, role }) {
    const { user, loading } = useAuth();

    if (loading) return <div className="p-6">Cargando...</div>;

    if (!user) return <Navigate to="/login" replace />;

    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return children;
}
