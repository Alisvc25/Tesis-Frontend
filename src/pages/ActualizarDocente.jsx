import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { adminApi } from "../api/adminApi.js";

export default function ActualizarDocente() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [form, setForm] = useState({ nombre: "", email: "" });

    useEffect(() => {
        adminApi.visualizarDocente(id, token).then(d => setForm(d));
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        await adminApi.actualizarDocente(id, form, token);
        navigate("/admin/docente");
    };

    return (
        <form onSubmit={submit} className="p-6 space-y-4">
            <input value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="form-input" />
            <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="form-input" />
            <button className="bg-blue-900 text-white px-4 py-2 rounded">Guardar</button>
        </form>
    );
}