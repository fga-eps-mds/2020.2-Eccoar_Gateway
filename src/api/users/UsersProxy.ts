import { response, Response } from 'express';
import axios from 'axios';

export class UsersProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

	pingUser(): Promise<Response> {
		return new Promise((resolve) => {
			axios
				.get(this.path + '/ping', {})
				.then((response) => {
					resolve(response.data);
				})
				.catch(() => {
					resolve(response.json({ error: 'error' }));

					console.log();
				});
		});
	}
}
