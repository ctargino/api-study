import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserFavoriteProductRepository from '@modules/users/repositories/IUserFavoriteProductRepository';
import UserFavoriteProduct from '@modules/users/infra/typeorm/entities/UserFavoriteProduct';
import IUserFavoriteProductDTO from '@modules/users/dtos/IUserFavoriteProductDTO';

@injectable()
export default class DeleteUserFavoriteProductService {
  constructor(
    @inject('UserFavoriteProductRepository')
    private userFavoriteProductRepository: IUserFavoriteProductRepository,
  ) {}

  public async execute(
    ids: IUserFavoriteProductDTO,
  ): Promise<UserFavoriteProduct> {
    try {
      const deleteUser = await this.userFavoriteProductRepository.delete(ids);

      return deleteUser;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
