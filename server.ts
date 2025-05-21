import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware de base
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'dist')));

// Health check pour Docker
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Route catch-all pour SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
