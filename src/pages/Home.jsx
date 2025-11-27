import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Hero */}
            <header className="bg-blue-900 text-white py-20">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        Formación de estudiantes con valores, identidad cultural y excelencia académica.
                    </p>
                    <Link
                        to="/informacion"
                        className="bg-white text-blue-900 font-semibold px-6 py-3 rounded hover:bg-gray-200 transition"
                    >
                        Conoce Más
                    </Link>
                </div>
            </header>

            {/* Sección de Acceso */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8">Acceso Rápido</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <Link
                            to="/login"
                            className="bg-blue-900 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-800 transition"
                        >
                            Login
                        </Link>
                        <Link
                            to="/admin"
                            className="bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Panel Administrador
                        </Link>
                        <Link
                            to="/docente"
                            className="bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Panel Docente
                        </Link>
                        <Link
                            to="/estudiante"
                            className="bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold hover:bg-blue-600 transition"
                        >
                            Panel Estudiante
                        </Link>
                    </div>
                </div>
            </section>

            {/* Noticias / Información extra */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6">Noticias y Actualizaciones</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Próximamente agregaremos noticias, eventos y anuncios importantes de la institución.
                        Esta sección ayudará a mantener informada a toda la comunidad educativa.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-6 mt-auto">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p>© 2025 Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
