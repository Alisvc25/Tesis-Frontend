import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem("usuario");
        if (data) setUsuario(JSON.parse(data));
        setCargando(false);
    }, []);

    const login = (userData) => {
        setUsuario(userData);
        localStorage.setItem("usuario", JSON.stringify(userData));
    };

    const logout = () => {
        setUsuario(null);
        localStorage.removeItem("usuario");
    };

    return (
        <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
