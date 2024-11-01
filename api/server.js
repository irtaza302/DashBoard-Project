import express from 'express';
import cors from 'cors';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Create db.json in the api directory if it doesn't exist
const defaultData = {
  profiles: [
    // Your initial data here
  ]
};

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database setup - Use different paths for production and development
const dbFile = process.env.NODE_ENV === 'production'
  ? join(__dirname, 'db.json')  // Store in api directory for production
  : join(__dirname, '../src/db/db.json');  // Development path

const adapter = new JSONFile(dbFile);
const db = new Low(adapter, defaultData);

// Initialize database if it doesn't exist
try {
  await db.read();
  if (!db.data) {
    db.data = defaultData;
    await db.write();
  }
} catch (error) {
  console.error('Database initialization error:', error);
  db.data = defaultData;
  await db.write();
}

// API Routes
app.get('/api/profiles', async (req, res) => {
  try {
    await db.read();
    res.json(db.data.profiles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
});

app.post('/api/profiles', async (req, res) => {
  try {
    await db.read();
    const id = Math.random().toString(36).substr(2, 4);
    const newProfile = { id, ...req.body };
    db.data.profiles.push(newProfile);
    await db.write();
    res.json(newProfile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create profile' });
  }
});

app.put('/api/profiles/:id', async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

app.delete('/api/profiles/:id', async (req, res) => {
  try {
    await db.read();
    const { id } = req.params;
    db.data.profiles = db.data.profiles.filter(p => p.id !== id);
    await db.write();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete profile' });
  }
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