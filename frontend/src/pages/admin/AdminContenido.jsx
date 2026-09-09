import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const SECCIONES = [
  { key: 'inicio',   label: 'Inicio',   desc: 'Texto de bienvenida de la página principal.' },
  { key: 'historia', label: 'Historia', desc: 'Historia del convento visible en la página Historia.' },
  { key: 'mision',   label: 'Misión',   desc: 'Descripción de la vocación carmelita.' },
  { key: 'visita',   label: 'Visita',   desc: 'Horarios, ubicación e información para visitantes.' },
];

const lbl = { display: 'block', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b5744', marginBottom: 6 };
const inp = { width: '100%', padding: '10px 13px', border: '1px solid #d8cbb6', borderRadius: 3, fontSize: '0.95rem', color: '#2c1810', outline: 'none', fontFamily: 'Lato,sans-serif', background: '#fff' };

export default function AdminContenido() {
  const { token } = useAuth();
  const [contenido, setContenido] = useState({});
  const [forms, setForms] = useState({});
  const [savedIdx, setSavedIdx] = useState(null);
  const timers = {};

  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetch('/api/contenido').then(r => r.json()).then(rows => {
      const map = {};
      rows.forEach(r => { map[r.seccion] = r; });
      setContenido(map);
      const f = {};
      SECCIONES.forEach(s => { f[s.key] = { titulo: map[s.key]?.titulo || '', texto: map[s.key]?.texto || '' }; });
      setForms(f);
    });
  }, []);

  async function handleSave(key, i) {
    const res = await fetch(`/api/contenido/${key}`, { method: 'PUT', headers, body: JSON.stringify(forms[key]) });
    if (res.ok) {
      setContenido(prev => ({ ...prev, [key]: { ...prev[key], ...forms[key] } }));
      setSavedIdx(i);
      clearTimeout(timers[key]);
      timers[key] = setTimeout(() => setSavedIdx(s => s === i ? null : s), 2200);
    }
  }

  return (
    <AdminLayout title="Editar Contenido del Sitio">
      <p style={{ color: '#6b5744', fontSize: '0.92rem', marginBottom: 26, animation: 'adminUp 0.5s ease forwards' }}>
        Edite los textos que aparecen en las páginas públicas. Los cambios se reflejan al guardar cada sección.
      </p>

      <div style={{ maxWidth: 860 }}>
        {SECCIONES.map((sec, i) => (
          <div key={sec.key} style={{ background: '#fff', padding: '26px 28px', marginBottom: 22, boxShadow: '0 2px 12px rgba(44,24,16,0.07)', borderRadius: 8, borderLeft: '4px solid #c9a84c', animation: 'adminUp 0.55s ease forwards' }}>
            {/* Card header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 34, height: 34, borderRadius: 8, background: 'rgba(201,168,76,0.15)', color: '#b9912f', fontFamily: '"Playfair Display",serif', fontWeight: 700, fontSize: '1rem' }}>
                {sec.label[0]}
              </span>
              <div>
                <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.18rem', color: '#2c1810', lineHeight: 1.2 }}>{sec.label}</h3>
                <p style={{ fontSize: '0.78rem', color: '#a09070', marginTop: 2 }}>{sec.desc}</p>
              </div>
            </div>

            {/* Fields */}
            <div style={{ marginBottom: 14 }}>
              <label style={lbl}>Título</label>
              <input style={inp} value={forms[sec.key]?.titulo || ''}
                onChange={e => setForms(f => ({ ...f, [sec.key]: { ...f[sec.key], titulo: e.target.value } }))}
                onFocus={ev => ev.target.style.borderColor = '#c9a84c'}
                onBlur={ev => ev.target.style.borderColor = '#d8cbb6'} />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={lbl}>Texto</label>
              <textarea rows={4} style={{ ...inp, resize: 'vertical' }} value={forms[sec.key]?.texto || ''}
                onChange={e => setForms(f => ({ ...f, [sec.key]: { ...f[sec.key], texto: e.target.value } }))}
                onFocus={ev => ev.target.style.borderColor = '#c9a84c'}
                onBlur={ev => ev.target.style.borderColor = '#d8cbb6'} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <button onClick={() => handleSave(sec.key, i)}
                style={{ background: '#c9a84c', color: '#2c1810', border: 'none', padding: '10px 22px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif', transition: 'background 0.2s' }}
                onMouseOver={e => e.currentTarget.style.background = '#e8c97a'}
                onMouseOut={e => e.currentTarget.style.background = '#c9a84c'}>
                Guardar sección
              </button>
              {savedIdx === i && (
                <span style={{ color: '#2c7a4b', fontSize: '0.88rem', fontWeight: 700, animation: 'toastIn 0.3s ease forwards' }}>
                  ✓ Guardado
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
