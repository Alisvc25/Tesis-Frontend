// src/components/ui/Navbar.jsx
import { useState } from "react";

export default function Navbar({ onSelectPerfil }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [perfilOpen, setPerfilOpen] = useState(false);

    return (
        <nav className="bg-blue-900 text-white p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    Unidad Educativa Intercultural Bilingüe "Tránsito Amaguaña"
                </h1>
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        &#9776; {/* ícono de 3 rayitas */}
                    </button>
                </div>
                <ul className={`md:flex md:items-center ${menuOpen ? "block" : "hidden"}`}>
                    <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">Información</li>
                    <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">Sobre Nosotros</li>
                    <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">Contáctanos</li>
                    <li
                        className="px-4 py-2 hover:bg-blue-700 cursor-pointer relative"
                        onMouseEnter={() => setPerfilOpen(true)}
                        onMouseLeave={() => setPerfilOpen(false)}
                    >
                        Perfiles
                        {perfilOpen && (
                            <ul className="absolute left-0 top-full bg-white text-blue-900 shadow-md rounded w-48">
                                <li
                                    className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                                    onClick={() => onSelectPerfil("Administrador")}
                                >
                                    Administrador
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                                    onClick={() => onSelectPerfil("Docente")}
                                >
                                    Docente
                                </li>
                                <li
                                    className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                                    onClick={() => onSelectPerfil("Estudiante")}
                                >
                                    Estudiante
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    );
}
