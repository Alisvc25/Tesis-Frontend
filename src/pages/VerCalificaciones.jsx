import { useEffect, useState } from "react";
import { estudianteApi } from "../api/estudianteApi";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import useAuth from "../context/useAuth";

export default function VerCalificaciones() {
    const { id } = useParams();
    const { user } = useAuth();

    const [calificacion, setCalificacion] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id || !user?.token) return;

        estudianteApi
            .verCalificaciones(id, user.token)
            .then(res => {
                setCalificacion(res.calificacion ?? res);
            })
            .catch(err => {
                console.error(err);
                setError("No se pudo cargar la calificación");
            });
    }, [id, user]);

    if (error) return <p className="text-red-600">{error}</p>;
    if (!calificacion) return <Loader />;

    console.log("RENDER VER CALIFICACIONES");


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
                {calificacion.materia}
            </h2>

            {["parcial1", "parcial2", "parcial3"].map((p, i) => (
                <div key={p} className="mb-4 border p-4 rounded">
                    <h3 className="font-bold mb-2">Parcial {i + 1}</h3>

                    <p>Deberes: {calificacion[p]?.deberes}</p>
                    <p>Exámenes: {calificacion[p]?.examenes}</p>
                    <p>Trabajos en clase: {calificacion[p]?.trabajosClase}</p>
                    <p>Proyectos: {calificacion[p]?.proyectos}</p>

                    <p className="font-semibold mt-2">
                        Promedio: {calificacion[p]?.promedio}
                    </p>
                </div>
            ))}

            <h3 className="text-xl font-bold mt-6">
                Promedio Final: {calificacion.promedioFinal}
            </h3>
        </div>
    );
}
