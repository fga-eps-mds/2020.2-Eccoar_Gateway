import axios from 'axios';
import { Response, Request } from 'express';

export class ComplaintProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

    async pingComplaint(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/ping', {});
            return resp.status(res.status).json(res.data);
        } catch (err) {
            return resp.status(400).json({ "error": err.message });
        }
    }

    async listComplaints(req: Request, resp: Response): Promise<Response> {
        try{
            const res = await axios.get(this.path + '/complaints', {
                params: {
                    skip: String(req.query.skip),
                    take: String(req.query.take),
                    orderDate: String(req.query.orderDate)
                }
            });
            return resp.status(res.status).json(res.data);
        } catch (err) {
          return resp.status(400).json({ "error": err.message });
        }
    }

    async getComplaintWithVote(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/complaint/votes', {
                params: {
                    userId: Number(req.query.userId),
                    complaintId: Number(req.query.complaintId),
                }
            });
            return resp.status(res.status).json(res.data);
        } catch (err) {
          return resp.status(400).json({ "error": err.message });
        }
    }

    async createComplaint(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.post(this.path + '/complaint/create', req.body);
            return resp.status(res.status).json({ ...res.data });
        } catch (err) {
          return resp.status(400).json({ "error": err.message });
        }
    }

    async addVote(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.post(this.path + '/vote/add', req.body);
            return resp.sendStatus(res.status);
        } catch (err) {
          return resp.status(400).json({ "error": err.message });
        }
    }

    async listVote(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/vote/list', {
                params: {
                    userId: Number(req.query.userId),
                    skip: Number(req.query.skip),
                    take: Number(req.query.take)
                }
            });
            return resp.status(res.status).json(res.data);
        } catch (err) {
          return resp.status(400).json({ "error": err.message });
        }
    }
}
