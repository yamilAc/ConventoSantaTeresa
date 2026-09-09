import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const lbl = { display: 'block', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b5744', marginBottom: 6 };
const inp = { width: '100%', padding: '10px 13px', border: '1px solid #d8cbb6', borderRadius: 3, fontSize: '0.95rem', color: '#2c1810', outline: 'none', fontFamily: 'Lato,sans-serif', background: '#fff' };

export default function AdminGaleria() {
  const { token } = useAuth();
  const [fotos, setFotos] = useState([]);
  const [file, setFile] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [msg, setMsg] = useState('');
  const [uploading, setUploading] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { cargar(); }, []);
  async function cargar() {
    const data = await fetch('/api/galeria').then(r => r.json());
    setFotos(data);
  }

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('imagen', file);
    fd.append('titulo', titulo);
    const res = await fetch('/api/galeria', { method: 'POST', headers, body: fd });
    if (res.ok) { setMsg('Foto subida correctamente.'); setFile(null); setTitulo(''); cargar(); }
    else setMsg('Error al subir la foto.');
    setUploading(false);
    setTimeout(() => setMsg(''), 3000);
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminar esta foto de la galería?')) return;
    await fetch(`/api/galeria/${id}`, { method: 'DELETE', headers });
    cargar();
  }

  async function updateTitulo(id, t) {
    const foto = fotos.find(f => f.id === id);
    await fetch(`/api/galeria/${id}`, { method: 'PUT', headers: { ...headers, 'Content-Type': 'application/json' }, body: JSON.stringify({ titulo: t, orden: foto.orden }) });
    setFotos(prev => prev.map(f => f.id === id ? { ...f, titulo: t } : f));
  }

  return (
    <AdminLayout title="Gestión de Galería">
      {/* Upload card */}
      <div style={{ background: '#fff', padding: 24, marginBottom: 26, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', borderLeft: '4px solid #c9a84c', borderRadius: '0 6px 6px 0', animation: 'adminUp 0.5s ease forwards' }}>
        <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.15rem', color: '#2c1810', marginBottom: 16 }}>Subir Nueva Fotografía</h3>
        <form onSubmit={handleUpload} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={lbl}>Imagen *</label>
            <input required type="file" accept="image/*" style={{ width: '100%', padding: '9px 0', fontSize: '0.85rem' }} onChange={e => setFile(e.target.files[0])} />
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <label style={lbl}>Título / Descripción</label>
            <input style={inp} placeholder="Ej: Claustro interior" value={titulo} onChange={e => setTitulo(e.target.value)} />
          </div>
          <button type="submit" disabled={uploading}
            style={{ background: '#c9a84c', color: '#2c1810', border: 'none', padding: '11px 22px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif', flexShrink: 0 }}
            onMouseOver={e => e.currentTarget.style.background = '#e8c97a'}
            onMouseOut={e => e.currentTarget.style.background = '#c9a84c'}>
            {uploading ? 'Subiendo...' : '+ Subir Foto'}
          </button>
        </form>
        {msg && (
          <div style={{ marginTop: 12, display: 'inline-block', padding: '7px 16px', background: 'rgba(58,157,93,0.12)', border: '1px solid rgba(58,157,93,0.3)', borderRadius: 4, color: '#2c7a4b', fontSize: '0.86rem', fontWeight: 700, animation: 'toastIn 0.3s ease forwards' }}>
            ✓ {msg}
          </div>
        )}
      </div>

      <p style={{ fontSize: '0.9rem', color: '#6b5744', marginBottom: 16 }}>
        <strong>{fotos.length}</strong> fotos en la galería. Haga clic en el título para editarlo.
      </p>

      {/* Photo grid */}
      {fotos.length === 0 ? (
        <div style={{ padding: 48, textAlign: 'center', color: '#6b5744', background: '#fff', borderRadius: 6 }}>No hay fotos en la galería.</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 16 }}>
          {fotos.map(foto => (
            <div key={foto.id}
              style={{ background: '#fff', boxShadow: '0 2px 10px rgba(44,24,16,0.07)', overflow: 'hidden', borderRadius: 6, animation: 'pop 0.4s ease forwards', transition: 'transform 0.25s, box-shadow 0.25s' }}
              onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 26px rgba(44,24,16,0.14)'; }}
              onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 10px rgba(44,24,16,0.07)'; }}>
              <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                <img src={foto.imagen} alt={foto.titulo || 'Foto'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '10px 12px 14px' }}>
                <input
                  value={foto.titulo || ''}
                  placeholder="Añadir título…"
                  style={{ width: '100%', border: '1px solid #e6dac9', padding: '6px 10px', fontSize: '0.82rem', color: '#3a2a1a', outline: 'none', borderRadius: 3, fontFamily: 'Lato,sans-serif', background: '#fff' }}
                  onChange={e => setFotos(prev => prev.map(f => f.id === foto.id ? { ...f, titulo: e.target.value } : f))}
                  onBlur={e => updateTitulo(foto.id, e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#c9a84c'}
                />
                <button onClick={() => eliminar(foto.id)}
                  style={{ width: '100%', marginTop: 8, background: '#c0392b', color: '#fff', border: 'none', padding: 7, fontSize: '0.82rem', borderRadius: 4, cursor: 'pointer', fontFamily: 'Lato,sans-serif', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = '#a93226'}
                  onMouseOut={e => e.currentTarget.style.background = '#c0392b'}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
