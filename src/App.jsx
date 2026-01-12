import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Informacion from "./pages/Informacion.jsx";
import RegistrarAdmin from "./pages/RegistrarAdmin.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Navbar from "./components/ui/Navbar.jsx";
import Footer from "./components/ui/Footer.jsx";
import PoliticaTerminos from "./pages/PoliticaTerminos.jsx";
import Noticias from "./pages/NoticiasEventos.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Academico from "./pages/Academico.jsx";

import AdminDashboard from "./pages/AdminDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import RecuperarPassword from "./pages/RecuperarPassword.jsx";
import NuevoPassword from "./pages/NuevoPassword.jsx";

import RegistrarDocente from "./pages/RegistrarDocente.jsx";
import ListarDocentes from "./pages/ListarDocentes.jsx";
import ActualizarDocente from "./pages/ActualizarDocente.jsx";
import VerDocente from "./pages/VerDocente.jsx";

import RegistrarEstudiante from "./pages/RegistrarEstudiante.jsx";
import ListarEstudiantes from "./pages/ListarEstudiantes.jsx";
import ActualizarEstudiante from "./pages/ActualizarEstudiante.jsx";
import VerEstudiante from "./pages/VerEstudiante.jsx";

import CrearCalificacion from "./pages/CrearCalificacion.jsx";
import ListarCalificaciones from "./pages/ListarCalificaciones.jsx";
import Perfil from "./pages/Perfil.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import AdminLayout from "./layout/AdminLayout.jsx";
import DocenteLayout from "./layout/DocenteLayout.jsx";
import EstudianteLayout from "./layout/EstudianteLayout.jsx";
import Calificaciones from "./pages/Calificaciones.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/informacion" element={<Informacion />} />
        <Route path="/politica" element={<PoliticaTerminos />} />
        <Route path="/terminos" element={<PoliticaTerminos />} />
        <Route path="/noticias" element={<Noticias />} />
        <Route path="/sobre-nosotros" element={<Nosotros />} />
        <Route path="/academico" element={<Academico />} />
        <Route path="/registro" element={<RegistrarAdmin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/recuperar-password" element={<RecuperarPassword />} />
        <Route path="/recuperar-password/:token" element={<NuevoPassword />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="administrador">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="registrar-docente" element={<RegistrarDocente />} />
          <Route path="listar-docentes" element={<ListarDocentes />} />
          <Route path="actualizar-docente/:id" element={<ActualizarDocente />} />
          <Route path="ver-docente/:id" element={<VerDocente />} />

          <Route path="registrar-estudiante" element={<RegistrarEstudiante />} />
          <Route path="listar-estudiantes" element={<ListarEstudiantes />} />
          <Route path="actualizar-estudiante/:id" element={<ActualizarEstudiante />} />
          <Route path="ver-estudiante/:id" element={<VerEstudiante />} />


        </Route>

        <Route
          path="/docente/*"
          element={
            <ProtectedRoute role="docente">
              <DocenteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DocenteDashboard />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="crear-calificacion" element={<CrearCalificacion />} />
          <Route path="listar-calificaciones" element={<ListarCalificaciones />} />
        </Route>

        <Route
          path="/estudiante/*"
          element={
            <ProtectedRoute role="estudiante">
              <EstudianteLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EstudianteDashboard />} />
          <Route path="mis-calificaciones" element={<Calificaciones />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
}

export default App;
