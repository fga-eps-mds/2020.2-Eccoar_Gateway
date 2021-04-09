import axios from 'axios';
import * as request from 'supertest';
import app from '../src/server';

describe("test get ping endpoint", () => {
  const ping = {
    status: 200,
    body: {ping: "pong"}
  };

  it('Get pong from ping', async () => {
    jest.spyOn(axios, 'get').mockImplementationOnce(() => Promise.resolve(ping));
      const result = await request(app).get('/api/users/api').send({});
      expect(result.status).toEqual(200);
    });
});

