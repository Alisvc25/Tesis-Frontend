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

// Dashboards
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";
import RegistrarDocente from "./pages/RegistrarDocente.jsx";
import RegistrarEstudiante from "./pages/RegistrarEstudiante.jsx";

// Rutas protegidas
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Layouts
import AdminLayout from "./layout/AdminLayout.jsx";
import DocenteLayout from "./layout/DocenteLayout.jsx";
import EstudianteLayout from "./layout/EstudianteLayout.jsx";

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



        <Route path="/registro" element={<RegistrarAdmin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

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
          <Route path="registrar-estudiante" element={<RegistrarEstudiante />} />
        </Route>

        <Route
          path="/docente/*"
          element={
            <ProtectedRoute role="docente">
              <DocenteLayout>
                <DocenteDashboard />
              </DocenteLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/estudiante/*"
          element={
            <ProtectedRoute role="estudiante">
              <EstudianteLayout>
                <EstudianteDashboard />
              </EstudianteLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
      <Footer />
    </>
  );
}

export default App;
