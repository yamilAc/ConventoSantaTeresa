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

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM noticias WHERE publicado=1 ORDER BY created_at DESC').all();
  res.json(rows);
});

router.get('/todas', requireAuth, (req, res) => {
  const rows = db.prepare('SELECT * FROM noticias ORDER BY created_at DESC').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM noticias WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'No encontrado' });
  res.json(row);
});

router.post('/', requireAuth, upload.single('imagen'), (req, res) => {
  const { titulo, contenido, publicado } = req.body;
  const imagen = req.file ? `/uploads/${req.file.filename}` : null;
  const r = db.prepare('INSERT INTO noticias (titulo, contenido, imagen, publicado) VALUES (?, ?, ?, ?)').run(titulo, contenido, imagen, publicado === 'false' ? 0 : 1);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, upload.single('imagen'), (req, res) => {
  const { titulo, contenido, publicado } = req.body;
  const noticia = db.prepare('SELECT * FROM noticias WHERE id = ?').get(req.params.id);
  if (!noticia) return res.status(404).json({ error: 'No encontrado' });
  const imagen = req.file ? `/uploads/${req.file.filename}` : noticia.imagen;
  db.prepare('UPDATE noticias SET titulo=?, contenido=?, imagen=?, publicado=? WHERE id=?').run(titulo, contenido, imagen, publicado === 'false' ? 0 : 1, req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  db.prepare('DELETE FROM noticias WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
