import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserFavoriteProductRepository from '@modules/users/repositories/IUserFavoriteProductRepository';
import UserFavoriteProduct from '@modules/users/infra/typeorm/entities/UserFavoriteProduct';
import { IRequestUserFavoriteProductsDTO } from '@modules/users/dtos/IUserFavoriteProductDTO';

@injectable()
export default class ListUserFavoriteProductService {
  constructor(
    @inject('UserFavoriteProductRepository')
    private userFavoriteProductRepository: IUserFavoriteProductRepository,
  ) {}

  public async execute(
    params: IRequestUserFavoriteProductsDTO,
  ): Promise<UserFavoriteProduct[]> {
    try {
      const user = await this.userFavoriteProductRepository.list(params);

      return user;
    } catch (err) {
      throw new AppError(err.message);
    }
  }
}
