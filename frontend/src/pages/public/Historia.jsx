import { useEffect, useState } from 'react';
import PublicLayout from '../../components/PublicLayout';

const HITOS = [
  { ano: '1718', texto: 'El Arq. Pedro Nogales diseña los planos del convento, basados en el estilo barroco del Templo San Carlos de las Cuatro Fuentes de Roma.' },
  { ano: '1726', texto: 'Juan Salvador Crespo y Melchora Macías donan 10.000 m² y 20.000 pesos para la construcción del convento.' },
  { ano: 'S. XVIII', texto: 'Finaliza la construcción. Las cuatro primeras hermanas Carmelitas Descalzas, procedentes de La Plata, se instalan oficialmente.' },
  { ano: 'S. XIX', texto: 'La comunidad crece y se consolida como centro espiritual de Cochabamba.' },
  { ano: '2022', texto: 'Restauración de la cúpula principal, la cúpula sacristía, pináculos y espadaña, con teja de barro cocida y mortero de cal.' },
];

const DATOS_ARQ = [
  { k: 'Estilo', v: 'Barroco Mestizo' },
  { k: 'Diseñador', v: 'Arq. Pedro Nogales' },
  { k: 'Siglo', v: 'XVIII' },
  { k: 'Material', v: 'Piedra, teja de barro y cal' },
];

function rv(anim, start = '0%') {
  return {
    opacity: 0,
    animation: `${anim} both linear`,
    animationTimeline: 'view()',
    animationRange: `entry ${start} cover 30%`,
  };
}

export default function Historia() {
  const [contenido, setContenido] = useState({});

  useEffect(() => {
    fetch('/api/contenido').then(r => r.json()).then(rows => {
      const m = {};
      rows.forEach(r => { m[r.seccion] = r; });
      setContenido(m);
    });
  }, []);

  return (
    <PublicLayout>

      {/* HERO */}
      <div style={s.hero}>
        <img src="/fotos/foto_6.jpg" alt="Historia del Convento" style={s.heroImg} />
        <div style={s.heroOverlay}>
          <p style={s.heroEye}>Desde 1726</p>
          <h1 style={s.heroTitle}>Historia del Convento</h1>
        </div>
      </div>

      {/* ORÍGENES */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'center' }}>
          <div>
            <p style={{ color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, ...rv('revealFade') }}>Nuestros Orígenes</p>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,3.6vw,2.5rem)', color: '#2c1810', marginBottom: 8, ...rv('revealUp') }}>
              {contenido.historia?.titulo || 'Nuestra Historia'}
            </h2>
            <div style={{ width: 60, height: 3, background: '#c9a84c', margin: '14px 0 28px', transformOrigin: 'left', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 26%' }} />
            <p style={{ color: '#5a4535', fontSize: '1.04rem', lineHeight: 1.95, marginBottom: 16, ...rv('revealUp', '2%') }}>
              {contenido.historia?.texto || 'El Convento de Santa Teresa de Cochabamba fue fundado en 1726 por la Orden de las Carmelitas Descalzas. Concebido como clausura para la vida contemplativa, durante casi tres siglos ha resguardado un valioso patrimonio artístico y arquitectónico del período colonial barroco.'}
            </p>
            <p style={{ color: '#5a4535', fontSize: '1.04rem', lineHeight: 1.95, ...rv('revealUp', '4%') }}>Sus muros encierran corredores de arcos, un huerto, locutorios de celosías y una iglesia que conserva retablos, pinturas y orfebrería de incalculable valor histórico.</p>
          </div>
          <div style={{ overflow: 'hidden', borderRadius: 3, ...rv('revealUp') }}>
            <img src="/fotos/foto_7.jpg" alt="Claustro interior" style={{ width: '100%', height: 420, objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      {/* CRONOLOGÍA */}
      <section style={{ background: '#f0e7d6', padding: '88px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <p style={{ color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, ...rv('revealFade') }}>Cronología</p>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2rem,4.5vw,2.8rem)', color: '#2c1810', ...rv('revealUp') }}>Hitos Históricos</h2>
            <div style={{ width: 64, height: 3, background: '#c9a84c', margin: '16px auto 0', transformOrigin: 'center', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 26%' }} />
          </div>
          <div style={{ maxWidth: 820, margin: '0 auto' }}>
            {HITOS.map(h => (
              <div key={h.ano} style={{ display: 'grid', gridTemplateColumns: '96px 1fr', gap: 22, alignItems: 'start', ...rv('revealUp') }}>
                <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.15rem', color: '#b9912f', fontWeight: 800, textAlign: 'right', paddingTop: 1 }}>{h.ano}</div>
                <div style={{ position: 'relative', padding: '0 0 34px 26px', borderLeft: '2px solid #d8be7e' }}>
                  <span style={{ position: 'absolute', left: -7, top: 4, width: 12, height: 12, borderRadius: '50%', background: '#c9a84c', border: '2px solid #f0e7d6', display: 'block' }} />
                  <p style={{ color: '#5a4535', fontSize: '0.98rem', lineHeight: 1.8 }}>{h.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARQUITECTURA */}
      <section style={{ padding: '88px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 56, alignItems: 'center' }}>
          <div style={{ overflow: 'hidden', borderRadius: 3, ...rv('revealUp') }}>
            <img src="/fotos/foto_11.jpg" alt="Cúpula" style={{ width: '100%', height: 440, objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, ...rv('revealFade') }}>Arquitectura</p>
            <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,3.6vw,2.5rem)', color: '#2c1810', marginBottom: 8, ...rv('revealUp') }}>La Cúpula Barroca</h2>
            <div style={{ width: 60, height: 3, background: '#c9a84c', margin: '14px 0 28px', transformOrigin: 'left', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 26%' }} />
            <p style={{ color: '#5a4535', fontSize: '1.02rem', lineHeight: 1.9, marginBottom: 16, ...rv('revealUp', '2%') }}>El templo de Santa Teresa fue concebido con planta polilobulada inspirada en el Templo de San Carlos de las Cuatro Fuentes en Roma, obra del arquitecto Francesco Borromini durante el Barroco.</p>
            <p style={{ color: '#5a4535', fontSize: '1.02rem', lineHeight: 1.9, ...rv('revealUp', '3%') }}>La cúpula principal, del siglo XVIII, construida con teja de barro cocida y mortero de cal y arena, ha sido restaurada para conservar su imagen original.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 28 }}>
              {DATOS_ARQ.map(d => (
                <div key={d.k} style={{ background: '#f8f4ee', padding: '14px 16px', borderLeft: '3px solid #c9a84c', ...rv('revealUp') }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#b9912f', marginBottom: 4 }}>{d.k}</div>
                  <div style={{ fontSize: '0.95rem', color: '#2c1810', fontWeight: 600 }}>{d.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MISIÓN */}
      <section style={{ background: '#2c1810', padding: '92px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', fontSize: '13rem', color: 'rgba(201,168,76,0.05)', fontFamily: '"Playfair Display",serif', pointerEvents: 'none', lineHeight: 1 }}>✦</div>
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <p style={{ color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, ...rv('revealFade') }}>Nuestra Vocación</p>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,3.6vw,2.4rem)', color: '#f8f4ee', marginBottom: 10, ...rv('revealUp') }}>Corazón orante de la ciudad</h2>
          <div style={{ width: 60, height: 3, background: '#c9a84c', margin: '18px auto 30px', transformOrigin: 'center', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 28%' }} />
          <p style={{ color: '#bfa881', fontSize: '1.06rem', lineHeight: 1.95, ...rv('revealUp', '2%') }}>
            {contenido.mision?.texto || 'Como Carmelitas Descalzas consagramos nuestra vida a la oración contemplativa, el silencio y el trabajo, siguiendo el carisma de Santa Teresa de Ávila y San Juan de la Cruz. Nuestra vocación es ser corazón orante en medio de la Iglesia y del mundo.'}
          </p>
        </div>
      </section>

    </PublicLayout>
  );
}

const s = {
  hero: { height: 440, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 12s ease-out forwards' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,5,0.55), rgba(20,10,5,0.72))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' },
  heroEye: { color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, animation: 'heroUp 0.8s ease forwards', animationDelay: '0.1s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,5.5vw,3.6rem)', color: '#f8f4ee', fontWeight: 800, animation: 'heroUp 0.9s ease forwards', animationDelay: '0.25s' },
};
