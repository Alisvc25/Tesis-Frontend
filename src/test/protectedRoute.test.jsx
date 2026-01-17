import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";

import ProtectedRoute from "../components/ProtectedRoute.jsx";
let mockUser = null;

vi.mock("../context/useAuth.jsx", () => ({
    default: () => ({ user: mockUser }),
}));

describe("ProtectedRoute.jsx", () => {
    beforeEach(() => {
        mockUser = null;
    });

    test("1) Si no hay usuario, redirige a '/'", () => {
        mockUser = null;

        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                    <Route path="/" element={<h1>Login Page</h1>} />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute role="administrador">
                                <h1>Área Admin</h1>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });

    test("2) Si el rol no coincide, redirige a '/unauthorized'", () => {
        mockUser = { role: "docente" };

        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                    <Route path="/unauthorized" element={<h1>No autorizado</h1>} />

                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute role="administrador">
                                <h1>Área Admin</h1>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("No autorizado")).toBeInTheDocument();
    });

    test("3) Si el usuario existe y el rol coincide, muestra el contenido", () => {
        mockUser = { role: "administrador" };

        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <Routes>
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute role="administrador">
                                <h1>Área Admin</h1>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText("Área Admin")).toBeInTheDocument();
    });
});
