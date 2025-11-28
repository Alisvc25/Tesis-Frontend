export default function Informacion() {
    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-900">
                Información de la Unidad Educativa
            </h1>

            <img
                src="/images/colegio.jpg"
                alt="Unidad Educativa"
                className="mx-auto rounded-lg shadow-lg w-96 mb-6"
            />

            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
                Bienvenido al sistema académico de la Unidad Educativa Intercultural
                Bilingüe “Tránsito Amaguaña”. Aquí podrás conocer más sobre nuestra misión,
                visión y algunos aspectos importantes de nuestra institución.
            </p>

            {/* MISIÓN */}
            <img
                src="/images/mision.jpg"
                alt="Unidad Educativa"
                className="mx-auto rounded-lg shadow-lg w-96 mb-6"
            />
            <section className="max-w-3xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">Misión</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Formar estudiantes con valores, conocimientos y competencias académicas
                    sólidas, promoviendo el respeto a la diversidad cultural y lingüística.
                    Nuestra institución impulsa una educación inclusiva, participativa y 
                    orientada al desarrollo integral de la comunidad educativa.
                </p>
            </section>

            {/* VISIÓN */}
            <img
                src="/images/vision.jpg"
                alt="Unidad Educativa"
                className="mx-auto rounded-lg shadow-lg w-96 mb-6"
            />
            <section className="max-w-3xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">Visión</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Ser una institución educativa referente en el país por su excelencia
                    académica, su compromiso intercultural y el fortalecimiento de la identidad.
                    Aspiramos a formar generaciones capaces de transformar positivamente su entorno
                    con responsabilidad social y sentido comunitario.
                </p>
            </section>

            {/* DATO CURIOSO */}
            <img
                src="/images/transito.jpg"
                alt="Unidad Educativa"
                className="mx-auto rounded-lg shadow-lg w-96 mb-6"
            />
            <section className="max-w-3xl mx-auto mb-10">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">Dato Curioso</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                    ¿Sabías que la Unidad Educativa “Tránsito Amaguaña” lleva el nombre de una de 
                    las lideresas indígenas más importantes del Ecuador? Tránsito Amaguaña fue una 
                    defensora incansable de los derechos de los pueblos indígenas, y su legado inspira 
                    a nuestra comunidad educativa hasta el día de hoy.
                </p>
            </section>
        </div>
    );
}
