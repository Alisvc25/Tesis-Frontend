import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";

import Login from "../pages/Login.jsx";

vi.mock("axios");

const mockLogin = vi.fn();
vi.mock("../context/useAuth.jsx", () => ({
    default: () => ({ login: mockLogin }),
}));

vi.mock("../components/ui/Loader.jsx", () => ({
    default: () => <span>Loading...</span>,
}));
vi.mock("../components/ui/ErrorAlert.jsx", () => ({
    default: ({ message }) => <div role="alert">{message}</div>,
}));

const mockNavigate = vi.fn();
let mockSearch = "";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({ search: mockSearch }),
    };
});

describe("Login.jsx", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockSearch = "";

        Object.defineProperty(import.meta, "env", {
            value: { VITE_BACKEND_URL: "https://tesis-j3s3.onrender.com" },
            configurable: true,
        });
    });

    const getInputs = (container) => {
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        return { emailInput, passwordInput };
    };

    test("1) Renderiza título e inputs", () => {
        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByRole("heading", { name: "Iniciar Sesión" })).toBeInTheDocument();

        const { emailInput, passwordInput } = getInputs(container);
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        expect(screen.getByRole("button", { name: "Iniciar Sesión" })).toBeInTheDocument();
    });

    test("2) Login ADMIN: usa /administrador/login y navega a /admin", async () => {
        mockSearch = "?role=administrador";
        axios.post.mockResolvedValueOnce({
            data: { token: "token_admin", rol: "administrador" },
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const { emailInput, passwordInput } = getInputs(container);

        await userEvent.type(emailInput, "admin@test.com");
        await userEvent.type(passwordInput, "123456");
        await userEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

        const base = import.meta.env.VITE_BACKEND_URL;

        expect(axios.post).toHaveBeenCalledWith(
            `${base}/administrador/login`,
            { email: "admin@test.com", password: "123456" }
        );

        expect(mockLogin).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith("/admin");
    });

    test("3) Login DOCENTE: usa /apiD/login y navega a /docente", async () => {
        mockSearch = "?role=docente";
        axios.post.mockResolvedValueOnce({
            data: { token: "token_doc", rol: "docente" },
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const { emailInput, passwordInput } = getInputs(container);

        await userEvent.type(emailInput, "doc@test.com");
        await userEvent.type(passwordInput, "123456");
        await userEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

        const base = import.meta.env.VITE_BACKEND_URL;

        expect(axios.post).toHaveBeenCalledWith(
            `${base}/apiD/login`,
            { email: "doc@test.com", password: "123456" }
        );

        expect(mockNavigate).toHaveBeenCalledWith("/docente");
    });

    test("4) Login ESTUDIANTE: usa /apiE/login y navega a /estudiante", async () => {
        mockSearch = "?role=estudiante";
        axios.post.mockResolvedValueOnce({
            data: { token: "token_est", rol: "estudiante" },
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const { emailInput, passwordInput } = getInputs(container);

        await userEvent.type(emailInput, "est@test.com");
        await userEvent.type(passwordInput, "123456");
        await userEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

        const base = import.meta.env.VITE_BACKEND_URL;

        expect(axios.post).toHaveBeenCalledWith(
            `${base}/apiE/login`,
            { email: "est@test.com", password: "123456" }
        );

        expect(mockNavigate).toHaveBeenCalledWith("/estudiante");
    });

    test("5) Si el backend responde error, muestra ErrorAlert con msg", async () => {
        mockSearch = "?role=administrador";
        axios.post.mockRejectedValueOnce({
            response: { data: { msg: "Credenciales inválidas" } },
        });

        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        const { emailInput, passwordInput } = getInputs(container);

        await userEvent.type(emailInput, "admin@test.com");
        await userEvent.type(passwordInput, "mal");
        await userEvent.click(screen.getByRole("button", { name: "Iniciar Sesión" }));

        expect(await screen.findByRole("alert")).toHaveTextContent("Credenciales inválidas");
    });

    test("6) Botón ojo alterna tipo password/text", async () => {
        const { container } = render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(container.querySelector('input[type="password"]')).toBeInTheDocument();

        const eyeBtn = container.querySelector('button[type="button"]');
        expect(eyeBtn).toBeInTheDocument();

        await userEvent.click(eyeBtn);

        expect(container.querySelector('input[type="text"]')).toBeInTheDocument();
    });
});
