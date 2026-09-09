const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const { router: authRouter } = require('./routes/auth');
app.use('/api/auth', authRouter);
app.use('/api/eventos', require('./routes/eventos'));
app.use('/api/galeria', require('./routes/galeria'));
app.use('/api/contenido', require('./routes/contenido'));
app.use('/api/noticias', require('./routes/noticias'));
app.use('/api/settings', require('./routes/settings'));

app.listen(PORT, () => console.log(`Backend corriendo en http://localhost:${PORT}`));
