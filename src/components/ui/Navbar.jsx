import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../../context/useAuth.jsx";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate("/", { replace: true });
    };

    const linkClass = (path) =>
        isActive(path)
            ? "underline font-semibold"
            : "hover:underline";

    return (
        <nav className="bg-blue-900 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                {/* Top bar */}
                <div className="flex items-center justify-between gap-3">
                    {/* Título: en móvil se acorta a 2 líneas */}
                    <h2 className="font-semibold text-sm sm:text-lg leading-tight">
                        Unidad Educativa Intercultural <br className="sm:hidden" />
                        Bilingüe Tránsito Amaguaña
                    </h2>

                    {/* Menú desktop */}
                    <ul className="hidden md:flex space-x-6 font-medium items-center">
                        <li>
                            <Link to="/" className={linkClass("/")}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/informacion" className={linkClass("/informacion")}>Información</Link>
                        </li>
                        <li>
                            <Link to="/sobre-nosotros" className={linkClass("/sobre-nosotros")}>Sobre Nosotros</Link>
                        </li>
                        <li>
                            <Link to="/noticias" className={linkClass("/noticias")}>Noticias y Eventos</Link>
                        </li>
                    </ul>

                    {/* Zona derecha desktop (usuario + salir) */}
                    {user && (
                        <div className="hidden md:flex items-center gap-3">
                            <div className="text-sm whitespace-nowrap">
                                {user.nombre ?? user.name ?? ""} {user.apellido ?? ""} ({user.role})
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-blue-900 px-3 py-1 rounded text-sm font-medium"
                            >
                                Salir
                            </button>
                        </div>
                    )}

                    {/* Botón hamburguesa (solo móvil) */}
                    <button
                        className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-white/10"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Abrir menú"
                    >
                        <span className="text-xl">{open ? "✕" : "☰"}</span>
                    </button>
                </div>

                {/* Menú móvil desplegable */}
                {open && (
                    <div className="md:hidden mt-3 border-t border-white/10 pt-3">
                        <ul className="flex flex-col gap-2 font-medium">
                            <li>
                                <Link
                                    to="/"
                                    className={linkClass("/")}
                                    onClick={() => setOpen(false)}
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/informacion"
                                    className={linkClass("/informacion")}
                                    onClick={() => setOpen(false)}
                                >
                                    Información
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/sobre-nosotros"
                                    className={linkClass("/sobre-nosotros")}
                                    onClick={() => setOpen(false)}
                                >
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/noticias"
                                    className={linkClass("/noticias")}
                                    onClick={() => setOpen(false)}
                                >
                                    Noticias y Eventos
                                </Link>
                            </li>

                            {user && (
                                <li className="pt-2 border-t border-white/10">
                                    <div className="text-sm mb-2">
                                        {user.nombre ?? user.name ?? ""} {user.apellido ?? ""} ({user.role})
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="bg-white text-blue-900 px-3 py-1 rounded text-sm font-medium"
                                    >
                                        Salir
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
