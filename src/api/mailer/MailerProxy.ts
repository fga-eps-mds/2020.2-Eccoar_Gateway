import axios from 'axios';
import { Response, Request } from 'express';


export class MailerProxy {
    path: string;
    
    constructor(path: string) {
        this.path = path;
    }

    pingMailer(resp: Response): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/ping', {}).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(resp.json({"error": "error"}));
            });
        });
    }

    async sendMail(req: Request, resp: Response): Promise<Response> {
        try {
            const res = await axios.post(this.path + '/sendMail', req.body);
            return resp.sendStatus(res.status);
        } catch(err) {
            return resp.status(err.response.status).json(err.response.data);
        }
    }
}