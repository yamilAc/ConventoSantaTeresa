const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../database');
const { requireAuth } = require('./auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Público
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM eventos ORDER BY fecha ASC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM eventos WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'No encontrado' });
  res.json(row);
});

// Admin
router.post('/', requireAuth, upload.single('imagen'), (req, res) => {
  const { titulo, descripcion, fecha, hora } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;
  const r = db.prepare('INSERT INTO eventos (titulo, descripcion, fecha, hora, imagen) VALUES (?, ?, ?, ?, ?)').run(titulo, descripcion, fecha, hora || null, imagen);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, upload.single('imagen'), (req, res) => {
  const { titulo, descripcion, fecha, hora } = req.body;
  const evento = db.prepare('SELECT * FROM eventos WHERE id = ?').get(req.params.id);
  if (!evento) return res.status(404).json({ error: 'No encontrado' });
  const imagen = req.file ? `/uploads/${req.file.filename}` : evento.imagen;
  db.prepare('UPDATE eventos SET titulo=?, descripcion=?, fecha=?, hora=?, imagen=? WHERE id=?').run(titulo, descripcion, fecha, hora || null, imagen, req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM eventos WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
