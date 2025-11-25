import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function DocenteLayout() {

    const menu = [
        { label: "Panel", to: "/docente" },
        { label: "Registrar Calificación", to: "/docente/calificar" },
    ];

    return (
        <div className="flex">
            <Sidebar menu={menu} />
            <div className="flex-1 min-h-screen bg-[#F4F6F9]">
                <Navbar />
                <div className="p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
