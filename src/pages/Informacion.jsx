export default function Informacion() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero / Header */}
            <header className="bg-blue-900 text-white py-16">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”
                    </h1>
                    <p className="text-lg md:text-xl">
                        Formación de estudiantes con valores, identidad cultural y excelencia académica.
                    </p>
                </div>
            </header>

            {/* Misión */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Misión</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        La misión de nuestra institución es formar estudiantes competentes, éticos y responsables,
                        promoviendo la interculturalidad, bilingüismo y el desarrollo integral de cada persona.
                    </p>
                </div>
            </section>

            {/* Visión */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Visión</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Ser una institución reconocida por la excelencia académica y la formación integral,
                        promoviendo valores interculturales y bilingües, y contribuyendo al desarrollo de la comunidad.
                    </p>
                </div>
            </section>

            {/* Historia */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Historia</h2>
                    <p className="text-gray-700 text-lg leading-relaxed mb-4">
                        La Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña” fue fundada con el propósito
                        de brindar educación de calidad a estudiantes de diversas culturas, fomentando el respeto,
                        la identidad y la inclusión.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        A lo largo de los años, se ha consolidado como un referente en educación intercultural y bilingüe,
                        combinando métodos tradicionales con innovación pedagógica para el desarrollo integral de los estudiantes.
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-blue-900 text-white py-6 mt-12">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <p>© 2025 Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}
