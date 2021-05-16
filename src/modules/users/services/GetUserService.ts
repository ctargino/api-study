import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

@injectable()
export default class GetUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(user_id: string): Promise<User | undefined> {
    const user = await this.userRepository.get({ user_id });

    return user;
  }
}
