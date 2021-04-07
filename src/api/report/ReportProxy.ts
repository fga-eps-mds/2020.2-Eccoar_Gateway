import axios from 'axios';
import { Response, Request } from 'express';

export class ReportProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

    async pingReport(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/ping', {});
            return resp.status(res.status).json(res.data);
        } catch (err) {
            return resp.status(err.response.status).json(err.response.data);
        }
    }

	async createReport(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.post(
				this.path + '/report/create',
				req.body,
			);
			return resp.status(res.status).json({ ...res.data });
		} catch (err) {
			return resp.status(err.response.status).json(err.response.data);
		}
	}
}
