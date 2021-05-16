import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    try {
      const user = await this.userRepository.delete(user_id);

      return user;
    } catch (err) {
      throw new AppError(err);
    }
  }
}
