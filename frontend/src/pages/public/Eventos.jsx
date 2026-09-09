import { useEffect, useState } from 'react';
import PublicLayout from '../../components/PublicLayout';

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch('/api/eventos').then(r => r.json()).then(setEventos);
  }, []);

  const now = new Date();
  const proximos = eventos.filter(e => new Date(e.fecha + 'T23:59:59') >= now);
  const pasados  = eventos.filter(e => new Date(e.fecha + 'T23:59:59') < now);

  const getDay    = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { day: '2-digit' });
  const getMon    = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { month: 'short' }).toUpperCase().replace('.', '');
  const fechaFull = (e) => {
    const d = new Date(e.fecha + 'T12:00:00');
    const base = d.toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    return e.hora ? `${base} · ${e.hora} hrs.` : base;
  };

  return (
    <PublicLayout>

      {/* HERO */}
      <div style={s.hero}>
        <img src="/fotos/foto_4.jpg" alt="Eventos" style={s.heroImg} />
        <div style={s.heroOverlay}>
          <p style={s.heroEye}>Calendario Litúrgico</p>
          <h1 style={s.heroTitle}>Eventos y Celebraciones</h1>
        </div>
      </div>

      <section style={{ padding: '80px 24px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>

          {/* PRÓXIMOS */}
          <div style={{ marginBottom: 40 }}>
            <p style={s.label}>Próximamente</p>
            <h2 style={s.h2}>Eventos Programados</h2>
            <div style={s.line} />
          </div>

          {proximos.length === 0 && <p style={{ color: '#8a7355', marginBottom: 48 }}>No hay eventos próximos programados.</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 64 }}>
            {proximos.map(e => (
              <div key={e.id} style={{ ...s.card, ...rv('revealRight') }}>
                <div style={s.dateBadge}>
                  <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '2.1rem', fontWeight: 800, color: '#2c1810', lineHeight: 1 }}>{getDay(e.fecha)}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1.5px', color: '#2c1810', marginTop: 4 }}>{getMon(e.fecha)}</div>
                </div>
                {e.imagen && <img src={e.imagen} alt={e.titulo} style={{ width: 150, objectFit: 'cover', flexShrink: 0 }} />}
                <div style={{ padding: '20px 26px', flex: 1 }}>
                  <div style={s.fechaFull}>{fechaFull(e)}</div>
                  <h3 style={s.cardTitle}>{e.titulo}</h3>
                  <p style={s.cardDesc}>{e.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

          {/* PASADOS */}
          <div style={{ marginBottom: 32 }}>
            <p style={s.label}>Archivo</p>
            <h2 style={{ ...s.h2, fontSize: '1.5rem' }}>Eventos Pasados</h2>
            <div style={s.line} />
          </div>

          {pasados.length === 0 && <p style={{ color: '#8a7355' }}>No hay eventos pasados registrados.</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, opacity: 0.78 }}>
            {pasados.map(e => (
              <div key={e.id} style={{ ...s.cardPast, ...rv('revealUp') }}>
                <div style={s.dateBadgePast}>
                  <div style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.8rem', fontWeight: 800, color: '#6b5744', lineHeight: 1 }}>{getDay(e.fecha)}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1.2px', color: '#6b5744', marginTop: 4 }}>{getMon(e.fecha)}</div>
                </div>
                <div style={{ padding: '18px 24px', flex: 1 }}>
                  <div style={{ fontSize: '0.76rem', color: '#a09070', fontWeight: 700, letterSpacing: '0.8px', marginBottom: 7 }}>{fechaFull(e)}</div>
                  <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.15rem', color: '#2c1810', marginBottom: 7 }}>{e.titulo}</h3>
                  <p style={{ color: '#6b5744', fontSize: '0.9rem', lineHeight: 1.65 }}>{e.descripcion}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </PublicLayout>
  );
}

function rv(anim) {
  return { animation: `${anim} both linear`, animationTimeline: 'view()', animationRange: 'entry 0% cover 30%' };
}

const s = {
  hero: { height: 360, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 12s ease-out forwards' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,5,0.55), rgba(20,10,5,0.72))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' },
  heroEye: { color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, animation: 'heroUp 0.8s ease forwards', animationDelay: '0.1s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,5vw,3.4rem)', color: '#f8f4ee', fontWeight: 800, animation: 'heroUp 0.9s ease forwards', animationDelay: '0.25s' },
  label: { color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 10 },
  h2: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.8rem,4vw,2.5rem)', color: '#2c1810' },
  line: { width: 60, height: 3, background: '#c9a84c', marginTop: 14 },
  card: { background: '#fff', border: '1px solid #e8ddd0', display: 'flex', overflow: 'hidden', boxShadow: '0 3px 16px rgba(44,24,16,0.08)', borderRadius: 4, transition: 'transform 0.28s, box-shadow 0.28s' },
  dateBadge: { background: '#c9a84c', minWidth: 84, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px 8px' },
  fechaFull: { fontSize: '0.78rem', color: '#b9912f', fontWeight: 700, letterSpacing: '0.8px', marginBottom: 8 },
  cardTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.28rem', color: '#2c1810', marginBottom: 9 },
  cardDesc: { color: '#6b5744', fontSize: '0.93rem', lineHeight: 1.7 },
  cardPast: { background: '#fff', border: '1px solid #ded2c0', display: 'flex', overflow: 'hidden', borderRadius: 4 },
  dateBadgePast: { background: '#d4c5a9', minWidth: 78, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '14px 8px' },
};
