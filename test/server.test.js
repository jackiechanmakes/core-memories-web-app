import request from 'supertest'
import app from '../app.js'

describe('loading express', function () {
  var server;
  beforeEach(function () {
    // server = require('./server');
  });
  afterEach(function () {
    server.close();
  });

  it('responds to /', async function testSlash(done) {
    await request(app).get("/events");
    // request(server)
    // .get('/events')
    // .expect(200, done);
  });

  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});
