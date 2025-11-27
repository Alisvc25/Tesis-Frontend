// src/pages/Home.jsx
import { useState } from "react";
import Navbar from "../components/ui/Navbar";

export default function Home() {
    const [selectedPerfil, setSelectedPerfil] = useState(null);

    const handleSelectPerfil = (perfil) => {
        setSelectedPerfil(perfil);
        if (perfil === "Administrador") {
            // Redirigir a login o registro según tu lógica
            window.location.href = "/login";
        } else {
            // Redirigir al login de docente o estudiante
            window.location.href = "/login";
        }
    };

    return (
        <div>
            <Navbar onSelectPerfil={handleSelectPerfil} />
            <div className="text-center mt-20">
                {!selectedPerfil ? (
                    <h2 className="text-2xl font-bold">
                        Por favor selecciona tu perfil en el menú
                    </h2>
                ) : (
                    <h2 className="text-2xl font-bold">
                        Has seleccionado: {selectedPerfil}
                    </h2>
                )}
            </div>
            <footer className="bg-blue-900 text-white text-center p-4 mt-20">
                © 2025 Unidad Educativa Intercultural Bilingüe "Tránsito Amaguaña". Todos los derechos reservados.
            </footer>
        </div>
    );
}
