import AdminMenu from "../components/admin/AdminMenu.jsx";

export default function AdminDashboard() {
    return (
        <div>
            <AdminMenu />
            <div className="mt-6">
                <p className="text-gray-700 mt-2">
                    Aquí puedes registrar docentes y estudiantes, y administrar la información.
                </p>
            </div>
        </div>
    );
}
