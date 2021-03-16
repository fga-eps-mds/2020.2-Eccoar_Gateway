import axios from 'axios';
import { response, Response } from 'express';


export class ComplaintProxy {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    pingComplaint(): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/ping', {}).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(response.json({ "error": "error" }));
            });
        });
    }

    listComplaints(skip: string, take: string, orderDate: string): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/complaints', {
                params: {
                    skip: skip,
                    take: take,
                    orderDate: orderDate
                }
            }).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(response.json({ "error": "error" }));
            });
        });
    }

    createComplaint(req:Request): Promise<Response>{
        return new Promise(resolve => {
            axios.post(this.path + '/complaint', req.body).then(response => {
                resolve(response.data);
            }).catch((error) => {
                resolve(response.json({"error": error}));
            });
        });
    }
}