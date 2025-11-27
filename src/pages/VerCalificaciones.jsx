import { useEffect, useState } from "react";
import { obtenerCalificacion } from "../api/docenteApi";
import { useParams } from "react-router-dom";
import DocenteLayout from "../layout/DocenteLayout";

export default function VerCalificaciones() {
    const { id } = useParams();
    const [calificacion, setCalificacion] = useState(null);

    useEffect(() => {
        obtenerCalificacion(id).then(setCalificacion);
    }, []);

    if (!calificacion) return <p>Cargando...</p>;

    return (
        <DocenteLayout>
            <h1 className="dashboard-title">{calificacion.materia}</h1>

            <div className="dashboard-card">
                <h3>Promedio Final: {calificacion.promedioFinal}</h3>

                <pre className="whitespace-pre-wrap mt-4 text-sm">
                    {JSON.stringify(calificacion, null, 2)}
                </pre>
            </div>
        </DocenteLayout>
    );
}
