import axios from 'axios';
import { Response, Request, NextFunction } from 'express';

export class ReportProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

    async pingReport(req: Request, resp: Response, next: NextFunction): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/ping', {});
            return resp.status(res.status).json(res.data);
        } catch (err) {
            next();
        }
    }

    async createReport(req: Request, resp: Response, next: NextFunction): Promise<Response> {
        try {
            const res = await axios.post(this.path + '/report/create', req.body);
            return resp.status(res.status).json({...res.data});
        } catch (err) {
            next();
        }
    }
}
