import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";


export default function VisualizarEstudiante() {
    const { id } = useParams();
    const [estudiante, setEstudiante] = useState(null);
    const token = localStorage.getItem("token");


    useEffect(() => {
        adminApi.visualizarEstudiante(id, token).then(setEstudiante);
    }, []);


    if (!estudiante) return <p>Cargando...</p>;

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Perfil Estudiante</h1>
            <p><b>Nombre:</b> {estudiante.nombre}</p>
            <p><b>Email:</b> {estudiante.email}</p>
        </div>
    );
}