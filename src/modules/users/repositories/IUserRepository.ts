import User from '@modules/users/infra/typeorm/entities/User';
import {
  ICreateUserDTO,
  IParamsUserDTO,
  IUpdateUserDTO,
} from '@modules/users/dtos/IUserDTO';

export default interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  get(user_id: string): Promise<User>;
  list(params: IParamsUserDTO): Promise<User[]>;
  update(user_id: string, data: IUpdateUserDTO): Promise<User>;
  delete(user_id: string): Promise<User>;
}
