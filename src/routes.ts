import { Router, Request, Response } from 'express';
import { paths } from './config/enviroments';
import { UsersProxy } from './api/users/UsersProxy';
import { ComplaintProxy } from './api/complaint/ComplaintProxy';
import { ReportProxy } from './api/report/ReportProxy';

const routers = Router();
const usersProxy = new UsersProxy(paths.configUsers());
const complaintProxy = new ComplaintProxy(paths.configComplaint());
const reportProxy = new ReportProxy(paths.configReport());

routers.get('/api/users/ping', async (req: Request, resp: Response) => {
	return await usersProxy.pingUser(req, resp);
});

routers.get('/api/complaints/ping', async (req: Request, resp: Response) => {
	return await complaintProxy.pingComplaint(req, resp);
});

routers.get('/api/complaints', async (req: Request, resp: Response) => {
	return await complaintProxy.listComplaints(req, resp);
});

routers.post('/api/complaints', async (req: Request, resp: Response) => {
	return await complaintProxy.createComplaint(req, resp);
});

routers.post('/api/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.addVote(req, resp);
});

routers.get('/api/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.listVote(req, resp);
});

routers.get('/api/reports/ping', async (req: Request, resp: Response) => {
	return await reportProxy.pingReport(req, resp);
});

routers.post('/api/reports', async (req: Request, resp: Response) => {
	return await reportProxy.createReport(req, resp);
});

routers.get('/api/complaints/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.getComplaintWithVote(req, resp);
});

export default routers;
