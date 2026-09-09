import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

export default function AdminSettings() {
  const { token } = useAuth();
  const { mantenimiento, setMantenimiento, whatsapp, setWhatsapp, loaded } = useSettings();
  const [form, setForm] = useState({ passwordActual: '', passwordNuevo: '', passwordConfirm: '' });
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [savingMant, setSavingMant] = useState(false);
  const [whatsappInput, setWhatsappInput] = useState('');
  const [whatsappSynced, setWhatsappSynced] = useState(false);
  const [savingWpp, setSavingWpp] = useState(false);
  const [wppMsg, setWppMsg] = useState('');

  useEffect(() => {
    if (loaded && !whatsappSynced) {
      setWhatsappInput(whatsapp);
      setWhatsappSynced(true);
    }
  }, [loaded, whatsapp, whatsappSynced]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(''); setError('');
    if (form.passwordNuevo !== form.passwordConfirm) { setError('Las contraseñas nuevas no coinciden.'); return; }
    if (form.passwordNuevo.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return; }
    const res = await fetch('/api/auth/cambiar-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ passwordActual: form.passwordActual, passwordNuevo: form.passwordNuevo }),
    });
    const data = await res.json();
    if (res.ok) {
      setMsg('✓ Contraseña actualizada');
      setForm({ passwordActual: '', passwordNuevo: '', passwordConfirm: '' });
      setTimeout(() => setMsg(''), 3000);
    } else {
      setError(data.error || 'Error al cambiar contraseña.');
    }
  }

  async function toggleMantenimiento() {
    const next = !mantenimiento;
    setSavingMant(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ mantenimiento: next }),
      });
      if (res.ok) setMantenimiento(next);
    } finally {
      setSavingMant(false);
    }
  }

  async function saveWhatsapp(e) {
    e.preventDefault();
    setWppMsg('');
    setSavingWpp(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ whatsapp: whatsappInput }),
      });
      const data = await res.json();
      if (res.ok) {
        setWhatsapp(data.whatsapp);
        setWhatsappInput(data.whatsapp);
        setWppMsg('✓ Número actualizado');
        setTimeout(() => setWppMsg(''), 3000);
      } else {
        setWppMsg(data.error || 'Error al guardar el número.');
      }
    } catch {
      setWppMsg('Error de conexión con el servidor.');
    } finally {
      setSavingWpp(false);
    }
  }

  return (
    <AdminLayout title="Configuración">
      <div style={{ maxWidth: 720 }}>

        {/* CONTRASEÑA */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Cambiar Contraseña</h3>
          <p style={s.cardDesc}>Se recomienda usar una contraseña distinta a la de fábrica.</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={s.label}>Contraseña actual</label>
              <input type="password" required value={form.passwordActual} onChange={e => setForm(f => ({ ...f, passwordActual: e.target.value }))} style={s.input} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 8 }}>
              <div>
                <label style={s.label}>Nueva contraseña</label>
                <input type="password" required value={form.passwordNuevo} onChange={e => setForm(f => ({ ...f, passwordNuevo: e.target.value }))} style={s.input} />
              </div>
              <div>
                <label style={s.label}>Confirmar contraseña</label>
                <input type="password" required value={form.passwordConfirm} onChange={e => setForm(f => ({ ...f, passwordConfirm: e.target.value }))} style={s.input} />
              </div>
            </div>
            {error && <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: 10 }}>{error}</p>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 16 }}>
              <button type="submit" style={s.btnGold}>Actualizar Contraseña</button>
              {msg && <span style={{ color: '#2c7a4b', fontSize: '0.88rem', fontWeight: 700, animation: 'toastIn 0.3s ease forwards' }}>{msg}</span>}
            </div>
          </form>
        </div>

        {/* PREFERENCIAS */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Preferencias del Sitio</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0' }}>
            <div>
              <div style={{ fontWeight: 700, color: '#2c1810', fontSize: '0.95rem', marginBottom: 3 }}>Modo mantenimiento</div>
              <div style={{ color: '#8a7355', fontSize: '0.85rem' }}>Mostrar el sitio público como no disponible temporalmente.</div>
            </div>
            <button
              onClick={toggleMantenimiento}
              disabled={savingMant}
              aria-label="toggle"
              style={{ width: 44, height: 24, borderRadius: 12, border: 'none', padding: 2, background: mantenimiento ? '#c9a84c' : '#d8cbb6', position: 'relative', cursor: savingMant ? 'wait' : 'pointer', transition: 'background 0.25s', flexShrink: 0, display: 'block', opacity: savingMant ? 0.6 : 1 }}
            >
              <span style={{ display: 'block', width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.3)', transition: 'transform 0.25s', transform: mantenimiento ? 'translateX(20px)' : 'translateX(0)' }} />
            </button>
          </div>
          {mantenimiento && (
            <p style={{ marginTop: 10, color: '#b9770e', fontSize: '0.82rem' }}>
              ⚠ El sitio público está mostrando el aviso de mantenimiento a los visitantes.
            </p>
          )}
        </div>

        {/* WHATSAPP */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Contacto por WhatsApp</h3>
          <p style={s.cardDesc}>Número al que llegan los mensajes del botón "Contactar por WhatsApp" de la página pública de Contacto.</p>
          <form onSubmit={saveWhatsapp}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <label style={s.label}>Número de WhatsApp (con código de país)</label>
                <input
                  required
                  value={whatsappInput}
                  onChange={e => setWhatsappInput(e.target.value)}
                  placeholder="Ej: 59171817190"
                  style={s.input}
                />
              </div>
              <button type="submit" disabled={savingWpp} style={{ ...s.btnGold, opacity: savingWpp ? 0.7 : 1 }}>
                {savingWpp ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
            {wppMsg && (
              <p style={{ marginTop: 10, fontSize: '0.85rem', fontWeight: 700, color: wppMsg.startsWith('✓') ? '#2c7a4b' : '#c0392b' }}>{wppMsg}</p>
            )}
          </form>
        </div>

        {/* INFO SISTEMA */}
        <div style={s.card}>
          <h3 style={s.cardTitle}>Información del Sistema</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, fontSize: '0.9rem', marginBottom: 20 }}>
            {[['Sitio', 'Convento Santa Teresa'], ['Versión', '1.0.0'], ['Backend', 'Node.js + Express'], ['Base de datos', 'SQLite'], ['Frontend', 'React + Vite'], ['Ubicación', 'Cochabamba, Bolivia']].map(([k, v]) => (
              <div key={k}><span style={{ color: '#8a7355' }}>{k}:</span> <strong style={{ color: '#2c1810' }}>{v}</strong></div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

const s = {
  card: { background: '#fff', padding: '28px 30px', marginBottom: 24, boxShadow: '0 2px 12px rgba(44,24,16,0.07)', borderRadius: 8, borderLeft: '4px solid #c9a84c', animation: 'adminUp 0.5s ease forwards' },
  cardTitle: { fontFamily: '"Playfair Display",serif', fontSize: '1.2rem', color: '#2c1810', marginBottom: 6 },
  cardDesc: { color: '#8a7355', fontSize: '0.88rem', marginBottom: 20 },
  label: { display: 'block', fontWeight: 700, fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#6b5744', marginBottom: 6 },
  input: { width: '100%', padding: '10px 13px', border: '1px solid #d8cbb6', borderRadius: 3, fontSize: '0.95rem', outline: 'none', fontFamily: 'Lato,sans-serif', transition: 'border-color 0.2s' },
  btnGold: { background: '#c9a84c', color: '#2c1810', border: 'none', padding: '11px 24px', fontWeight: 700, fontSize: '0.84rem', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 4, fontFamily: 'Lato,sans-serif', transition: 'background 0.2s, transform 0.15s' },
};
