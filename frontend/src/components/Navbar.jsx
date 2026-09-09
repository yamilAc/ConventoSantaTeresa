import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/historia', label: 'Historia' },
  { to: '/galeria', label: 'Galería' },
  { to: '/eventos', label: 'Eventos' },
  { to: '/noticias', label: 'Noticias' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav style={s.nav}>
      <div style={s.inner}>
        <Link to="/" style={s.logo}>
          <span style={s.logoTop}>✦ Convento</span>
          <span style={s.logoBottom}>Santa Teresa</span>
        </Link>

        <button style={s.burger} onClick={() => setOpen(o => !o)} aria-label="Menú">
          <span style={s.burgerLine} />
          <span style={s.burgerLine} />
          <span style={s.burgerLine} />
        </button>

        <ul style={{ ...s.menu, ...(open ? s.menuOpen : {}) }}>
          {links.map(l => {
            const active = pathname === l.to || (l.to !== '/' && pathname.startsWith(l.to));
            return (
              <li key={l.to}>
                <Link
                  to={l.to}
                  style={{ ...s.link, ...(active ? s.linkActive : {}) }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/contacto" style={s.visitaBtn} onClick={() => setOpen(false)}>
              Visítanos
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const s = {
  nav: {
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(44,24,16,0.96)',
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid #c9a84c',
    animation: 'fadeDown 0.7s ease forwards',
  },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '0 24px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    height: 66,
  },
  logo: { display: 'flex', flexDirection: 'column', lineHeight: 1.12 },
  logoTop: { color: '#c9a84c', fontSize: '0.62rem', letterSpacing: '3px', textTransform: 'uppercase', fontFamily: 'Lato,sans-serif', fontWeight: 700 },
  logoBottom: { color: '#f8f4ee', fontSize: '1.22rem', fontFamily: '"Playfair Display",serif', fontWeight: 700 },
  burger: { display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', padding: 8, cursor: 'pointer' },
  burgerLine: { display: 'block', width: 22, height: 2, background: '#c9a84c', borderRadius: 1 },
  menu: { display: 'flex', alignItems: 'center', gap: 2, listStyle: 'none' },
  menuOpen: {},
  link: {
    color: '#d4c5a9', padding: '8px 14px', fontSize: '0.9rem', letterSpacing: '0.4px',
    transition: 'color 0.25s', fontFamily: 'Lato,sans-serif', display: 'block',
  },
  linkActive: { color: '#e8c97a', fontWeight: 700 },
  visitaBtn: {
    background: '#c9a84c', color: '#2c1810', padding: '9px 20px',
    fontSize: '0.82rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase',
    fontFamily: 'Lato,sans-serif', marginLeft: 10, borderRadius: 2,
    transition: 'background 0.2s, transform 0.18s', display: 'inline-block',
  },
};
