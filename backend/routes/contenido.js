const express = require('express');
const db = require('../database');
const { requireAuth } = require('./auth');

const router = express.Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM contenido').all();
  res.json(rows);
});

router.get('/:seccion', (req, res) => {
  const row = db.prepare('SELECT * FROM contenido WHERE seccion = ?').get(req.params.seccion);
  if (!row) return res.status(404).json({ error: 'No encontrado' });
  res.json(row);
});

router.put('/:seccion', requireAuth, (req, res) => {
  const { titulo, texto } = req.body;
  const existe = db.prepare('SELECT id FROM contenido WHERE seccion = ?').get(req.params.seccion);
  if (existe) {
    db.prepare("UPDATE contenido SET titulo=?, texto=?, updated_at=datetime('now') WHERE seccion=?").run(titulo, texto, req.params.seccion);
  } else {
    db.prepare('INSERT INTO contenido (seccion, titulo, texto) VALUES (?, ?, ?)').run(req.params.seccion, titulo, texto);
  }
  res.json({ ok: true });
});

module.exports = router;
