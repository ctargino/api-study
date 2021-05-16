import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(data);

    return response.json(user);
  }
}
