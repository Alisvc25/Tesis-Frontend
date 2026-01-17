import { vi } from "vitest";
import axios from "axios";

vi.mock("axios", () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
    },
}));

describe("APIs - axios calls", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        Object.defineProperty(import.meta, "env", {
            value: { VITE_BACKEND_URL: "https://tesis-j3s3.onrender.com" },
            configurable: true,
        });
    });

    test("1) adminApi.registrarAdmin usa /administrador/registro", async () => {
        const { adminApi } = await import("../api/adminApi.js");
        axios.post.mockResolvedValueOnce({ data: { ok: true } });

        await adminApi.registrarAdmin({ nombre: "A" });

        const base = import.meta.env.VITE_BACKEND_URL;
        expect(axios.post).toHaveBeenCalledWith(
            `${base}/administrador/registro`,
            { nombre: "A" }
        );
    });

    test("2) adminApi.registrarDocente envía Authorization Bearer", async () => {
        const { adminApi } = await import("../api/adminApi.js");
        axios.post.mockResolvedValueOnce({ data: { ok: true } });

        await adminApi.registrarDocente({ nombre: "Doc" }, "TOKEN123");

        const base = import.meta.env.VITE_BACKEND_URL;
        expect(axios.post).toHaveBeenCalledWith(
            `${base}/administrador/registroDocente`,
            { nombre: "Doc" },
            { headers: { Authorization: "Bearer TOKEN123" } }
        );
    });

    test("3) docenteApi.crearCalificacion usa /apiD/calificacion con token", async () => {
        const { docenteApi } = await import("../api/docenteApi.js");
        axios.post.mockResolvedValueOnce({ data: { ok: true } });

        await docenteApi.crearCalificacion({ materia: "Mate" }, "TOK");

        const base = import.meta.env.VITE_BACKEND_URL;
        expect(axios.post).toHaveBeenCalledWith(
            `${base}/apiD/calificacion`,
            { materia: "Mate" },
            { headers: { Authorization: "Bearer TOK" } }
        );
    });

    test("4) estudianteApi.listarCalificaciones usa /apiE/calificaciones/:id con token", async () => {
        const { estudianteApi } = await import("../api/estudianteApi.js");
        axios.get.mockResolvedValueOnce({ data: [] });

        await estudianteApi.listarCalificaciones("ID1", "TOK");

        const base = import.meta.env.VITE_BACKEND_URL;
        expect(axios.get).toHaveBeenCalledWith(
            `${base}/apiE/calificaciones/ID1`,
            { headers: { Authorization: "Bearer TOK" } }
        );
    });

    test("5) calificacionesApi.listar usa /calificaciones/listar con token", async () => {
        const { calificacionesApi } = await import("../api/calificaciones.js");
        axios.get.mockResolvedValueOnce({ data: [] });

        await calificacionesApi.listar("TOK");

        const base = import.meta.env.VITE_BACKEND_URL;
        expect(axios.get).toHaveBeenCalledWith(
            `${base}/calificaciones/listar`,
            { headers: { Authorization: "Bearer TOK" } }
        );
    });
});
