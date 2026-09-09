import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Inicio from './pages/public/Inicio';
import Historia from './pages/public/Historia';
import Galeria from './pages/public/Galeria';
import Eventos from './pages/public/Eventos';
import Noticias from './pages/public/Noticias';
import NoticiaDetalle from './pages/public/NoticiaDetalle';
import Contacto from './pages/public/Contacto';
import Mantenimiento from './pages/public/Mantenimiento';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminEventos from './pages/admin/AdminEventos';
import AdminGaleria from './pages/admin/AdminGaleria';
import AdminContenido from './pages/admin/AdminContenido';
import AdminNoticias from './pages/admin/AdminNoticias';
import AdminSettings from './pages/admin/AdminSettings';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider, useSettings } from './context/SettingsContext';

function PrivateRoute({ children }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/admin/login" />;
}

function PublicGate({ children }) {
  const { mantenimiento, loaded } = useSettings();
  if (!loaded) return null;
  return mantenimiento ? <Mantenimiento /> : children;
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<PublicGate><Inicio /></PublicGate>} />
          <Route path="/historia" element={<PublicGate><Historia /></PublicGate>} />
          <Route path="/galeria" element={<PublicGate><Galeria /></PublicGate>} />
          <Route path="/eventos" element={<PublicGate><Eventos /></PublicGate>} />
          <Route path="/noticias" element={<PublicGate><Noticias /></PublicGate>} />
          <Route path="/noticias/:id" element={<PublicGate><NoticiaDetalle /></PublicGate>} />
          <Route path="/contacto" element={<PublicGate><Contacto /></PublicGate>} />

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/eventos" element={<PrivateRoute><AdminEventos /></PrivateRoute>} />
          <Route path="/admin/galeria" element={<PrivateRoute><AdminGaleria /></PrivateRoute>} />
          <Route path="/admin/contenido" element={<PrivateRoute><AdminContenido /></PrivateRoute>} />
          <Route path="/admin/noticias" element={<PrivateRoute><AdminNoticias /></PrivateRoute>} />
          <Route path="/admin/settings" element={<PrivateRoute><AdminSettings /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
      </SettingsProvider>
    </AuthProvider>
  );
}
