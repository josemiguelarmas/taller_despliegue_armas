const express = require('express');
const cors = require('cors');
const operations = require('./operations');
const history = require('./history');

const app = express();
const PORT = process.env.PORT || 5000;
const startTime = Date.now();

app.use(cors());
app.use(express.json());

function validateNumbers(a, b) {
  return typeof a === 'number' && typeof b === 'number' && !Number.isNaN(a) && !Number.isNaN(b);
}

function handleOperation(operationName, operationFn) {
  return (req, res) => {
    const { a, b } = req.body;

    if (!validateNumbers(a, b)) {
      return res.status(400).json({ error: 'Los parámetros a y b deben ser números válidos' });
    }

    try {
      const result = operationFn(a, b);
      history.append({ operation: operationName, a, b, result });
      return res.json({ operation: operationName, a, b, result });
    } catch (err) {
      return res.status(err.status || 500).json({ error: err.message });
    }
  };
}

// HU1
app.post('/sum', handleOperation('sum', operations.sum));

// HU2
app.post('/subtract', handleOperation('subtract', operations.subtract));
app.post('/multiply', handleOperation('multiply', operations.multiply));

// HU4
app.post('/divide', handleOperation('divide', operations.divide));

// HU3
app.get('/history', (req, res) => {
  res.json(history.getLast(5));
});

// HU5
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
    writablePersistence: history.canWrite(),
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend escuchando en el puerto ${PORT}`);
});
