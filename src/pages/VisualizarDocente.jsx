import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";


export default function VerDocente() {
    const { id } = useParams();
    const [docente, setDocente] = useState(null);
    const token = localStorage.getItem("token");


    useEffect(() => {
        adminApi.visualizarDocente(id, token).then(setDocente);
    }, []);


    if (!docente) return <p>Cargando...</p>;


    return (
        <div className="p-6">
            <h1 className="text-xl font-bold">Perfil Docente</h1>
            <p><b>Nombre:</b> {docente.nombre}</p>
            <p><b>Email:</b> {docente.email}</p>
        </div>
    );
}