import app from '../src/server'; // Link to your server file
import * as request from 'supertest';

app.get('/test', async (req, res) => {
    res.json({message: 'pass!'});
  });

describe("test endpoint", () => {

    it('gets the test endpoint', async done => {
        const response = await request(app).get('/test');
      
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('pass!');
        done();
      });

});
