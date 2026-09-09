import PublicLayout from '../../components/PublicLayout';
import { useSettings } from '../../context/SettingsContext';

const WHATSAPP_MENSAJE = 'Hola, quisiera más información sobre el Convento Santa Teresa.';

export default function Contacto() {
  const { whatsapp } = useSettings();
  const whatsappLink = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(WHATSAPP_MENSAJE)}` : null;

  return (
    <PublicLayout>

      {/* HERO */}
      <div style={s.hero}>
        <img src="/fotos/foto_9.jpg" alt="Contacto" style={s.heroImg} />
        <div style={s.heroOverlay}>
          <p style={s.heroEye}>Estamos aquí</p>
          <h1 style={s.heroTitle}>Contacto y Visita</h1>
        </div>
      </div>

      <section style={{ padding: '80px 24px', maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 64 }}>

          {/* INFO */}
          <p style={rv('revealFade')}>Información</p>
          <h2 style={{ fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.7rem,3.4vw,2.3rem)', color: '#2c1810', marginBottom: 8, ...rv('revealUp') }}>Cómo Visitarnos</h2>
          <div style={{ width: 60, height: 3, background: '#c9a84c', margin: '14px 0 32px', transformOrigin: 'left', animation: 'growLine both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 28%' }} />

          {INFO_ITEMS.map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 26 }}>
              <span style={s.iconWrap}>{item.svg}</span>
              <div>
                <div style={s.infoLabel}>{item.label}</div>
                <div style={s.infoText} dangerouslySetInnerHTML={{ __html: item.text }} />
              </div>
            </div>
          ))}

          {/* WHATSAPP */}
          {whatsappLink && (
            <div style={s.whatsapp}>
              <span style={s.whatsappIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </span>
              <div>
                <h3 style={s.whatsappTitle}>Escríbenos por WhatsApp</h3>
                <p style={s.whatsappText}>Contáctate directamente con la persona encargada y te responderá a la brevedad.</p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={s.whatsappBtn}>
                  Iniciar conversación
                </a>
              </div>
            </div>
          )}
        </div>

        {/* MAPA */}
        <div style={{ animation: 'revealUp both linear', animationTimeline: 'view()', animationRange: 'entry 0% cover 30%' }}>
          <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.4rem', color: '#2c1810', marginBottom: 20 }}>Ubicación</h3>
          <div style={{ overflow: 'hidden', border: '3px solid #e3d6c2', borderRadius: 4 }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-66.165%2C-17.398%2C-66.150%2C-17.388&layer=mapnik&marker=-17.393%2C-66.157"
              width="100%" height="360" style={{ border: 0, display: 'block' }}
              loading="lazy" title="Ubicación Convento Santa Teresa"
            />
          </div>
        </div>
      </section>

    </PublicLayout>
  );
}

const INFO_ITEMS = [
  {
    label: 'Ubicación',
    text: 'Plaza del Granado, Centro Histórico<br/>Cochabamba, Bolivia',
    svg: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>,
  },
  {
    label: 'Horario Iglesia',
    text: 'Lunes a Sábado: 7:00 – 12:00 hrs.<br/>Domingos: 9:00 – 12:00 hrs.',
    svg: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>,
  },
  {
    label: 'Museo',
    text: 'Museo Convento Santa Teresa<br/>Plaza del Granado',
    svg: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21h16"/><path d="M5 21V10l7-5 7 5v11"/><path d="M9 21v-6h6v6"/></svg>,
  },
  {
    label: 'Santa Misa',
    text: 'Lunes a Sábado: 7:00 hrs.<br/>Domingos: 9:00 hrs.',
    svg: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="7" y1="9" x2="17" y2="9"/></svg>,
  },
  {
    label: 'Jhon Gonzales',
    text: 'Coordinador del Museo Santa Teresa Cel:74235312',
    svg: <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="4" x2="12" y2="20"/><line x1="7" y1="9" x2="17" y2="9"/></svg>,
  },
];

function rv(anim) {
  return { color: '#b9912f', fontSize: '0.85rem', letterSpacing: '4px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 12, animation: `${anim} both linear`, animationTimeline: 'view()', animationRange: 'entry 0% cover 28%' };
}

const s = {
  hero: { height: 340, position: 'relative', overflow: 'hidden' },
  heroImg: { width: '100%', height: '100%', objectFit: 'cover', animation: 'kenburns 12s ease-out forwards' },
  heroOverlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,10,5,0.55), rgba(20,10,5,0.72))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 24px' },
  heroEye: { color: '#e8c97a', fontSize: '0.85rem', letterSpacing: '5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14, animation: 'heroUp 0.8s ease forwards', animationDelay: '0.1s' },
  heroTitle: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(2.2rem,5vw,3.4rem)', color: '#f8f4ee', fontWeight: 800, animation: 'heroUp 0.9s ease forwards', animationDelay: '0.25s' },
  iconWrap: { flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 46, height: 46, borderRadius: '50%', background: 'rgba(201,168,76,0.14)', color: '#b9912f' },
  infoLabel: { fontSize: '0.78rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#b9912f', marginBottom: 4 },
  infoText: { color: '#5a4535', fontSize: '0.95rem', lineHeight: 1.7 },
  whatsapp: { display: 'flex', gap: 20, alignItems: 'flex-start', background: '#fff', border: '1px solid #e3d6c2', borderRadius: 8, padding: '26px 28px', marginTop: 40 },
  whatsappIcon: { flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 52, height: 52, borderRadius: '50%', background: 'rgba(37,211,102,0.14)', color: '#25a35a' },
  whatsappTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.2rem', color: '#2c1810', marginBottom: 6 },
  whatsappText: { color: '#5a4535', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 16 },
  whatsappBtn: { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25a35a', color: '#fff', padding: '12px 22px', fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.5px', textTransform: 'uppercase', borderRadius: 4, textDecoration: 'none', transition: 'background 0.2s, transform 0.15s' },
};
