import Navbar from "../components/ui/Navbar";
import Sidebar from "../components/ui/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {

    const menu = [
        { label: "Panel", to: "/admin" },
        { label: "Registrar Docente", to: "/admin/registrar-docente" },
        { label: "Registrar Estudiante", to: "/admin/registrar-estudiante" },
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
