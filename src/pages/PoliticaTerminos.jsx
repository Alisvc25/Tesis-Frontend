export default function PoliticaTerminos() {
    return (
        <div className="p-10 max-w-4xl mx-auto text-gray-800">

            <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">
                Política de Privacidad y Términos de Uso
            </h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                    Política de Privacidad
                </h2>

                <p className="mb-4">
                    La Unidad Educativa Intercultural Bilingüe “Tránsito Amaguaña” se 
                    compromete a proteger la privacidad de toda la información personal
                    proporcionada por los usuarios del sistema académico.
                </p>

                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        Los datos personales de administradores, docentes y estudiantes 
                        serán utilizados exclusivamente con fines administrativos y académicos.
                    </li>
                    <li>
                        No compartimos información con terceros salvo cuando sea requerido 
                        por la ley o con autorización explícita del usuario.
                    </li>
                    <li>
                        Toda la información almacenada se maneja de forma segura y 
                        únicamente el personal autorizado tiene acceso a ella.
                    </li>
                    <li>
                        El usuario puede solicitar la actualización o eliminación de sus 
                        datos siguiendo los procedimientos establecidos por la institución.
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-blue-800 mb-3">
                    Términos de Uso
                </h2>

                <p className="mb-4">
                    Al acceder y utilizar este sistema académico, el usuario acepta los
                    siguientes términos y condiciones:
                </p>

                <ul className="list-disc ml-6 space-y-2">
                    <li>
                        El acceso está restringido a usuarios autorizados (administradores,
                        docentes y estudiantes).
                    </li>
                    <li>
                        El administrador es el único responsable de registrar nuevos usuarios 
                        dentro del sistema.
                    </li>
                    <li>
                        Cada usuario es responsable de mantener la confidencialidad de sus 
                        credenciales de acceso.
                    </li>
                    <li>
                        Está prohibido modificar, manipular o intentar vulnerar el sistema 
                        en cualquier forma.
                    </li>
                    <li>
                        El uso de la plataforma debe ser estrictamente académico y de acuerdo 
                        con las normas institucionales.
                    </li>
                    <li>
                        La institución puede suspender o retirar el acceso en caso de mal uso 
                        o incumplimiento.
                    </li>
                </ul>
            </section>

            <section className="bg-blue-50 p-5 rounded-lg shadow mt-10">
                <p className="text-center text-gray-700 text-lg">
                    Si tienes dudas sobre la Política de Privacidad o los Términos de Uso,
                    puedes comunicarte con la administración de la Unidad Educativa.
                </p>
            </section>
        </div>
    );
}
