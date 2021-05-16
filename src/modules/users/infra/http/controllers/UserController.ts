import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import GetUserService from '@modules/users/services/GetUserService';
import LoginUserService from '@modules/users/services/LoginUserService';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute(data);

    return response.json({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    });
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const params = request.body;

    const getLogin = container.resolve(LoginUserService);
    const user = await getLogin.execute(params);

    return response.json(classToClass(user));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(user_id);

    if (!user) throw new AppError('User does not exist', 404);

    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(user_id);

    return response.json({ message: 'User deleted' });
  }
}
