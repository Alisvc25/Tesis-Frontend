import { Outlet } from "react-router-dom";
import Sidebar from "../components/ui/Sidebar.jsx";

export default function DocenteLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
