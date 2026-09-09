import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch('/api/noticias').then(r => r.json()).then(setNoticias);
  }, []);

  const fmtFecha = d => new Date(d).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <PublicLayout>

      {/* HERO */}
      <div style={s.hero}>
        <img src="/fotos/foto_13.jpg" alt="Noticias" style={s.heroImg} />
        <div style={s.heroOverlay}>
          <p style={s.heroEye}>Actualidad</p>
          <h1 style={s.heroTitle}>Noticias de la Comunidad</h1>
        </div>
      </div>

      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {noticias.length === 0 && <p style={{ color: '#8a7355', textAlign: 'center', padding: '60px 0' }}>No hay noticias publicadas.</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 28 }}>
            {noticias.map(n => (
              <NoticiaCard key={n.id} n={n} fecha={fmtFecha(n.created_at)} />
            ))}
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}

function NoticiaCard({ n, fecha }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={`/noticias/${n.id}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'block', background: '#fff', cursor: 'pointer', overflow: 'hidden', borderRadius: 5, textDecoration: 'none', color: 'inherit', transition: 'transform 0.28s, box-shadow 0.28s', transform: hover ? 'translateY(-7px)' : 'none', boxShadow: hover ? '0 18px 40px rgba(44,24,16,0.18)' : '0 3px 18px rgba(44,24,16,0.08)', animation: 'revealUp both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 32%' }}
    >
      {n.imagen && (
        <div style={{ height: 200, overflow: 'hidden' }}>
          <img src={n.imagen} alt={n.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', transform: hover ? 'scale(1.06)' : 'scale(1)' }} />
        </div>
      )}
      <div style={{ padding: '22px 24px 26px' }}>
        <div style={{ fontSize: '0.76rem', color: '#b9912f', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 9 }}>{fecha}</div>
        <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.24rem', color: '#2c1810', marginBottom: 10, lineHeight: 1.3 }}>{n.titulo}</h3>
        <p style={{ color: '#6b5744', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 14 }}>{n.contenido?.slice(0, 120)}…</p>
        <span style={{ color: '#b9912f', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px' }}>Leer más →</span>
      </div>
    </Link>
  );
}

const s = {
  hero: { height: 340, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 12s ease-out forwards' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,5,0.55), rgba(20,10,5,0.72))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' },
  heroEye: { color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, animation: 'heroUp 0.8s ease forwards', animationDelay: '0.1s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,5vw,3.4rem)', color: '#f8f4ee', fontWeight: 800, animation: 'heroUp 0.9s ease forwards', animationDelay: '0.25s' },
};
