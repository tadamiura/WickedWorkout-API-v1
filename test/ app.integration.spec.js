const request = require('supertest');
const app = require('../app');

describe('Test routes', () => {
  it('GET / exercices', (done) => {
    request(app)
      .get('/api/exercices')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = {};
        expect(response.body).toEqual(expected);
        done();
      });
  });
});