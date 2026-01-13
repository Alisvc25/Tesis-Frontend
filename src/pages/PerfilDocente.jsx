import { useEffect, useState } from "react";
import { docenteApi } from "../api/docenteApi";
import useAuth from "../context/useAuth";

export default function Perfil() {
    const { user } = useAuth();
    const [perfil, setPerfil] = useState(null);

    useEffect(() => {
        docenteApi.obtenerPerfil(user.token)
            .then(res => setPerfil(res))
            .catch(() => alert("Error al cargar el perfil"));
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
