import { useState, useEffect } from "react";
import AuthContext from "./AuthContext.jsx";
import axios from "axios";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("userData");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post("http://localhost:4000/api/auth/login", {
                email,
                password,
            });

            const userData = {
                token: res.data.token,
                role: res.data.role,
                name: res.data.name,
                id: res.data.id,
            };

            localStorage.setItem("userData", JSON.stringify(userData));
            setUser(userData);

            return { ok: true };
        } catch (error) {
            return { ok: false, msg: error.response?.data?.msg || "Error al iniciar sesión" };
        }
    };

    const logout = () => {
        localStorage.removeItem("userData");
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
