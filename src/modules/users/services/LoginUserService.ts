import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import bcrypt from 'bcryptjs';
import jwt_decode from 'jwt-decode';

import { ILoginDTO } from '@modules/users/dtos/IUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';

import authConfig from '@shared/config/auth';

interface ITokenPayload {
  sub: string;
  device_key: string;
  iss: string;
  client_id: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  name: string;
  email: string;
}

@injectable()
export default class LoginUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(params: ILoginDTO): Promise<User> {
    const password = bcrypt.hashSync(String(params.password), 8);

    const user = await this.userRepository.get({
      email: params.email,
      password,
    });

    if (!user) throw new AppError('User not found', 404);

    if (!user.token) {
      const { secret, expiresIn } = authConfig.jwt;

      const token = sign({}, secret, {
        subject: String(user.user_id),
        expiresIn,
      });

      user.token = token;

      await this.userRepository.update(user.user_id, { token });
    }

    const userTokenDecoded: ITokenPayload = jwt_decode(user.token);

    if (userTokenDecoded.sub !== user.user_id)
      throw new AppError('Invalid Token', 401);

    return user;
  }
}
