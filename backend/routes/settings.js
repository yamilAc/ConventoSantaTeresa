const express = require('express');
const db = require('../database');
const { requireAuth } = require('./auth');

const router = express.Router();

function getSetting(clave, fallback = '') {
  const row = db.prepare('SELECT valor FROM settings WHERE clave = ?').get(clave);
  return row ? row.valor : fallback;
}

function setSetting(clave, valor) {
  const existe = db.prepare('SELECT clave FROM settings WHERE clave = ?').get(clave);
  if (existe) {
    db.prepare('UPDATE settings SET valor = ? WHERE clave = ?').run(valor, clave);
  } else {
    db.prepare('INSERT INTO settings (clave, valor) VALUES (?, ?)').run(clave, valor);
  }
}

// Público: el sitio principal necesita saber si está en mantenimiento y el número de WhatsApp
router.get('/', (req, res) => {
  res.json({
    mantenimiento: getSetting('mantenimiento', '0') === '1',
    whatsapp: getSetting('whatsapp', ''),
  });
});

// Protegido: solo el admin puede modificar la configuración
router.put('/', requireAuth, (req, res) => {
  if (typeof req.body.mantenimiento !== 'undefined') {
    setSetting('mantenimiento', req.body.mantenimiento ? '1' : '0');
  }

  if (typeof req.body.whatsapp !== 'undefined') {
    const soloDigitos = String(req.body.whatsapp).replace(/\D/g, '');
    if (!soloDigitos) return res.status(400).json({ error: 'Número de WhatsApp inválido' });
    setSetting('whatsapp', soloDigitos);
  }

  res.json({
    ok: true,
    mantenimiento: getSetting('mantenimiento', '0') === '1',
    whatsapp: getSetting('whatsapp', ''),
  });
});

module.exports = router;
