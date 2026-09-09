const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../database');
const { requireAuth } = require('./auth');

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 20 * 1024 * 1024 } });

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM galeria ORDER BY orden ASC, id ASC').all();
  res.json(rows);
});

router.post('/', requireAuth, upload.single('imagen'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Imagen requerida' });
  const { titulo } = req.body;
  const imagen = `/uploads/${req.file.filename}`;
  const maxOrden = db.prepare('SELECT MAX(orden) as m FROM galeria').get();
  const orden = (maxOrden.m || 0) + 1;
  const r = db.prepare('INSERT INTO galeria (titulo, imagen, orden) VALUES (?, ?, ?)').run(titulo || '', imagen, orden);
  res.json({ id: r.lastInsertRowid });
});

router.put('/:id', requireAuth, (req, res) => {
  const { titulo, orden } = req.body;
  db.prepare('UPDATE galeria SET titulo=?, orden=? WHERE id=?').run(titulo || '', orden || 0, req.params.id);
  res.json({ ok: true });
});

router.delete('/:id', requireAuth, (req, res) => {
  const foto = db.prepare('SELECT * FROM galeria WHERE id = ?').get(req.params.id);
  if (!foto) return res.status(404).json({ error: 'No encontrado' });
  if (foto.imagen.startsWith('/uploads/')) {
    const filePath = path.join(__dirname, '..', foto.imagen);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }
  db.prepare('DELETE FROM galeria WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
