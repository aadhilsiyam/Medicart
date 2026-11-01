const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', price: 150 },
  { id: 2, name: 'Amoxicillin 250mg', price: 420 },
  { id: 3, name: 'Cetirizine 10mg', price: 90 },
  { id: 4, name: 'Vitamin C 1000mg', price: 300 },
];

let nextOrderId = 1;

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.env.APP_VERSION || 'dev' });
});

app.get('/api/medicines', (req, res) => {
  res.json(medicines);
});

app.get('/api/medicines/:id', (req, res) => {
  const medicine = medicines.find((m) => m.id === Number(req.params.id));
  if (!medicine) {
    return res.status(404).json({ error: 'Medicine not found' });
  }
  res.json(medicine);
});

app.post('/api/orders', (req, res) => {
  const items = req.body && req.body.items;
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Order must contain at least one item' });
  }

  let total = 0;
  for (const item of items) {
    const medicine = medicines.find((m) => m.id === item.id);
    if (!medicine || !Number.isInteger(item.qty) || item.qty < 1) {
      return res.status(400).json({ error: 'Invalid item in order' });
    }
    total += medicine.price * item.qty;
  }

  res.status(201).json({ orderId: nextOrderId++, total });
});

module.exports = app;
