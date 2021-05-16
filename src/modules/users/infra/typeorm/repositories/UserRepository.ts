import { getRepository, Repository } from 'typeorm';

import {
  ICreateUserDTO,
  ILoginDTO,
  IParamsUserDTO,
  IUpdateUserDTO,
} from '@modules/users/dtos/IUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    await this.ormRepository.save(user);

    return user;
  }

  public async get(params: ILoginDTO): Promise<User | undefined> {
    const user = this.ormRepository.findOne(params);

    return user;
  }

  public async list(params: IParamsUserDTO): Promise<User[]> {
    const { limit, offset } = params;
    const users = this.ormRepository.find({
      skip: offset ? offset : 0,
      take: limit ? limit : 0,
    });

    return users;
  }

  public async update(user_id: string, data: IUpdateUserDTO): Promise<User> {
    const user = await this.ormRepository.update(user_id, data);

    return user.raw;
  }

  public async delete(user_id: string): Promise<User> {
    const user = await this.ormRepository.softDelete(user_id);

    return user.raw;
  }
}
