import { useState } from "react";
import axios from "axios";

export default function RecuperarPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            `${import.meta.env.VITE_API_URL}/recuperarpassword`,
            { email }
        );
        alert("Revisa tu correo");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Recuperar contraseña</h2>

            <input
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <button type="submit">Enviar</button>
        </form>
    );
}
