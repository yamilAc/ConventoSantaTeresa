import { Link } from 'react-router-dom';

const navLinks = [
  ['/', 'Inicio'],
  ['/historia', 'Historia'],
  ['/galeria', 'Galería'],
  ['/eventos', 'Eventos'],
  ['/noticias', 'Noticias'],
  ['/contacto', 'Contacto'],
];

export default function Footer() {
  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div>
          <h3 style={s.title}>Convento Santa Teresa</h3>
          <p style={s.text}>Monasterio de Carmelitas Descalzas<br />Cochabamba, Bolivia</p>
          <p style={{ ...s.text, marginTop: 14, color: '#c9a84c', letterSpacing: '1px' }}>✦ Ora et Labora ✦</p>
        </div>
        <div>
          <h4 style={s.subtitle}>Navegación</h4>
          <ul style={{ listStyle: 'none' }}>
            {navLinks.map(([to, label]) => (
              <li key={to}>
                <Link to={to} style={s.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={s.subtitle}>Ubicación</h4>
          <p style={s.text}>Plaza del Granado<br />Centro Histórico<br />Cochabamba, Bolivia</p>
          <h4 style={{ ...s.subtitle, marginTop: 20 }}>Horario de Iglesia</h4>
          <p style={s.text}>Lun–Sáb: 7:00 – 12:00<br />Domingos: 9:00 – 12:00</p>
        </div>
      </div>
      <div style={s.bottom}>
        <p style={s.bottomText}>© {new Date().getFullYear()} Convento Santa Teresa — Cochabamba, Bolivia. Fundado en 1726.</p>
      </div>
    </footer>
  );
}

const s = {
  footer: { background: '#1a0e08', color: '#d4c5a9' },
  inner: {
    maxWidth: 1200, margin: '0 auto', padding: '64px 24px 44px',
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 40,
  },
  title: { fontFamily: '"Playfair Display",serif', fontSize: '1.4rem', color: '#f8f4ee', marginBottom: 16 },
  subtitle: { fontSize: '0.78rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14, fontFamily: 'Lato,sans-serif', fontWeight: 700 },
  text: { fontSize: '0.9rem', lineHeight: 1.85, color: '#a09070' },
  link: { color: '#a09070', fontSize: '0.9rem', lineHeight: 2.3, display: 'block', transition: 'color 0.2s' },
  bottom: { borderTop: '1px solid #2c1810', padding: '20px 24px', textAlign: 'center' },
  bottomText: { fontSize: '0.8rem', color: '#6b5744' },
};
