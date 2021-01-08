const request = require('supertest');
const app = require('../app');

describe('Test routes', () => {
  it('GET / warm up  ', (done) => {
    request(app)
      .get('/api/warmups')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = [{"name":"échauffement en 6 min par Fitness studio"},{"name":"échauffement en 7 min par ALexandre Auffret"},{"name":"échauffement long par ELLE Fitness"}];
        expect(response.body).toEqual(expected);
        done();
      });
  });
});