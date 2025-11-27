import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth.jsx";

export default function AdminRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "admin") {
        return <Navigate to="/" replace />; // o a su dashboard correspondiente
    }

    return children;
}
