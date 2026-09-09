const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const router = express.Router();
const SECRET = 'convento_santa_teresa_secret_2026';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: 'Datos requeridos' });

  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '8h' });
  res.json({ token, username: user.username });
});

router.post('/cambiar-password', requireAuth, (req, res) => {
  const { passwordActual, passwordNuevo } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.user.id);
  if (!bcrypt.compareSync(passwordActual, user.password)) {
    return res.status(400).json({ error: 'Contraseña actual incorrecta' });
  }
  const hash = bcrypt.hashSync(passwordNuevo, 10);
  db.prepare('UPDATE users SET password = ? WHERE id = ?').run(hash, req.user.id);
  res.json({ ok: true });
});

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'No autorizado' });
  try {
    req.user = jwt.verify(auth.replace('Bearer ', ''), SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = { router, requireAuth, SECRET };
