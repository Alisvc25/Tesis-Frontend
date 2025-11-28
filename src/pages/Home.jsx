import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">

            {/* HEADER CON IMAGEN DE FONDO */}
            <header
                className="relative bg-blue-900 text-white py-20 text-center shadow-lg bg-cover bg-center"
                style={{ backgroundImage: "url('/images/portada.jpg')" }}
            >
                {/* Capa oscura para mejorar contraste */}
                <div className="absolute inset-0 bg-black/40"></div>

¿                <div className="relative z-10">
                    <h1 className="text-4xl font-bold">
                        Unidad Educativa Intercultural Bilingüe
                    </h1>
                    <h2 className="text-2xl font-semibold mt-2">“Tránsito Amaguaña”</h2>
                </div>
            </header>

            <main className="p-10 max-w-4xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-4">
                    Bienvenidos al Sistema Académico Institucional
                </h2>

                <p className="text-lg text-gray-700">
                    Este sistema permite la gestión académica de docentes, estudiantes y administradores...
                </p>

                <section className="mt-10">
                    <h3 className="text-xl font-semibold mb-4">Selecciona tu perfil</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Link to="/login?role=administrador" className="block bg-white rounded-lg shadow hover:shadow-md p-6">
                            <h4 className="text-lg font-semibold">Administrador</h4>
                            <p className="text-sm text-gray-600 mt-2">Accede como administrador</p>
                        </Link>

                        <Link to="/login?role=docente" className="block bg-white rounded-lg shadow hover:shadow-md p-6">
                            <h4 className="text-lg font-semibold">Docente</h4>
                            <p className="text-sm text-gray-600 mt-2">Accede como docente</p>
                        </Link>

                        <Link to="/login?role=estudiante" className="block bg-white rounded-lg shadow hover:shadow-md p-6">
                            <h4 className="text-lg font-semibold">Estudiante</h4>
                            <p className="text-sm text-gray-600 mt-2">Accede como estudiante</p>
                        </Link>
                    </div>
                </section>

                <img
                    src="/images/directora.jpg"
                    alt=""
                    className="mx-auto mt-8 rounded-lg shadow-lg w-3/4"
                />
            </main>
        </div>
    );
}
