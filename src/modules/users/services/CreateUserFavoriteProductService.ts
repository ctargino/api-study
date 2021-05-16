import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserFavoriteProductRepository from '@modules/users/repositories/IUserFavoriteProductRepository';
import UserFavoriteProduct from '@modules/users/infra/typeorm/entities/UserFavoriteProduct';
import IUserFavoriteProductDTO from '@modules/users/dtos/IUserFavoriteProductDTO';

@injectable()
export default class CreateUserFavoriteProductService {
  constructor(
    @inject('UserFavoriteProductRepository')
    private userFavoriteProductRepository: IUserFavoriteProductRepository,
  ) {}

  public async execute(
    data: IUserFavoriteProductDTO,
  ): Promise<UserFavoriteProduct> {
    try {
      const userFavoriteExists = await this.userFavoriteProductRepository.get(
        data,
      );

      if (userFavoriteExists) {
        const deleteUser = await this.userFavoriteProductRepository.delete(
          data,
        );

        return deleteUser;
      }

      const userFavoriteProduct =
        await this.userFavoriteProductRepository.create(data);

      return userFavoriteProduct;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
