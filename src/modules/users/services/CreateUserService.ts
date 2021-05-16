import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import { ICreateUserDTO } from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import authConfig from '@shared/config/auth';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(data: ICreateUserDTO): Promise<User> {
    try {
      const user = await this.userRepository.create(data);

      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({}, secret, {
        subject: String(user.user_id),
        expiresIn,
      });

      user.token = token;

      await this.userRepository.update(user.user_id, { token });

      return user;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
