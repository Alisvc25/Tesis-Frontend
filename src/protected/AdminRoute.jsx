import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
    const rol = localStorage.getItem("rol");
    const token = localStorage.getItem("token");

    if (!token || rol !== "administrador") {
        return <Navigate to="/login" />;
    }

    return children;
}
