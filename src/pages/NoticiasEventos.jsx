export default function Noticias() {
    const noticias = [
        {
            id: 1,
            titulo: "Celebración del Inti Raymi 2025",
            fecha: "21 de Junio 2025",
            descripcion:
                "La comunidad educativa realizó la tradicional celebración del Inti Raymi, honrando al sol y agradeciendo la energía que brinda vida y armonía. Estudiantes participaron en danzas, rituales simbólicos y presentaciones culturales.",
            imagen:
                "https://images.unsplash.com/photo-1597781898192-4c2aaca5f05d?auto=format&fit=crop&w=900&q=60"
        },
        {
            id: 2,
            titulo: "Fiesta del Pawkar Raymi",
            fecha: "1 de Marzo 2025",
            descripcion:
                "La Unidad Educativa celebró el Pawkar Raymi, la fiesta del florecimiento, con actividades comunitarias, exposiciones artísticas y presentaciones que resaltan la cosmovisión indígena.",
            imagen:
                "https://images.unsplash.com/photo-1484557985045-edf25e08da73?auto=format&fit=crop&w=900&q=60"
        },
        {
            id: 3,
            titulo: "Día de la Interculturalidad",
            fecha: "12 de Octubre 2025",
            descripcion:
                "Estudiantes de todos los cursos compartieron muestras gastronómicas, artesanías, música ancestral y vestimenta tradicional en honor a la diversidad cultural.",
            imagen:
                "https://images.unsplash.com/photo-1606326608606-845428a6fe41?auto=format&fit=crop&w=900&q=60"
        },
        {
            id: 4,
            titulo: "Jornada Académica 2025",
            fecha: "5 de Septiembre 2025",
            descripcion:
                "Se llevó a cabo la jornada académica institucional, con exposiciones sobre ciencias, matemáticas, cultura y tecnología preparadas por los estudiantes.",
            imagen:
                "https://images.unsplash.com/photo-1519455953755-af066f52f1ea?auto=format&fit=crop&w=900&q=60"
        },
        {
            id: 5,
            titulo: "Taller de Música y Danza Ancestral",
            fecha: "18 de Noviembre 2025",
            descripcion:
                "Los estudiantes participaron en un taller especial sobre música y danza andina, aprendiendo la importancia espiritual y comunitaria de estas expresiones.",
            imagen:
                "https://images.unsplash.com/photo-1595435934249-5e7f1a714bc8?auto=format&fit=crop&w=900&q=60"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-6">
            <div className="max-w-6xl mx-auto">
                
                <h1 className="text-4xl font-bold text-center text-[#0f2466] mb-12">
                    Noticias y Eventos Institucionales
                </h1>

                {/* Grid de tarjetas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {noticias.map((n) => (
                        <div
                            key={n.id}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={n.imagen}
                                alt={n.titulo}
                                className="h-48 w-full object-cover"
                            />

                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-[#0f2466]">{n.titulo}</h3>
                                <p className="text-sm text-gray-500 mb-2">{n.fecha}</p>
                                <p className="text-gray-700 mb-4">{n.descripcion}</p>

                                <button className="text-blue-700 font-semibold hover:underline">
                                    Leer más →
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
