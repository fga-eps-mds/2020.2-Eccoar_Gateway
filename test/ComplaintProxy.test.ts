import * as supertest from 'supertest';

describe("test get ping endpoint", () => {
  let server;
  const pingMock = {ping: 'pong'};

  beforeAll(async () => {
    const mod = await import('../src/server');
    server = (mod as any).default;
  });

  afterAll((done) => {
    server.close(done);
  });

  it('Get pong from ping, in complaints', async (done) => {
    supertest(server)
      .get('/api/complaints/ping')
      .expect('Content-Type', /json/)
      .expect(200, pingMock);
    done();
  });

  it('Get pong from ping, in users', async (done) => {
    supertest(server)
      .get('/api/users/ping')
      .expect('Content-Type', /json/)
      .expect(200, pingMock);
    done();
  });

  it('Get pong from ping, in reports', async (done) => {
    supertest(server)
      .get('/api/reports/ping')
      .expect('Content-Type', /json/)
      .expect(200, pingMock);
    done();
  });

});
