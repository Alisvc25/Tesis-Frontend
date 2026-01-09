import { useEffect, useState } from "react";
import { estudianteApi } from "../api/estudianteApi.js";
import useAuth from "../context/useAuth.jsx";
import Loader from "../components/ui/Loader.jsx";
import ErrorAlert from "../components/ui/ErrorAlert.jsx";

export default function EstudianteDashboard() {

    const { user } = useAuth();
    const [calificaciones, setCalificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCalificaciones = async () => {
        if (!user?._id) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await estudianteApi.listarCalificaciones(user._id, user.token);
            setCalificaciones(res.calificaciones);
        } catch (err) {
            setError(err.response?.data?.msg || "Error al cargar calificaciones");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchCalificaciones();
    }, [user]);

    if (loading) return <Loader />;

    console.log("USER:", user);


    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Mis Calificaciones</h2>

            {error && <ErrorAlert message={error} />}

            <table className="min-w-full border">
                <thead className="bg-blue-900 text-white">
                    <tr>
                        <th>Materia</th>
                        <th>Parcial 1</th>
                        <th>Parcial 2</th>
                        <th>Parcial 3</th>
                        <th>Promedio Final</th>
                    </tr>
                </thead>

                <tbody>
                    {calificaciones.map((cal) => (
                        <tr key={cal._id} className="border-b text-center">
                            <td className="py-2 px-4 font-semibold">
                                {cal.materia}
                            </td>

                            <td className="py-2 px-4 text-sm">
                                {cal.parcial1.promedio}
                            </td>

                            <td className="py-2 px-4 text-sm">
                                {cal.parcial2.promedio}
                            </td>

                            <td className="py-2 px-4 text-sm">
                                {cal.parcial3.promedio}
                            </td>

                            <td className="py-2 px-4 font-bold text-blue-900">
                                {cal.promedioFinal}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
