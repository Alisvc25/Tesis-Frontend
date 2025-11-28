import { Link } from "react-router-dom";
import { FaFacebookF, FaWhatsapp , FaTiktok, FaYoutube } from "react-icons/fa";


export default function Footer() {
    return (
        <footer className="bg-[#0f2466] text-white mt-12">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h4 className="font-semibold mb-3">Contactanos</h4>
                    <ul className="text-sm text-blue-100 space-y-2">
                        <li>📍 PFH8+38Q, Quito 170148</li>
                        <li>📞 +593 99 531 5840</li>
                        <li>✉️ info@transitoamaguaña@gmail.com</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Enlaces Rápidos</h4>
                    <ul className="text-sm text-blue-100 space-y-2">
                        <li><Link to="/sobre-nosotros" className="hover:underline">Sobre Nosotros</Link></li>
                        <li><Link to="/programas" className="hover:underline">Programas Académicos</Link></li>
                        <li><Link to="/noticias" className="hover:underline">Noticias y Eventos</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-semibold mb-3">Síguenos</h4>
                    <p className="text-sm text-blue-100 mb-4">Mantente conectado con nosotros en nuestras redes sociales</p>
                    <div className="flex space-x-3">
                        <a
                            className="bg-blue-700 p-2 rounded-full text-white text-xl"
                            href="https://www.facebook.com/profile.php?id=100054318289927&locale=es_LA"
                            aria-label="facebook"
                            target="_blank"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            className="bg-blue-700 p-2 rounded-full text-white text-xl"
                            href="+593 99 531 5840"
                            aria-label="whatsapp"
                            target="_blank"
                        >
                            <FaWhatsapp />
                        </a>

                        <a
                            className="bg-blue-700 p-2 rounded-full text-white text-xl"
                            href="https://www.tiktok.com/@transito.amaguaa?is_from_webapp=1&sender_device=pc"
                            aria-label="tiktok"
                            target="_blank"
                        >
                            <FaTiktok />
                        </a>

                        <a
                            className="bg-blue-700 p-2 rounded-full text-white text-xl"
                            href="https://youtube.com/@ueibtransitoamaguana?si=oMwNn2aE647CXTA9"
                            aria-label="youtube"
                            target="_blank"
                        >
                            <FaYoutube />
                        </a>
                    </div>
                </div>
            </div>

            <div className="border-t border-blue-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between text-sm text-blue-100">
                    <div>© 2025 U.E.I.B. Tránsito Amaguaña. Todos los derechos reservados.</div>
                    <div className="space-x-4">
                        <Link to="/politica" className="hover:underline">Política de Privacidad</Link>
                        <Link to="/terminos" className="hover:underline">Términos de Uso</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
