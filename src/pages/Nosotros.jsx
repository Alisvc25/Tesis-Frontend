export default function SobreNosotros() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <br />

            <div className="max-w-5xl mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">
                    Sobre Nosotros
                </h1>
                <p className="mt-4 text-lg md:text-xl opacity-90">
                    Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”
                </p>
            </div>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-12">

                <section>
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">
                        Nuestra Historia
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        La Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña”
                        nació como un espacio de aprendizaje pensado para fortalecer
                        la identidad cultural y el desarrollo educativo de la comunidad.
                        Desde sus inicios, la institución ha trabajado por brindar una educación
                        que respete y valore los saberes ancestrales del pueblo indígena.
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Con el paso de los años, nuestra escuelita ha crecido gracias al esfuerzo
                        conjunto de docentes, estudiantes, padres de familia y líderes comunitarios,
                        quienes han mantenido vivo el espíritu de solidaridad, respeto y unión.
                        Nuestros pasillos, aulas y patios han sido hogar de generaciones de niños y
                        jóvenes que han aprendido no solo conocimientos académicos, sino también
                        la importancia de la identidad, la lengua, el trabajo comunitario y la
                        cosmovisión andina.
                    </p>

                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        La institución lleva el nombre de **Tránsito Amaguaña** como homenaje
                        a su lucha incansable por la educación, los derechos y la dignidad del
                        pueblo indígena. Su legado inspira cada día nuestras actividades, celebraciones
                        culturales y el profundo compromiso por una educación inclusiva y respetuosa.
                    </p>
                </section>

                <section className="bg-white p-8 rounded-2xl shadow-md border">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">
                        Tradiciones que Nos Identifican
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Nuestra unidad educativa celebra con orgullo festividades ancestrales
                        como el **Inti Raymi**, el **Pawkar Raymi** y diversas ceremonias que
                        honran a la Pachamama, fortaleciendo el sentido de pertenencia y el
                        respeto por nuestras raíces culturales.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Cada celebración integra música, danza, vestimenta tradicional y
                        saberes transmitidos por generaciones, convirtiendo a la escuela
                        en un espacio donde el conocimiento académico convive en armonía
                        con la riqueza cultural de nuestro pueblo.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">
                        Compromiso con la Comunidad
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        La escuelita ha sido, desde siempre, un punto de encuentro para la
                        comunidad. Más que un centro educativo, es un espacio de
                        acompañamiento, participación y trabajo conjunto donde se construyen
                        lazos que fortalecen el bienestar de todos.
                    </p>
                    <p className="text-gray-700 text-lg leading-relaxed mt-4">
                        Nuestro compromiso es seguir creciendo, aprendiendo y honrando
                        la memoria de nuestros antepasados, ofreciendo una educación con
                        identidad que impulse a cada estudiante a soñar y alcanzar un futuro
                        lleno de posibilidades.
                    </p>
                </section>

            </main>

        </div>
    );
}
