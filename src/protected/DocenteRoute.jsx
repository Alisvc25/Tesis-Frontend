import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth.jsx";

export default function DocenteRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== "docente") {
        return <Navigate to="/" replace />;
    }

    return children;
}
