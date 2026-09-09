import { useEffect, useState, useCallback } from 'react';
import PublicLayout from '../../components/PublicLayout';

export default function Galeria() {
  const [fotos, setFotos] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/galeria').then(r => r.json()).then(setFotos);
  }, []);

  const move = useCallback((dir) => {
    setSelected(s => {
      if (s === null) return null;
      return (s + dir + fotos.length) % fotos.length;
    });
  }, [fotos.length]);

  useEffect(() => {
    const onKey = e => {
      if (selected === null) return;
      if (e.key === 'ArrowLeft')  move(-1);
      if (e.key === 'ArrowRight') move(1);
      if (e.key === 'Escape')     setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, move]);

  const current = selected !== null ? fotos[selected] : null;

  return (
    <PublicLayout>

      {/* HERO */}
      <div style={s.hero}>
        <img src="/fotos/foto_5.jpg" alt="Galería" style={s.heroImg} />
        <div style={s.heroOverlay}>
          <p style={s.heroEye}>Imágenes</p>
          <h1 style={s.heroTitle}>Galería Fotográfica</h1>
        </div>
      </div>

      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={rv('revealFade')}>Fotografías del Convento</p>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,4.5vw,2.8rem)', color: '#2c1810', ...rv('revealUp') }}>Un Patrimonio Vivo</h2>
            <div style={{ width: 64, height: 3, background: '#c9a84c', margin: '16px auto 22px', transformOrigin: 'center', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 24%' }} />
            <p style={{ color: '#6b5744', fontSize: '1rem', maxWidth: 580, margin: '0 auto', ...rv('revealFade') }}>Descubra la belleza arquitectónica y espiritual del Convento Santa Teresa de Cochabamba.</p>
          </div>

          <div style={s.grid}>
            {fotos.map((f, i) => (
              <GalItem key={f.id} foto={f} onClick={() => setSelected(i)} />
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {selected !== null && current && (
        <div style={s.lb} onClick={() => setSelected(null)}>
          <button style={s.lbClose} onClick={() => setSelected(null)}>✕</button>
          <button style={s.lbPrev} onClick={e => { e.stopPropagation(); move(-1); }}>‹</button>
          <div style={s.lbContent} onClick={e => e.stopPropagation()}>
            <img src={current.imagen} alt={current.titulo} style={s.lbImg} />
            <p style={s.lbTitle}>{current.titulo}</p>
            <p style={s.lbCounter}>{selected + 1} / {fotos.length}</p>
          </div>
          <button style={s.lbNext} onClick={e => { e.stopPropagation(); move(1); }}>›</button>
        </div>
      )}

    </PublicLayout>
  );
}

function GalItem({ foto, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: 2, cursor: 'pointer', animation: 'revealUp both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 30%' }}
    >
      <img src={foto.imagen} alt={foto.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(.2,.7,.2,1)', transform: hover ? 'scale(1.08)' : 'scale(1)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(transparent 50%, rgba(28,15,8,0.82))', display: 'flex', alignItems: 'flex-end', padding: 16, opacity: hover ? 1 : 0, transition: 'opacity 0.35s' }}>
        <span style={{ color: '#f3e7c4', fontSize: '0.88rem', fontWeight: 700 }}>{foto.titulo}</span>
      </div>
    </div>
  );
}

function rv(anim) {
  return { animation: `${anim} both linear`, animationTimeline: 'view()', animationRange: 'entry 0% cover 26%' };
}

const s = {
  hero: { height: 360, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 12s ease-out forwards' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,5,0.55), rgba(20,10,5,0.72))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' },
  heroEye: { color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, animation: 'heroUp 0.8s ease forwards', animationDelay: '0.1s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,5vw,3.4rem)', color: '#f8f4ee', fontWeight: 800, animation: 'heroUp 0.9s ease forwards', animationDelay: '0.25s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 8 },
  lb: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'lbIn 0.25s ease forwards' },
  lbClose: { position: 'absolute', top: 18, right: 24, background: 'none', border: 'none', color: '#d4c5a9', fontSize: '1.6rem', cursor: 'pointer', zIndex: 10 },
  lbPrev: { position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)', color: '#e8c97a', fontSize: '2rem', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 5 },
  lbNext: { position: 'absolute', right: 18, top: '50%', transform: 'translateY(-50%)', background: 'rgba(201,168,76,0.18)', border: '1px solid rgba(201,168,76,0.4)', color: '#e8c97a', fontSize: '2rem', width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: 5 },
  lbContent: { maxWidth: '86vw', maxHeight: '86vh', textAlign: 'center', animation: 'lbZoom 0.3s cubic-bezier(.2,.8,.2,1) forwards' },
  lbImg: { maxWidth: '82vw', maxHeight: '74vh', objectFit: 'contain', borderRadius: 3 },
  lbTitle: { color: '#e8c97a', marginTop: 16, fontSize: '1.05rem', fontFamily: '"Playfair Display",serif' },
  lbCounter: { color: '#7a6648', fontSize: '0.85rem', marginTop: 6 },
};
