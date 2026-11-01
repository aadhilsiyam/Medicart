const request = require('supertest');
const app = require('./app');

describe('MediCart API', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /api/medicines returns the catalogue', async () => {
    const res = await request(app).get('/api/medicines');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(4);
  });

  test('GET /api/medicines/:id returns one medicine', async () => {
    const res = await request(app).get('/api/medicines/1');
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Paracetamol 500mg');
    expect(res.body.price).toBe(150);
  });

  test('GET /api/medicines/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/medicines/999');
    expect(res.statusCode).toBe(404);
  });

  test('POST /api/orders calculates the total', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ id: 1, qty: 2 }, { id: 3, qty: 1 }] });
    expect(res.statusCode).toBe(201);
    expect(res.body.total).toBe(390); // 2 x 150 + 1 x 90
  });

  test('POST /api/orders rejects an empty order', async () => {
    const res = await request(app).post('/api/orders').send({ items: [] });
    expect(res.statusCode).toBe(400);
  });

  test('POST /api/orders rejects an invalid item', async () => {
    const res = await request(app)
      .post('/api/orders')
      .send({ items: [{ id: 999, qty: 1 }] });
    expect(res.statusCode).toBe(400);
  });
});
