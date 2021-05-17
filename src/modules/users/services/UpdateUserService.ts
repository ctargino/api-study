import { inject, injectable } from 'tsyringe';

import { IUpdateUserDTO } from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user_id: string, data: IUpdateUserDTO): Promise<User> {
    try {
      const user = await this.userRepository.update(user_id, data);

      return user;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
