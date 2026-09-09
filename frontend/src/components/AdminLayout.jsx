import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  {
    to: '/admin', label: 'Dashboard', exact: true,
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  },
  {
    to: '/admin/eventos', label: 'Eventos',
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="8" y1="3" x2="8" y2="6"/><line x1="16" y1="3" x2="16" y2="6"/></svg>,
  },
  {
    to: '/admin/galeria', label: 'Galería',
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5L5 20"/></svg>,
  },
  {
    to: '/admin/noticias', label: 'Noticias',
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h12v14H6a2 2 0 0 1-2-2z"/><path d="M16 8h3a1 1 0 0 1 1 1v8a2 2 0 0 1-2 2"/><line x1="7" y1="9" x2="13" y2="9"/><line x1="7" y1="13" x2="13" y2="13"/></svg>,
  },
  {
    to: '/admin/contenido', label: 'Contenido',
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>,
  },
  {
    to: '/admin/settings', label: 'Configuración',
    icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="8" x2="20" y2="8"/><circle cx="15" cy="8" r="2.4"/><line x1="4" y1="16" x2="20" y2="16"/><circle cx="9" cy="16" r="2.4"/></svg>,
  },
];

export default function AdminLayout({ children, title }) {
  const { username, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login');
  }

  return (
    <div style={s.wrap}>
      <aside style={s.sidebar}>
        <div style={s.sidebarTop}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <span style={s.logoIcon}>✦</span>
            <div>
              <div style={s.logoTitle}>Panel Admin</div>
              <div style={s.logoSub}>Santa Teresa</div>
            </div>
          </div>
        </div>

        <nav style={s.nav}>
          {NAV_ITEMS.map(item => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link key={item.to} to={item.to} style={{ ...s.navItem, ...(active ? s.navActive : {}) }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={s.sidebarBottom}>
          <div style={s.user}>
            <div style={s.userAvatar}>{username?.[0]?.toUpperCase()}</div>
            <div>
              <div style={s.userName}>{username}</div>
              <div style={s.userRole}>Administrador</div>
            </div>
          </div>
          <button onClick={handleLogout} style={s.logoutBtn}>Cerrar sesión</button>
          <Link to="/" style={s.viewSite}>← Ver sitio público</Link>
        </div>
      </aside>

      <div style={s.main}>
        <header style={s.header}>
          <h1 style={s.pageTitle}>{title}</h1>
        </header>
        <div style={s.content}>{children}</div>
      </div>
    </div>
  );
}

const s = {
  wrap: { display: 'flex', minHeight: '100vh', background: '#efe7d8' },
  sidebar: { width: 264, background: 'linear-gradient(180deg,#2c1810,#241009)', color: '#d4c5a9', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh', flexShrink: 0 },
  sidebarTop: { padding: '26px 22px 22px', animation: 'fadeIn 0.6s ease forwards' },
  logoIcon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, border: '1px solid rgba(201,168,76,0.5)', borderRadius: '50%', color: '#e8c97a', fontSize: '1.3rem' },
  logoTitle: { fontSize: '1.02rem', fontWeight: 700, color: '#f8f4ee', fontFamily: '"Playfair Display",serif' },
  logoSub: { fontSize: '0.7rem', color: '#c9a84c', letterSpacing: '2.5px', textTransform: 'uppercase' },
  nav: { padding: '10px 12px', flex: 1 },
  navItem: { display: 'flex', alignItems: 'center', gap: 13, padding: '11px 14px', color: '#a09070', fontSize: '0.9rem', borderRadius: 7, marginBottom: 3, transition: 'background 0.2s, color 0.2s', fontFamily: 'Lato,sans-serif', textDecoration: 'none', animation: 'slideRight 0.45s ease forwards' },
  navActive: { background: 'rgba(201,168,76,0.16)', color: '#e8c97a', fontWeight: 700 },
  sidebarBottom: { padding: '16px 20px 24px', borderTop: '1px solid #3a2010', animation: 'fadeIn 0.8s ease forwards' },
  user: { display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 },
  userAvatar: { width: 38, height: 38, borderRadius: '50%', background: '#c9a84c', color: '#2c1810', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.95rem', flexShrink: 0 },
  userName: { fontSize: '0.9rem', color: '#f8f4ee', fontWeight: 700 },
  userRole: { fontSize: '0.72rem', color: '#6b5744' },
  logoutBtn: { width: '100%', background: 'rgba(192,57,43,0.16)', color: '#e8826f', border: '1px solid rgba(192,57,43,0.34)', padding: 9, fontSize: '0.84rem', borderRadius: 6, marginBottom: 9, cursor: 'pointer', fontFamily: 'Lato,sans-serif', transition: 'background 0.2s' },
  viewSite: { display: 'block', textAlign: 'center', color: '#8a7355', fontSize: '0.8rem', padding: '6px 0', transition: 'color 0.2s' },
  main: { flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 },
  header: { background: '#fff', padding: '21px 36px', borderBottom: '1px solid #e6dac9', boxShadow: '0 1px 5px rgba(0,0,0,0.05)', animation: 'fadeIn 0.5s ease forwards' },
  pageTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.55rem', color: '#2c1810' },
  content: { padding: 32, flex: 1, overflowY: 'auto' },
};
