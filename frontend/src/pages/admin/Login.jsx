import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Usuario o contraseña incorrectos.'); return; }
      login(data.token, data.username);
      navigate('/admin');
    } catch {
      setError('Error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      {/* IZQUIERDA: imagen (se oculta en pantallas chicas) */}
      <div className="login-left">
        <img src="/fotos/foto_5.jpg" alt="Convento" style={s.img} />
        <div className="login-left-overlay">
          <p style={s.leftEye}>✦ Panel de Administración ✦</p>
          <h1 style={s.leftTitle}>Convento<br />Santa Teresa</h1>
          <p style={s.leftSub}>Cochabamba, Bolivia — Fundado en 1726</p>
        </div>
      </div>

      {/* DERECHA: formulario */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">✦</div>
            <h2 className="login-title" style={s.logoTitle}>Acceso Administrativo</h2>
            <p className="login-sub" style={s.logoSub}>Ingrese sus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label style={s.label}>Usuario</label>
              <input
                required
                value={form.username}
                onChange={e => { setForm(f => ({ ...f, username: e.target.value })); setError(''); }}
                placeholder="admin"
                autoFocus
                className="login-input"
                style={s.input}
              />
            </div>
            <div className="login-field">
              <label style={s.label}>Contraseña</label>
              <input
                required
                type="password"
                value={form.password}
                onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setError(''); }}
                placeholder="••••••••"
                className="login-input"
                style={s.input}
              />
            </div>
            {error && <p className="login-error">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="login-submit"
              style={s.btnGold}
            >
              {loading ? 'Iniciando...' : 'Ingresar'}
            </button>
          </form>

          <Link to="/" className="login-back">
            ← Volver al sitio público
          </Link>
        </div>
      </div>
    </div>
  );
}

const s = {
  img: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 14s ease-out forwards' },
  leftEye: { color: '#e8c97a', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16, animation: 'slideRight 0.8s ease forwards', animationDelay: '0.2s' },
  leftTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,4vw,3.2rem)', color: '#f8f4ee', lineHeight: 1.1, marginBottom: 16, animation: 'slideRight 0.9s ease forwards', animationDelay: '0.35s' },
  leftSub: { color: '#bfa881', animation: 'slideRight 1s ease forwards', animationDelay: '0.5s' },
  logoTitle: { fontFamily: '"Playfair Display",serif', color: '#2c1810', animation: 'adminUp 0.7s ease forwards', animationDelay: '0.15s' },
  logoSub: { color: '#6b5744' },
  label: { display: 'block', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b5744', marginBottom: 6 },
  input: { width: '100%', border: '1px solid #d8cbb6', background: '#fff', color: '#2c1810', outline: 'none', borderRadius: 3, transition: 'border-color 0.2s', fontFamily: 'Lato,sans-serif' },
  btnGold: { background: '#c9a84c', color: '#2c1810', border: 'none', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 3, fontFamily: 'Lato,sans-serif', transition: 'background 0.25s, transform 0.15s', display: 'block' },
};
