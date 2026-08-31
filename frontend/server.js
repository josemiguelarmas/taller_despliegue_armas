const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const startTime = Date.now();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Expone la URL del backend al cliente sin hardcodearla en el HTML
app.get('/config', (req, res) => {
  res.json({ backendUrl: BACKEND_URL });
});

// HU5: estado del frontend, incluyendo si logra ver al backend
app.get('/status', async (req, res) => {
  const status = {
    service: 'frontend',
    status: 'ok',
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    backendUrl: BACKEND_URL,
    backendReachable: false,
  };

  try {
    const response = await fetch(`${BACKEND_URL}/health`);
    if (response.ok) {
      status.backendReachable = true;
      status.backendHealth = await response.json();
    }
  } catch {
    status.backendReachable = false;
  }

  res.json(status);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend escuchando en el puerto ${PORT}`);
  console.log(`Apuntando al backend en ${BACKEND_URL}`);
});
