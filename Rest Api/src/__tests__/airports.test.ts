import request from 'supertest';
import createApp from '../app';

describe('GET /api/airports', () => {
  const app = createApp();

  it('returns airports data', async () => {
    const res = await request(app).get('/api/airports');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('AAA');
  });
});
