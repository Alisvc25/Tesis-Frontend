import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth.jsx";

export default function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isActive = (path) => location.pathname === path;
    const handleLogout = () => {
        logout();
        navigate("/") ;
    };


    return (
        <nav className="bg-blue-900 text-white py-4 shadow-lg">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                <h2 className="font-semibold text-lg">
                    Unidad Educativa Intercultural Bilingüe Tránsito Amaguaña
                </h2>

                <ul className="flex space-x-6 font-medium items-center">
                    <li>
                        <Link to="/" className={isActive('/') ? 'underline font-semibold' : 'hover:underline'}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/informacion" className={isActive('/informacion') ? 'underline font-semibold' : 'hover:underline'}>Información</Link>
                    </li>
                    <li>
                        <Link to="/sobre-nosotros" className={isActive('/sobre-nosotros') ? 'underline font-semibold' : 'hover:underline'}>Sobre Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/noticias" className={isActive('/noticias') ? 'underline font-semibold' : 'hover:underline'}>Noticias y Eventos</Link>
                    </li>
                </ul>



                    {user && (
                        <>
                            <div className="text-sm mr-2">{user.nombre ?? user.name ?? ''} {user.apellido ?? ''} ({user.role})</div>
                            <Link to="/"><button onClick={handleLogout} className="bg-white text-blue-900 px-3 py-1 rounded text-sm font-medium">Salir</button></Link>
                        </>
                    )}
                </div>
        </nav>
    );
}
