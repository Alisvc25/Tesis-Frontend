export default function ProgramaAcademico() {
return (
<div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
        Programa Académico
    </h1>

    <p className="text-gray-700 mb-8 text-center">
        La Unidad Educativa Intercultural Bilingüe <strong>“Tránsito Amaguaña”</strong>
        ofrece una formación integral basada en valores, identidad intercultural y excelencia académica,
        desde Educación Inicial hasta Tercero de Bachillerato.
    </p>

    <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Educación Inicial
        </h2>
        <p className="text-gray-700 mb-2">
            Dirigida a niñas y niños en sus primeros años de formación, fomentando
            el desarrollo emocional, cognitivo y social.
        </p>
        <ul className="list-disc list-inside text-gray-700">
            <li>Desarrollo personal y social</li>
            <li>Lenguaje y comunicación</li>
            <li>Expresión artística</li>
            <li>Motricidad fina y gruesa</li>
            <li>Valores y convivencia</li>
        </ul>
    </section>

    <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Educación General Básica
        </h2>
        <p className="text-gray-700 mb-2">
            Comprende desde Primero hasta Décimo año, fortaleciendo conocimientos
            fundamentales y pensamiento crítico.
        </p>
        <ul className="list-disc list-inside text-gray-700">
            <li>Lengua y Literatura</li>
            <li>Matemática</li>
            <li>Ciencias Naturales</li>
            <li>Estudios Sociales</li>
            <li>Educación Cultural y Artística</li>
            <li>Educación Física</li>
            <li>Inglés</li>
            <li>Valores e interculturalidad</li>
        </ul>
    </section>

    <section className="mb-6">
        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
            Bachillerato General Unificado
        </h2>
        <p className="text-gray-700 mb-2">
            Prepara a los estudiantes para la educación superior y la vida profesional,
            promoviendo la responsabilidad social y el pensamiento analítico.
        </p>
        <ul className="list-disc list-inside text-gray-700">
            <li>Lengua y Literatura</li>
            <li>Matemática</li>
            <li>Biología, Física y Química</li>
            <li>Historia y Filosofía</li>
            <li>Educación para la Ciudadanía</li>
            <li>Emprendimiento y Gestión</li>
            <li>Inglés</li>
            <li>Proyectos interdisciplinarios</li>
        </ul>
    </section>

    <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-900 rounded">
        <p className="text-blue-900 font-medium">
            Nuestro compromiso es formar estudiantes íntegros, críticos y orgullosos de su identidad,
            capaces de contribuir positivamente a la sociedad.
        </p>
    </div>
</div>
);
}