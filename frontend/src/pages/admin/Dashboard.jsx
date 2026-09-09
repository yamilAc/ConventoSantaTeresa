import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const ACCESOS = [
  { to: '/admin/eventos',  label: 'Gestionar Eventos',  key: 'eventos',  color: '#c9a84c', desc: (n) => `${n} eventos registrados` },
  { to: '/admin/galeria',  label: 'Gestionar Galería',  key: 'galeria',  color: '#8b4513', desc: (n) => `${n} fotos en galería` },
  { to: '/admin/noticias', label: 'Gestionar Noticias', key: 'noticias', color: '#2c6e49', desc: (n) => `${n} noticias publicadas` },
  { to: '/admin/contenido',label: 'Editar Contenido',   key: 'secciones',color: '#5b4a8b', desc: ()  => 'Textos e información del sitio' },
];

export default function Dashboard() {
  const { token, username } = useAuth();
  const [counts, setCounts] = useState({ eventos: 0, galeria: 0, noticias: 0, secciones: 4 });

  useEffect(() => {
    const h = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch('/api/eventos').then(r => r.json()),
      fetch('/api/galeria').then(r => r.json()),
      fetch('/api/noticias/todas', { headers: h }).then(r => r.json()),
    ]).then(([ev, ga, no]) => setCounts({ eventos: ev.length, galeria: ga.length, noticias: no.length, secciones: 4 }));
  }, [token]);

  const today = new Date().toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <AdminLayout title="Dashboard">

      {/* WELCOME */}
      <div style={s.welcome}>
        <div style={s.welcomeGlyph}>✦</div>
        <h2 style={s.welcomeTitle}>Bienvenido, {username}</h2>
        <p style={s.welcomeSub}>Gestione el contenido del sitio web del Convento Santa Teresa desde este panel.</p>
      </div>

      {/* STATS */}
      <div style={s.statsGrid}>
        {[
          { label: 'Eventos', val: counts.eventos, icon: <IcoCalendar /> },
          { label: 'Fotos en galería', val: counts.galeria, icon: <IcoImg /> },
          { label: 'Noticias', val: counts.noticias, icon: <IcoNews /> },
          { label: 'Secciones', val: counts.secciones, icon: <IcoEdit /> },
        ].map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statIcon}>{st.icon}</div>
            <div style={s.statVal}>{st.val}</div>
            <div style={s.statLabel}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* QUICK ACCESS */}
      <h3 style={s.sectionH}>Acceso Rápido</h3>
      <div style={s.accessGrid}>
        {ACCESOS.map(a => (
          <Link key={a.to} to={a.to} style={s.accessCard}>
            <div style={{ ...s.accessIcon, background: a.color + '1f', color: a.color }}>
              {a.key === 'eventos'   && <IcoCalendar color={a.color} />}
              {a.key === 'galeria'   && <IcoImg      color={a.color} />}
              {a.key === 'noticias'  && <IcoNews     color={a.color} />}
              {a.key === 'secciones' && <IcoEdit     color={a.color} />}
            </div>
            <div style={s.accessLabel}>{a.label}</div>
            <div style={s.accessDesc}>{a.desc(counts[a.key])}</div>
            <span style={s.accessArrow}>→</span>
          </Link>
        ))}
      </div>

      {/* TIP */}
      <div style={s.tip}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b9912f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
          <path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1h6c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/>
        </svg>
        <p style={{ fontSize: '0.9rem', color: '#5a4535' }}>
          <strong style={{ color: '#2c1810' }}>Consejo:</strong> Recuerde cambiar la contraseña por defecto en{' '}
          <Link to="/admin/settings" style={{ color: '#c9a84c', fontWeight: 700 }}>Configuración</Link>.
        </p>
      </div>

    </AdminLayout>
  );
}

// ===== SVG ICONS =====
const IcoCalendar = ({ color = '#b9912f' }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/>
    <line x1="8" y1="3" x2="8" y2="6"/><line x1="16" y1="3" x2="16" y2="6"/>
  </svg>
);
const IcoImg = ({ color = '#b9912f' }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5L5 20"/>
  </svg>
);
const IcoNews = ({ color = '#b9912f' }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 5h12v14H6a2 2 0 0 1-2-2z"/><path d="M16 8h3a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2"/>
    <line x1="7" y1="9" x2="13" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/>
  </svg>
);
const IcoEdit = ({ color = '#b9912f' }) => (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>
  </svg>
);

const s = {
  welcome: { background: 'linear-gradient(125deg,#2c1810,#4a2010)', color: '#fff', padding: '30px 34px', marginBottom: 30, borderRadius: 8, position: 'relative', overflow: 'hidden', animation: 'adminUp 0.6s ease forwards' },
  welcomeGlyph: { position: 'absolute', top: -30, right: -10, fontSize: '9rem', color: 'rgba(201,168,76,0.07)', fontFamily: '"Playfair Display",serif', lineHeight: 1, pointerEvents: 'none' },
  welcomeTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.55rem', color: '#f8f4ee', marginBottom: 7, position: 'relative' },
  welcomeSub: { color: '#bfa881', fontSize: '0.95rem', position: 'relative' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 18, marginBottom: 36 },
  statCard: { background: '#fff', padding: '24px 22px', borderRadius: 8, boxShadow: '0 2px 12px rgba(44,24,16,0.07)', borderTop: '3px solid #c9a84c', transition: 'transform 0.28s, box-shadow 0.28s', animation: 'adminUp 0.55s ease forwards' },
  statIcon: { width: 42, height: 42, borderRadius: 10, background: 'rgba(201,168,76,0.14)', color: '#b9912f', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  statVal: { fontFamily: '"Playfair Display",serif', fontSize: '2.4rem', color: '#2c1810', fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: '0.74rem', color: '#8a7355', marginTop: 6, textTransform: 'uppercase', letterSpacing: '1.2px', fontFamily: 'Lato,sans-serif' },
  sectionH: { fontFamily: '"Playfair Display",serif', fontSize: '1.25rem', color: '#2c1810', marginBottom: 18 },
  accessGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 18, marginBottom: 34 },
  accessCard: { background: '#fff', padding: '26px 24px', display: 'block', textDecoration: 'none', borderRadius: 8, boxShadow: '0 2px 12px rgba(44,24,16,0.07)', color: 'inherit', transition: 'transform 0.28s, box-shadow 0.28s', position: 'relative', animation: 'adminUp 0.6s ease both' },
  accessIcon: { width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  accessLabel: { fontWeight: 700, fontSize: '1rem', color: '#2c1810', fontFamily: '"Playfair Display",serif', marginBottom: 3 },
  accessDesc: { fontSize: '0.85rem', color: '#8a7355' },
  accessArrow: { position: 'absolute', right: 20, top: 24, color: '#c9a84c', fontSize: '1.2rem' },
  tip: { display: 'flex', gap: 13, alignItems: 'flex-start', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.32)', padding: '16px 20px', borderRadius: 8, animation: 'fadeIn 1s ease forwards' },
};
