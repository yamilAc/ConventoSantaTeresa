import { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';

const empty = { titulo: '', descripcion: '', fecha: '', hora: '', imagen: null };

const lbl = { display: 'block', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b5744', marginBottom: 6 };
const inp = { width: '100%', padding: '10px 13px', border: '1px solid #d8cbb6', borderRadius: 3, fontSize: '0.95rem', color: '#2c1810', outline: 'none', fontFamily: 'Lato,sans-serif', background: '#fff' };

export default function AdminEventos() {
  const { token } = useAuth();
  const [eventos, setEventos] = useState([]);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState(null);
  const [msg, setMsg] = useState('');
  const [showForm, setShowForm] = useState(false);

  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => { cargar(); }, []);

  async function cargar() {
    const data = await fetch('/api/eventos').then(r => r.json());
    setEventos(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => v != null && fd.append(k, v));
    const url = editId ? `/api/eventos/${editId}` : '/api/eventos';
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers, body: fd });
    if (res.ok) {
      setMsg(editId ? 'Evento actualizado.' : 'Evento creado.');
      setForm(empty); setEditId(null); setShowForm(false); cargar();
    }
    setTimeout(() => setMsg(''), 3000);
  }

  async function eliminar(id) {
    if (!confirm('¿Eliminar este evento?')) return;
    await fetch(`/api/eventos/${id}`, { method: 'DELETE', headers });
    cargar();
  }

  function editar(e) {
    setForm({ titulo: e.titulo, descripcion: e.descripcion, fecha: e.fecha, hora: e.hora || '', imagen: null });
    setEditId(e.id); setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const formatFecha = d => new Date(d + 'T12:00:00').toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <AdminLayout title="Gestión de Eventos">
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22, animation: 'adminUp 0.5s ease forwards' }}>
        <p style={{ color: '#6b5744', fontSize: '0.92rem' }}>{eventos.length} evento(s) registrado(s)</p>
        <button
          onClick={() => { setForm(empty); setEditId(null); setShowForm(true); }}
          style={{ background: '#c9a84c', color: '#2c1810', border: 'none', padding: '11px 22px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif', transition: 'background 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = '#e8c97a'}
          onMouseOut={e => e.currentTarget.style.background = '#c9a84c'}
        >+ Nuevo Evento</button>
      </div>

      {msg && (
        <div style={{ display: 'inline-block', marginBottom: 16, padding: '8px 18px', background: 'rgba(58,157,93,0.12)', border: '1px solid rgba(58,157,93,0.3)', borderRadius: 4, color: '#2c7a4b', fontSize: '0.88rem', fontWeight: 700, animation: 'toastIn 0.3s ease forwards' }}>
          ✓ {msg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', padding: 28, marginBottom: 28, boxShadow: '0 3px 14px rgba(0,0,0,0.08)', borderLeft: '4px solid #c9a84c', borderRadius: '0 6px 6px 0', animation: 'adminUp 0.4s ease forwards' }}>
          <h3 style={{ fontFamily: '"Playfair Display",serif', fontSize: '1.2rem', color: '#2c1810', marginBottom: 20 }}>{editId ? 'Editar Evento' : 'Nuevo Evento'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 16 }}>
              <div><label style={lbl}>Título *</label><input required style={inp} value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} /></div>
              <div><label style={lbl}>Fecha *</label><input required type="date" style={inp} value={form.fecha} onChange={e => setForm(f => ({ ...f, fecha: e.target.value }))} /></div>
              <div><label style={lbl}>Hora</label><input type="time" style={inp} value={form.hora} onChange={e => setForm(f => ({ ...f, hora: e.target.value }))} /></div>
              <div><label style={lbl}>Imagen</label><input type="file" accept="image/*" style={{ width: '100%', padding: '8px 0', fontSize: '0.85rem' }} onChange={e => setForm(f => ({ ...f, imagen: e.target.files[0] }))} /></div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label style={lbl}>Descripción *</label>
              <textarea required rows={3} style={{ ...inp, resize: 'vertical' }} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="submit" style={{ background: '#c9a84c', color: '#2c1810', border: 'none', padding: '11px 22px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif' }}>
                {editId ? 'Actualizar' : 'Crear Evento'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); setEditId(null); setForm(empty); }}
                style={{ background: 'transparent', color: '#b9912f', border: '2px solid #c9a84c', padding: '9px 20px', fontWeight: 700, fontSize: '0.82rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif' }}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(44,24,16,0.07)', borderRadius: 6, overflow: 'hidden', animation: 'adminUp 0.55s ease forwards' }}>
        {eventos.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center', color: '#6b5744' }}>No hay eventos registrados. ¡Cree el primero!</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f6efe2' }}>
                {['Título', 'Fecha', 'Hora', 'Acciones'].map((h, i) => (
                  <th key={h} style={{ padding: '13px 18px', textAlign: i === 3 ? 'right' : 'left', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#6b5744', borderBottom: '2px solid #e6dac9' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {eventos.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #f0e8d8' }}
                  onMouseOver={ev => ev.currentTarget.style.background = '#faf6ee'}
                  onMouseOut={ev => ev.currentTarget.style.background = ''}>
                  <td style={{ padding: '15px 18px', verticalAlign: 'top' }}>
                    <strong style={{ color: '#2c1810' }}>{e.titulo}</strong><br />
                    <span style={{ color: '#8a7355', fontSize: '0.82rem' }}>{e.descripcion?.slice(0, 70)}…</span>
                  </td>
                  <td style={{ padding: '15px 18px', fontSize: '0.9rem', color: '#5a4535', whiteSpace: 'nowrap' }}>{formatFecha(e.fecha)}</td>
                  <td style={{ padding: '15px 18px', fontSize: '0.9rem', color: '#5a4535' }}>{e.hora || '—'}</td>
                  <td style={{ padding: '15px 18px' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button onClick={() => editar(e)} style={{ background: '#f0e8d8', color: '#5a4535', border: 'none', padding: '7px 14px', fontSize: '0.82rem', borderRadius: 4, cursor: 'pointer', fontFamily: 'Lato,sans-serif' }}>Editar</button>
                      <button onClick={() => eliminar(e.id)} style={{ background: '#c0392b', color: '#fff', border: 'none', padding: '7px 14px', fontSize: '0.82rem', borderRadius: 4, cursor: 'pointer', fontFamily: 'Lato,sans-serif' }}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
