import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function NuevoPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(
            `${import.meta.env.VITE_API_URL}/recuperarpassword/${token}`,
            { password, confirmpassword }
        );
        alert("Contraseña actualizada");
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Nueva contraseña</h2>

            <input
                type="password"
                placeholder="Nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Confirmar contraseña"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button type="submit">Guardar</button>
        </form>
    );
}
