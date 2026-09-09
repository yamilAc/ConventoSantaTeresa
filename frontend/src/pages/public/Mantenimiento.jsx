export default function Mantenimiento() {
  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.icon}>✦</div>
        <p style={s.eyebrow}>Convento Santa Teresa</p>
        <h1 style={s.title}>Sitio en mantenimiento</h1>
        <p style={s.text}>
          Esta página web está momentáneamente en mantenimiento. Estamos trabajando para
          volver a estar disponibles pronto. Gracias por su paciencia.
        </p>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100dvh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f4ee',
    padding: 24,
  },
  card: {
    maxWidth: 480,
    textAlign: 'center',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    border: '1px solid rgba(201,168,76,0.5)',
    borderRadius: '50%',
    color: '#c9a84c',
    fontSize: '1.8rem',
    marginBottom: 20,
  },
  eyebrow: {
    color: '#8a7355',
    fontSize: '0.8rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    fontWeight: 700,
    marginBottom: 12,
  },
  title: {
    fontFamily: '"Playfair Display",serif',
    fontSize: 'clamp(1.6rem,4vw,2.2rem)',
    color: '#2c1810',
    marginBottom: 16,
  },
  text: {
    color: '#6b5744',
    fontSize: '1rem',
    lineHeight: 1.7,
  },
};
