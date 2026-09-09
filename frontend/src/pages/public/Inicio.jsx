import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';

const HERO_IMGS = [
  '/fotos/foto_3.jpg',
  '/fotos/foto_5.jpg',
  '/fotos/foto_1.jpg',
  '/fotos/foto_12.jpg',
];

export default function Inicio() {
  const [contenido, setContenido] = useState({});
  const [eventos, setEventos] = useState([]);
  const [noticias, setNoticias] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [heroIdx, setHeroIdx] = useState(0);

  useEffect(() => {
    fetch('/api/contenido').then(r => r.json()).then(rows => {
      const m = {};
      rows.forEach(r => { m[r.seccion] = r; });
      setContenido(m);
    });
    fetch('/api/eventos').then(r => r.json()).then(d => setEventos(d.slice(0, 3)));
    fetch('/api/noticias').then(r => r.json()).then(d => setNoticias(d.slice(0, 3)));
    fetch('/api/galeria').then(r => r.json()).then(d => setGaleria(d.slice(0, 6)));

    const t = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMGS.length), 5500);
    return () => clearInterval(t);
  }, []);

  const fmtFecha = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' });
  const getDay  = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { day: '2-digit' });
  const getMon  = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { month: 'short' }).toUpperCase().replace('.', '');

  return (
    <PublicLayout>

      {/* ===== HERO ===== */}
      <section style={s.hero}>
        {HERO_IMGS.map((src, i) => (
          <div key={src} style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            opacity: i === heroIdx ? 1 : 0,
            transition: 'opacity 1.7s ease',
            animation: i === heroIdx ? 'kenburns 9s ease-out forwards' : 'none',
            willChange: 'opacity, transform',
          }} />
        ))}
        <div style={s.heroOverlay}>
          <div style={s.heroContent}>
            <p style={s.heroEyebrow}>✦ Cochabamba · Bolivia ✦</p>
            <h1 style={s.heroTitle}>Convento<br />Santa Teresa</h1>
            <p style={s.heroSub}>Monasterio de Carmelitas Descalzas · Fundado en 1726</p>
            <div style={s.heroBtns}>
              <Link to="/historia" style={s.btnGold}>Nuestra Historia</Link>
              <Link to="/eventos" style={s.btnGoldOutline}>Ver Eventos</Link>
            </div>
          </div>
        </div>
        <div style={s.heroDots}>
          {HERO_IMGS.map((_, i) => (
            <button key={i} onClick={() => setHeroIdx(i)}
              style={{ ...s.dot, ...(i === heroIdx ? s.dotActive : {}) }} />
          ))}
        </div>
        <div style={s.scrollHint}>⌄</div>
      </section>

      {/* ===== BIENVENIDA ===== */}
      <section style={{ padding: '104px 24px 92px' }}>
        <div style={{ maxWidth: 740, margin: '0 auto', textAlign: 'center' }}>
          <p style={s.reveal('revealFade')}>Bienvenidos</p>
          <h2 style={{ ...s.sectionH2, ...s.reveal('revealUp') }}>
            {contenido.inicio?.titulo || 'Un lugar de paz y oración'}
          </h2>
          <div style={{ ...s.divider, ...s.reveal('growLine') }} />
          <p style={{ fontSize: '1.12rem', color: '#5a4535', lineHeight: 1.95, ...s.reveal('revealUp', '2%') }}>
            {contenido.inicio?.texto || 'Tras estos muros de cal y piedra, una comunidad de Carmelitas Descalzas guarda desde hace casi tres siglos el silencio, la oración y la belleza.'}
          </p>
        </div>
      </section>

      {/* ===== 3 PILARES ===== */}
      <section style={{ background: '#2c1810', padding: '84px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={s.bgGlyph}>✦</div>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 30, position: 'relative' }}>
          {PILARES.map(p => (
            <div key={p.titulo} style={{ ...s.pilar, ...s.reveal('revealUp') }}>
              <div style={s.pilarIconWrap}>{p.svg}</div>
              <h3 style={s.pilarTitle}>{p.titulo}</h3>
              <p style={s.pilarText}>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== GALERÍA PREVIEW ===== */}
      {galeria.length > 0 && (
        <section style={{ padding: '96px 24px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={s.reveal('revealFade')}>Fotografías</p>
              <h2 style={{ ...s.sectionH2, ...s.reveal('revealUp') }}>Nuestro Convento</h2>
              <div style={{ ...s.divider, ...s.reveal('growLine') }} />
            </div>
            <div style={s.galeriaGrid}>
              {galeria.map(foto => (
                <Link key={foto.id} to="/galeria" style={s.galeriaItem}>
                  <img src={foto.imagen} alt={foto.titulo || 'Convento'} style={s.galeriaImg} />
                  <div style={s.galeriaOverlay}>
                    <span style={s.galeriaLabel}>{foto.titulo}</span>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/galeria" style={{ ...s.btnGold, fontSize: '0.84rem' }}>Ver Galería Completa</Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== BANDA HISTORIA ===== */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(360px,1fr))', alignItems: 'stretch' }}>
          <div style={{ backgroundImage: "url('/fotos/foto_5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 440 }} />
          <div style={{ background: '#4a2412', padding: 'clamp(48px,6vw,80px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <p style={{ ...s.reveal('revealFade'), color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 16 }}>Tres siglos de historia</p>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.9rem,3.5vw,2.6rem)', color: '#f8f4ee', lineHeight: 1.18, marginBottom: 22, ...s.reveal('revealUp') }}>Un patrimonio vivo del Cochabamba colonial</h2>
            <p style={{ color: '#d8c4a4', fontSize: '1.04rem', lineHeight: 1.9, marginBottom: 30, ...s.reveal('revealUp', '3%') }}>
              {contenido.historia?.texto?.slice(0, 220) || 'Fundado en 1726, el convento conserva sus claustros, su iglesia barroca y la espadaña blanca que asoma sobre los tejados del centro histórico.'}
              {contenido.historia?.texto?.length > 220 ? '…' : ''}
            </p>
            <Link to="/contacto" style={{ alignSelf: 'flex-start', border: '2px solid #e8c97a', color: '#f3e7c4', padding: '12px 30px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '1.4px', textTransform: 'uppercase', borderRadius: 2, transition: 'background 0.25s, color 0.25s' }}>Planear una visita</Link>
          </div>
        </div>
      </section>

      {/* ===== PRÓXIMOS EVENTOS ===== */}
      {eventos.length > 0 && (
        <section style={{ background: '#f0e7d6', padding: '96px 24px 104px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ ...s.reveal('revealFade') }}>Calendario</p>
              <h2 style={{ ...s.sectionH2, ...s.reveal('revealUp') }}>Próximos Eventos</h2>
              <div style={{ ...s.divider, ...s.reveal('growLine') }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: 26 }}>
              {eventos.map(e => (
                <div key={e.id} style={{ ...s.eventoCard, ...s.reveal('revealUp') }}>
                  <div style={{ position: 'relative', height: 172, overflow: 'hidden' }}>
                    {e.imagen && <img src={e.imagen} alt={e.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    <div style={s.eventoBadge}>
                      <div style={{ fontSize: '1.35rem', fontWeight: 900, fontFamily: '"Playfair Display",serif' }}>{getDay(e.fecha)}</div>
                      <div style={{ fontSize: '0.62rem', letterSpacing: '1.5px', textTransform: 'uppercase', marginTop: 3 }}>{getMon(e.fecha)}</div>
                    </div>
                  </div>
                  <div style={{ padding: '22px 24px 26px' }}>
                    <div style={s.eventoMeta}>{e.hora ? `${e.hora} · Iglesia` : fmtFecha(e.fecha)}</div>
                    <h3 style={s.eventoTitle}>{e.titulo}</h3>
                    <p style={s.eventoDesc}>{e.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/eventos" style={{ ...s.btnGold, fontSize: '0.84rem' }}>Ver Todos los Eventos</Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== NOTICIAS ===== */}
      {noticias.length > 0 && (
        <section style={{ padding: '96px 24px 100px' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ ...s.reveal('revealFade') }}>Actualidad</p>
              <h2 style={{ ...s.sectionH2, ...s.reveal('revealUp') }}>Últimas Noticias</h2>
              <div style={{ ...s.divider, ...s.reveal('growLine') }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(310px,1fr))', gap: 26 }}>
              {noticias.map(n => (
                <Link key={n.id} to={`/noticias/${n.id}`} style={{ ...s.noticiaCard, ...s.reveal('revealUp') }}>
                  {n.imagen && (
                    <div style={{ height: 190, overflow: 'hidden' }}>
                      <img src={n.imagen} alt={n.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s' }} />
                    </div>
                  )}
                  <div style={{ padding: '22px 24px 26px' }}>
                    <div style={s.noticiaFecha}>{new Date(n.created_at).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                    <h3 style={s.noticiaTitle}>{n.titulo}</h3>
                    <p style={s.noticiaText}>{n.contenido?.slice(0, 100)}…</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section style={s.cta}>
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <div style={{ color: '#e8c97a', fontSize: '1.8rem', marginBottom: 18, animation: 'floatGlyph 6s ease-in-out infinite' }}>✦</div>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,4.5vw,2.7rem)', color: '#f8f4ee', marginBottom: 18, ...s.reveal('revealUp') }}>¿Deseas visitarnos?</h2>
          <p style={{ color: '#cdb892', fontSize: '1.06rem', lineHeight: 1.85, marginBottom: 36, ...s.reveal('revealUp', '2%') }}>Nos encontramos en la Plaza del Granado, corazón del centro histórico de Cochabamba. Te esperamos con las puertas abiertas.</p>
          <Link to="/contacto" style={{ ...s.btnGold, ...s.reveal('revealFade', '4%') }}>Cómo Llegarnos</Link>
        </div>
      </section>

    </PublicLayout>
  );
}

// ===== PILARES DATA =====
const PILARES = [
  {
    titulo: 'Vida Contemplativa',
    texto: 'Dedicadas a la oración y el silencio, ofrecemos nuestras vidas como intercesión por la Iglesia y el mundo.',
    svg: (
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke="#e8c97a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="20" y="24" width="8" height="17" rx="1.2" /><line x1="24" y1="24" x2="24" y2="18" />
        <path d="M24 17c3.2-2.4 3.2-6.4 0-9.6-3.2 3.2-3.2 7.2 0 9.6z" /><line x1="15" y1="41" x2="33" y2="41" />
      </svg>
    ),
  },
  {
    titulo: 'Patrimonio Histórico',
    texto: 'Fundado en 1726, el convento es un tesoro arquitectónico barroco del centro histórico de Cochabamba.',
    svg: (
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke="#e8c97a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 40V23a12 12 0 0 1 24 0v17" /><line x1="8" y1="40" x2="40" y2="40" /><line x1="24" y1="11" x2="24" y2="40" />
      </svg>
    ),
  },
  {
    titulo: 'Comunidad Carmelita',
    texto: 'Seguimos la espiritualidad de Santa Teresa de Ávila y San Juan de la Cruz, viviendo en fraternidad y amor.',
    svg: (
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke="#e8c97a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <line x1="24" y1="8" x2="24" y2="40" /><line x1="14" y1="19" x2="34" y2="19" />
      </svg>
    ),
  },
];

// ===== HELPERS =====
const reveal = (anim, rangeStart = '0%') => ({
  opacity: 0,
  animation: `${anim} both linear`,
  animationTimeline: 'view()',
  animationRange: `entry ${rangeStart} cover 28%`,
});

const s = {
  hero: { position: 'relative', height: '94vh', minHeight: 560, overflow: 'hidden' },
  heroOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to bottom, rgba(20,10,5,0.42) 0%, rgba(20,10,5,0.46) 45%, rgba(20,10,5,0.78) 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  heroContent: { textAlign: 'center', padding: '0 24px', maxWidth: 860 },
  heroEyebrow: { color: '#e8c97a', fontSize: '0.82rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 22, animation: 'fadeUp 0.9s ease forwards', animationDelay: '0.15s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(3rem,8.5vw,5.6rem)', color: '#f8f4ee', fontWeight: 800, lineHeight: 1.04, marginBottom: 24, textShadow: '0 4px 30px rgba(0,0,0,0.35)', animation: 'fadeUp 1s ease forwards', animationDelay: '0.3s' },
  heroSub: { color: '#e2d3b8', fontSize: '1.12rem', letterSpacing: '1px', marginBottom: 42, fontWeight: 300, animation: 'fadeUp 1s ease forwards', animationDelay: '0.5s' },
  heroBtns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', animation: 'fadeUp 1s ease forwards', animationDelay: '0.7s' },
  heroDots: { position: 'absolute', bottom: 78, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 9, zIndex: 3 },
  dot: { height: 9, borderRadius: 6, border: 'none', padding: 0, cursor: 'pointer', background: 'rgba(248,244,238,0.45)', width: 9, transition: 'all 0.4s ease' },
  dotActive: { width: 26, background: '#e8c97a' },
  scrollHint: { position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', color: '#e8c97a', fontSize: '1.4rem', animation: 'scrollHint 1.8s ease-in-out infinite', zIndex: 3 },

  sectionH2: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,4.5vw,2.9rem)', color: '#2c1810' },
  divider: { width: 64, height: 3, background: '#c9a84c', margin: '20px auto 34px', transformOrigin: 'center' },
  reveal: (anim, start = '0%') => ({
    color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14,
    animation: `${anim} both linear`, animationTimeline: 'view()', animationRange: `entry ${start} cover 26%`,
  }),

  bgGlyph: { position: 'absolute', top: -40, right: -20, fontSize: '13rem', color: 'rgba(201,168,76,0.05)', fontFamily: '"Playfair Display",serif', pointerEvents: 'none', lineHeight: 1 },
  pilar: { textAlign: 'center', padding: '46px 28px', border: '1px solid rgba(201,168,76,0.22)', borderRadius: 3, background: 'rgba(255,255,255,0.012)', transition: 'transform 0.35s, border-color 0.35s, background 0.35s', opacity: 0 },
  pilarIconWrap: { marginBottom: 22, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 74, height: 74, border: '1px solid rgba(201,168,76,0.4)', borderRadius: '50%' },
  pilarTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.35rem', color: '#f3e7c4', marginBottom: 14 },
  pilarText: { color: '#a89770', fontSize: '0.96rem', lineHeight: 1.85 },

  galeriaGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 10 },
  galeriaItem: { position: 'relative', overflow: 'hidden', aspectRatio: '4/3', borderRadius: 3, cursor: 'pointer', display: 'block' },
  galeriaImg: { width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(.2,.7,.2,1)', filter: 'saturate(0.96)' },
  galeriaOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(transparent 45%, rgba(28,15,8,0.82))', display: 'flex', alignItems: 'flex-end', padding: '18px 18px 16px', opacity: 0, transition: 'opacity 0.4s' },
  galeriaLabel: { color: '#f3e7c4', fontSize: '0.92rem', fontWeight: 700, letterSpacing: '0.5px' },

  eventoCard: { background: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 22px rgba(44,24,16,0.1)', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s, box-shadow 0.3s' },
  eventoBadge: { position: 'absolute', top: 14, left: 14, background: 'rgba(44,24,16,0.92)', color: '#e8c97a', borderRadius: 3, padding: '7px 11px', textAlign: 'center', lineHeight: 1, minWidth: 54 },
  eventoMeta: { color: '#b9912f', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 9 },
  eventoTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.24rem', color: '#2c1810', marginBottom: 10, lineHeight: 1.25 },
  eventoDesc: { color: '#6b5744', fontSize: '0.92rem', lineHeight: 1.7 },

  noticiaCard: { display: 'block', background: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 22px rgba(44,24,16,0.09)', transition: 'transform 0.3s, box-shadow 0.3s' },
  noticiaFecha: { color: '#b9912f', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 9 },
  noticiaTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.2rem', color: '#2c1810', marginBottom: 10, lineHeight: 1.28 },
  noticiaText: { color: '#6b5744', fontSize: '0.92rem', lineHeight: 1.7 },

  cta: { position: 'relative', padding: '104px 24px', textAlign: 'center', backgroundImage: "linear-gradient(135deg, rgba(44,24,16,0.92), rgba(74,32,18,0.9)), url('/fotos/foto_3.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' },

  btnGold: { background: '#c9a84c', color: '#2c1810', padding: '15px 34px', fontWeight: 700, fontSize: '0.86rem', letterSpacing: '1.6px', textTransform: 'uppercase', borderRadius: 2, transition: 'background 0.2s, transform 0.2s', display: 'inline-block' },
  btnGoldOutline: { border: '2px solid #e8c97a', color: '#f3e7c4', padding: '13px 32px', fontWeight: 700, fontSize: '0.86rem', letterSpacing: '1.6px', textTransform: 'uppercase', borderRadius: 2, transition: 'background 0.25s, color 0.25s, transform 0.2s', display: 'inline-block' },
};
