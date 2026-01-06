import { useEffect, useState } from "react";
import { estudianteApi } from "../api/estudianteApi";
import { useParams } from "react-router-dom";
import EstudianteLayout from "../layout/EstudianteLayout";

export default function VerCalificaciones() {
    const { id } = useParams();
    const [calificacion, setCalificacion] = useState(null);

    useEffect(() => {
        console.log("ID recibido desde useParams:", id); // Depuración
        estudianteApi.obtenerCalificacion(id)
            .then(setCalificacion)
            .catch(() => console.log("Error cargando calificación"));
    }, [id]);

    if (!calificacion) return <p>Cargando...</p>;

    return (
        <EstudianteLayout>
            <h1 className="dashboard-title">{calificacion.materia}</h1>

            <div className="dashboard-card">
                <h3>Promedio Final: {calificacion.promedioFinal}</h3>

                <pre className="whitespace-pre-wrap mt-4 text-sm">
                    {JSON.stringify(calificacion, null, 2)}
                </pre>
            </div>
        </EstudianteLayout>
    );
}
