import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Informacion from "./pages/Informacion.jsx";


// Dashboards
import AdminDashboard from "./pages/AdminDashboard.jsx";
import DocenteDashboard from "./pages/DocenteDashboard.jsx";
import EstudianteDashboard from "./pages/EstudianteDashboard.jsx";

// Rutas protegidas
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Layouts
import AdminLayout from "./layout/AdminLayout.jsx";
import DocenteLayout from "./layout/DocenteLayout.jsx";
import EstudianteLayout from "./layout/EstudianteLayout.jsx";

function App() {
  return (
    <Routes>

      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />
      {/* Información */}
      <Route path="/informacion" element={<Informacion />} />


      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* DOCENTE */}
      <Route
        path="/docente"
        element={
          <ProtectedRoute role="docente">
            <DocenteLayout>
              <DocenteDashboard />
            </DocenteLayout>
          </ProtectedRoute>
        }
      />

      {/* ESTUDIANTE */}
      <Route
        path="/estudiante"
        element={
          <ProtectedRoute role="estudiante">
          <EstudianteLayout>
            <EstudianteDashboard />
          </EstudianteLayout>
        </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
