import EstudianteLayout from "../layout/EstudianteLayout";
import { useAuth } from "../context/useAuth";

export default function PerfilEstudiante() {
    const { user } = useAuth();

    return (
        <EstudianteLayout>
            <h1 className="dashboard-title">Mi Perfil</h1>

            <div className="dashboard-card">
                <h3>{user.nombre}</h3>
                <p>{user.email}</p>
                <p>Rol: Estudiante</p>
            </div>
        </EstudianteLayout>
    );
}
