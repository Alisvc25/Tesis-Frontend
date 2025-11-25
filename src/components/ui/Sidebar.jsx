import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ menu }) {
    const { pathname } = useLocation();

    return (
        <aside className="w-64 bg-blue-700 text-white min-h-screen p-4">
            <nav className="space-y-3">
                {menu.map((item, index) => (
                    <Link
                        key={index}
                        to={item.to}
                        className={`block p-2 rounded hover:bg-blue-500 ${pathname === item.to ? "bg-blue-500" : ""
                            }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
