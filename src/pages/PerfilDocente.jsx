import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Perfil() {
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("/docente/perfil", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPerfil(data);
            } catch (error) {
                console.error(error);
            }
        };

        obtenerPerfil();
    }, []);

    if (!perfil) return <p>Cargando perfil...</p>;

    return (
        <div className="max-w-xl bg-white p-6 rounded shadow" >
            <h2 className="text-xl font-bold mb-4" > Mi Perfil </h2>

            < p > <strong>Nombre: </strong> {perfil.nombre}</p >
            <p><strong>Apellido: </strong> {perfil.apellido}</p >
            <p><strong>Email: </strong> {perfil.email}</p >
            <p><strong>Cédula: </strong> {perfil.cedula}</p >
            <p><strong>Celular: </strong> {perfil.celular}</p >
        </div>
    );
}
