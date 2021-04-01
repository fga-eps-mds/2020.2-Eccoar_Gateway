import axios from 'axios';
import { response, Response, Request } from 'express';

export class ReportProxy {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    pingReport(): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/ping', {}).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(response.json({ "error": "error" }));
            });
        });
    }

    async createReport(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.post(this.path + '/report/create', req.body);
            return resp.status(res.status).json({...res.data});
        } catch (err) {
            return resp.status(err.response.status).json(err.response.data);
        }
    }
}