import { Router, Request, Response } from 'express';

import StatusController from '@shared/controller/StatusController';

const routes = Router();

routes.use('/status', StatusController.status);
routes.use('/ready', StatusController.ready);

routes.get('/', function (request: Request, response: Response) {
  response.json({
    api: 'send4test',
    version: '1.0',
    owner: 'c.targino@gmail.com',
  });
});

export default routes;
