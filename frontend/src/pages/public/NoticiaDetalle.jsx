import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PublicLayout from '../../components/PublicLayout';

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    fetch(`/api/noticias/${id}`).then(r => r.json()).then(setNoticia);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (!noticia) return <PublicLayout><div className="loading">Cargando...</div></PublicLayout>;

  const fechaLarga = new Date(noticia.created_at).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <PublicLayout>
      <article style={s.article}>
        {noticia.imagen && (
          <img src={noticia.imagen} alt={noticia.titulo} style={s.img} />
        )}
        <p style={s.meta}>{fechaLarga}</p>
        <h1 style={s.title}>{noticia.titulo}</h1>
        <div style={s.divider} />
        <div style={s.content}>
          {noticia.contenido.split('\n').map((p, i) =>
            p ? <p key={i} style={s.para}>{p}</p> : <br key={i} />
          )}
        </div>
        <Link to="/noticias" style={s.back}>← Volver a Noticias</Link>
      </article>
    </PublicLayout>
  );
}

const s = {
  article: { maxWidth: 800, margin: '56px auto 80px', padding: '0 24px', animation: 'artIn 0.4s ease forwards' },
  img: { width: '100%', maxHeight: 440, objectFit: 'cover', marginBottom: 38, borderRadius: 4 },
  meta: { color: '#b9912f', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12, fontFamily: 'Lato,sans-serif' },
  title: { fontFamily: '"Playfair Display",serif', fontSize: 'clamp(1.7rem,4vw,2.4rem)', color: '#2c1810', lineHeight: 1.28, marginBottom: 16 },
  divider: { width: 60, height: 3, background: '#c9a84c', marginBottom: 30 },
  content: {},
  para: { color: '#5a4535', fontSize: '1.06rem', lineHeight: 1.95, marginBottom: 20 },
  back: {
    display: 'inline-block', marginTop: 40,
    background: 'none', border: '2px solid #c9a84c', color: '#b9912f',
    padding: '11px 26px', fontWeight: 700, fontSize: '0.84rem',
    letterSpacing: '1.2px', textTransform: 'uppercase', borderRadius: 2,
    transition: 'background 0.25s, color 0.25s',
  },
};
