import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const file = join(__dirname, '../src/db/db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, {});

await db.read();

// API Routes
app.get('/api/profiles', async (req, res) => {
  await db.read();
  res.json(db.data.profiles);
});

app.post('/api/profiles', async (req, res) => {
  await db.read();
  const id = Math.random().toString(36).substr(2, 4);
  const newProfile = { id, ...req.body };
  db.data.profiles.push(newProfile);
  await db.write();
  res.json(newProfile);
});

app.put('/api/profiles/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const index = db.data.profiles.findIndex(p => p.id === id);
  if (index !== -1) {
    db.data.profiles[index] = { ...db.data.profiles[index], ...req.body };
    await db.write();
    res.json(db.data.profiles[index]);
  } else {
    res.status(404).json({ error: 'Profile not found' });
  }
});

app.delete('/api/profiles/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  db.data.profiles = db.data.profiles.filter(p => p.id !== id);
  await db.write();
  res.status(204).send();
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '../dist')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 