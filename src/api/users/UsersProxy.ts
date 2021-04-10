import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export class UsersProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

    async pingUser(req: Request, resp: Response, next: NextFunction): Promise<Response> {
        try {
            const res = await axios.get(this.path + '/ping', {});
            return resp.status(res.status).json(res.data);
        } catch (err) {
            next();
        }
    }
}
