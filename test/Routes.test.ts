import axios from 'axios';
import * as request from 'supertest';
import { UsersProxy } from '../src/api/users/UsersProxy';
import app from '../src/server';

const agent = request(app);

const headers = {
	authorization:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoidG9rZW4ifQ.XXx47Hiq9qlQgyNyhZ6-z2MGTH7e2L0kfaB17YXPsKA',
};

describe('test get ping endpoint', () => {
	const pingMock = {
		status: 200,
		body: '',
	};

	it('Get pong from ping in users route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await agent.get('/api/users/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});

	it('Get pong from ping in complaints route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await agent.get('/api/complaints/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});

	it('Get pong from ping in reports route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await agent.get('/api/reports/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});
});

describe('test complaints route', () => {
	beforeEach(() => {
		UsersProxy.prototype.authorization = jest
			.fn()
			.mockImplementationOnce(() => '123123');
	});

	const mockStatus = {
		status: 200,
	};

	const errorStatus = {
		response: {
			status: 404,
		},
	};

	it('Test get complaints API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent.get('/api/complaints').set(headers).send({});
		expect(result.status).toEqual(200);
	});

	it('Test delete complaints API', async () => {
		jest.spyOn(axios, 'delete').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent
			.delete('/api/complaints')
			.set(headers)
			.send({});
		expect(result.status).toEqual(200);
	});

	it('Test create complaints API', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent
			.post('/api/complaints')
			.set(headers)
			.send({});
		expect(result.status).toEqual(200);
	});

	it('Test adds vote API', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent.post('/api/votes').set(headers).send({});
		expect(result.status).toEqual(200);
	});

	it('Test remove vote API', async () => {
		jest.spyOn(axios, 'delete').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).delete('/api/vote').send({});
		expect(result.status).toEqual(200);
	});

	it('Test remove vote API error', async () => {
		jest.spyOn(axios, 'delete').mockImplementationOnce(() =>
			Promise.reject(errorStatus),
		);
		const result = await request(app).delete('/api/vote').send({});
		expect(result.status).toEqual(404);
	});

	it('Test lists votes API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent.get('/api/votes').set(headers).send({});
		expect(result.status).toEqual(200);
	});

	it('Test gets complaints with votes API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await agent
			.get('/api/complaints/votes')
			.set(headers)
			.send({});
		expect(result.status).toEqual(200);
	});

	it('Test return JWT token', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() => {
			return Promise.resolve({ status: 200 });
		});
		const result = await agent
			.post('/api/signin')
			.send({ email: 'mockEmail', password: 'mockPassword' });
		expect(result.status).toEqual(200);
	});

	it('Test fail to login', async () => {
		const mockError = {
			response: {
				status: 400,
			},
			data: {},
		};
		jest.spyOn(axios, 'post').mockImplementationOnce(() => {
			return Promise.reject(mockError);
		});
		const result = await agent.post('/api/signin').send({});
		expect(result.status).toEqual(400);
	});
});

describe('Test User route', () => {
	const mockStatus = {
		status: 200,
	};

	it('Test create user route', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).post('/api/users').send({});
		expect(result.status).toEqual(200);
	});
});
