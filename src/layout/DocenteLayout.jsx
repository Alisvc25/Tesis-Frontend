import Sidebar from "../components/ui/Sidebar.jsx";

export default function DocenteLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-6 bg-gray-50">{children}</main>
            </div>
        </div>
    );
}
