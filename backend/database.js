const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const db = new Database(path.join(__dirname, 'convento.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS eventos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT,
    imagen TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS galeria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    imagen TEXT NOT NULL,
    orden INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contenido (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seccion TEXT UNIQUE NOT NULL,
    titulo TEXT,
    texto TEXT,
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS noticias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    contenido TEXT NOT NULL,
    imagen TEXT,
    publicado INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS settings (
    clave TEXT PRIMARY KEY,
    valor TEXT
  );
`);

// Crear admin por defecto si no existe
const adminExists = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
if (!adminExists) {
  const hash = bcrypt.hashSync('admin123', 10);
  db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run('admin', hash);
  console.log('Admin creado: usuario=admin, password=admin123');
}

// Crear configuracion por defecto (modo mantenimiento apagado) si no existe
const mantenimientoExists = db.prepare('SELECT clave FROM settings WHERE clave = ?').get('mantenimiento');
if (!mantenimientoExists) {
  db.prepare('INSERT INTO settings (clave, valor) VALUES (?, ?)').run('mantenimiento', '0');
}

// Numero de WhatsApp de contacto por defecto (editable luego desde Configuración)
const whatsappExists = db.prepare('SELECT clave FROM settings WHERE clave = ?').get('whatsapp');
if (!whatsappExists) {
  db.prepare('INSERT INTO settings (clave, valor) VALUES (?, ?)').run('whatsapp', '59171817190');
}

// Insertar contenido inicial si no existe
const secciones = [
  {
    seccion: 'inicio',
    titulo: 'Convento Santa Teresa',
    texto: 'Bienvenidos al Monasterio de Carmelitas Descalzas Santa Teresa de Cochabamba, un patrimonio histórico del centro de Bolivia fundado en 1726.'
  },
  {
    seccion: 'historia',
    titulo: 'Nuestra Historia',
    texto: 'En 1726, el señor Juan Salvador Crespo y Melchora Macías donaron un solar de 10.000 metros cuadrados de la plaza de armas y 20.000 pesos para la construcción del futuro convento. Una vez concluida la construcción, el 24 de agosto, las 4 hermanas que vinieron de la ciudad de La Plata se trasladaron oficialmente al nuevo convento. Este convento fue mandado a construir en base a las normas y reglas que imponían el claustro de la orden, bajo la dirección del Arq. Pedro Nogales en 1718. El diseño del templo de Santa Teresa en Cochabamba se inspiró en el Templo de San Carlos de la Cuatro Fuentes en Roma, obra del arquitecto Francisco Borromini, construido durante el período Barroco.'
  },
  {
    seccion: 'mision',
    titulo: 'Nuestra Misión',
    texto: 'Somos una comunidad de Carmelitas Descalzas consagradas a la vida contemplativa, la oración y la adoración. Nuestra misión es ser testigos del amor de Dios a través de la vida de oración, silencio y fraternidad, ofreciendo nuestras vidas como intercesión por la Iglesia y el mundo.'
  },
  {
    seccion: 'visita',
    titulo: 'Visítanos',
    texto: 'La Iglesia del Convento Santa Teresa está ubicada en la Plaza del Granado, en el centro histórico de Cochabamba, Bolivia. La iglesia está abierta para la oración y las celebraciones litúrgicas. También contamos con el Museo Convento Santa Teresa donde podrá conocer la rica historia de nuestra comunidad.'
  }
];

for (const s of secciones) {
  const existe = db.prepare('SELECT id FROM contenido WHERE seccion = ?').get(s.seccion);
  if (!existe) {
    db.prepare('INSERT INTO contenido (seccion, titulo, texto) VALUES (?, ?, ?)').run(s.seccion, s.titulo, s.texto);
  }
}

// Insertar fotos de galería iniciales si no hay ninguna
const fotoCount = db.prepare('SELECT COUNT(*) as c FROM galeria').get();
if (fotoCount.c === 0) {
  const fotosIniciales = [
    { titulo: 'Fachada del Convento', imagen: '/fotos/foto_1.jpg', orden: 1 },
    { titulo: 'Claustro Interior', imagen: '/fotos/foto_2.jpg', orden: 2 },
    { titulo: 'Cúpula Principal', imagen: '/fotos/foto_3.jpg', orden: 3 },
    { titulo: 'Vista Norte', imagen: '/fotos/foto_4.jpg', orden: 4 },
    { titulo: 'Altar Mayor', imagen: '/fotos/foto_5.jpg', orden: 5 },
    { titulo: 'Corredores', imagen: '/fotos/foto_6.jpg', orden: 6 },
    { titulo: 'Jardín Central', imagen: '/fotos/foto_7.jpg', orden: 7 },
    { titulo: 'Detalles Arquitectónicos', imagen: '/fotos/foto_8.jpg', orden: 8 },
    { titulo: 'Vista Exterior', imagen: '/fotos/foto_9.jpg', orden: 9 },
    { titulo: 'Interior de la Iglesia', imagen: '/fotos/foto_10.jpg', orden: 10 },
  ];
  const ins = db.prepare('INSERT INTO galeria (titulo, imagen, orden) VALUES (?, ?, ?)');
  for (const f of fotosIniciales) ins.run(f.titulo, f.imagen, f.orden);
}

// Insertar eventos de ejemplo si no hay ninguno
const eventCount = db.prepare('SELECT COUNT(*) as c FROM eventos').get();
if (eventCount.c === 0) {
  const eventos = [
    { titulo: 'Santa Misa Dominical', descripcion: 'Celebración de la Santa Misa con la comunidad. Todos son bienvenidos a participar en este momento de oración y comunión.', fecha: '2026-07-06', hora: '09:00' },
    { titulo: 'Fiesta de Santa Teresa de Ávila', descripcion: 'Celebración especial en honor a nuestra patrona Santa Teresa de Ávila, con misa solemne y procesión.', fecha: '2026-10-15', hora: '10:00' },
    { titulo: 'Retiro Espiritual', descripcion: 'Jornada de retiro y reflexión espiritual abierta a la comunidad. Se requiere inscripción previa.', fecha: '2026-07-20', hora: '08:00' },
  ];
  const ins = db.prepare('INSERT INTO eventos (titulo, descripcion, fecha, hora) VALUES (?, ?, ?, ?)');
  for (const e of eventos) ins.run(e.titulo, e.descripcion, e.fecha, e.hora);
}

module.exports = db;
