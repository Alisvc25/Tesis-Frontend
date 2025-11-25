import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Informacion from "./pages/Informacion";
import Login from "./pages/Login";

// Admin
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminRegister from "./pages/AdminRegister";
import EstudianteRegister from "./pages/EstudianteRegister";
import AdminLayout from "./layout/AdminLayout";

// Docente
import DocenteLayout from "./layout/DocenteLayout";
import DocenteDashboard from "./pages/DocenteDashboard";
import CalificacionesCreate from "./pages/CalificacionesCreate";

// Estudiante
import EstudianteLayout from "./layout/EstudianteLayout";
import EstudianteDashboard from "./pages/EstudianteDashboard";
import CalificacionesList from "./pages/CalificacionesList";

// Otros
import Confirm from "./pages/Confirm";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/login" element={<Login />} />

        {/* ---------- ADMIN ---------- */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/registrar-docente" element={<AdminRegister />} />
          <Route path="/admin/registrar-estudiante" element={<EstudianteRegister />} />
        </Route>

        {/* ---------- DOCENTE ---------- */}
        <Route element={<DocenteLayout />}>
          <Route path="/docente" element={<DocenteDashboard />} />
          <Route path="/docente/calificar" element={<CalificacionesCreate />} />
        </Route>

        {/* ---------- ESTUDIANTE ---------- */}
        <Route element={<EstudianteLayout />}>
          <Route path="/estudiante" element={<EstudianteDashboard />} />
          <Route path="/estudiante/calificaciones" element={<CalificacionesList />} />
        </Route>

        <Route path="/confirm/:token" element={<Confirm />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
