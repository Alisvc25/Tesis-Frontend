import { useEffect, useState } from "react";
import { adminApi } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";


export default function ListarEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");


    useEffect(() => {
        adminApi.listarEstudiantes(token).then(setEstudiantes);
    }, []);


    const eliminar = async (id) => {
        if (confirm("¿Eliminar estudiante?")) {
            await adminApi.eliminarEstudiante(id, token);
            setEstudiantes(estudiantes.filter(d => d._id !== id));
        }
    };


    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Estudiantes</h1>
            <table className="w-full border">
                <thead className="bg-gray-200">
                    <tr>
                        <th>Nombre</th><th>Email</th><th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantes.map(d => (
                        <tr key={d._id} className="border">
                            <td>{d.nombre}</td>
                            <td>{d.email}</td>
                            <td className="flex gap-2">
                                <button onClick={() => navigate(`/admin/estudiante/${d._id}`)}>👁</button>
                                <button onClick={() => navigate(`/admin/estudiante/editar/${d._id}`)}>✏️</button>
                                <button onClick={() => eliminar(d._id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}