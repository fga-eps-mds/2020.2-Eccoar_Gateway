import { Router, Request, Response } from 'express';
import { paths } from './config/enviroments';
import { UsersProxy } from './api/users/UsersProxy';
import { ComplaintProxy } from './api/complaint/ComplaintProxy';

const routers = Router();
const usersProxy = new UsersProxy(paths.configUsers());
const complaintProxy = new ComplaintProxy(paths.configComplaint());

routers.get("/ping-user", async (req: Request, resp: Response) => {
    const response = await usersProxy.pingUser();
    resp.status(200).json(response);
});

routers.get("/ping-complaint", async (req: Request, resp: Response) => {
    const response = await complaintProxy.pingComplaint();
    resp.status(200).json(response);
})

export default routers;