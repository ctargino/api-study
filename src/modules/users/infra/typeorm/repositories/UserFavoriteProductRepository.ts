import IUserFavoriteProductRepository from '@modules/users/repositories/IUserFavoriteProductRepository';
import { getRepository, Repository } from 'typeorm';
import UserFavoriteProduct from '@modules/users/infra/typeorm/entities/UserFavoriteProduct';
import IUserFavoriteProductDTO, {
  IRequestUserFavoriteProductsDTO,
} from '@modules/users/dtos/IUserFavoriteProductDTO';

export default class UserFavoriteProductRepository
  implements IUserFavoriteProductRepository
{
  private ormRepository: Repository<UserFavoriteProduct>;

  constructor() {
    this.ormRepository = getRepository(UserFavoriteProduct);
  }

  public async create(
    data: IUserFavoriteProductDTO,
  ): Promise<UserFavoriteProduct> {
    const userFavoriteProduct = this.ormRepository.create(data);
    await this.ormRepository.save(userFavoriteProduct);

    return userFavoriteProduct;
  }

  public async delete(
    ids: IUserFavoriteProductDTO,
  ): Promise<UserFavoriteProduct> {
    const deleteUserFavoriteProduct = await this.ormRepository.delete(ids);

    return deleteUserFavoriteProduct.raw;
  }

  public async list(
    params: IRequestUserFavoriteProductsDTO,
  ): Promise<UserFavoriteProduct[]> {
    const userFavoriteProduct = await this.ormRepository.find({
      where: { user_id: params.user_id },
      skip: params.offset ? params.offset : 0,
      take: params.limit ? params.limit : 0,
      loadRelationIds: true,
    });

    return userFavoriteProduct;
  }

  public async get(
    ids: IUserFavoriteProductDTO,
  ): Promise<UserFavoriteProduct | undefined> {
    const userFavoriteProduct = await this.ormRepository.findOne({
      where: ids,
    });

    return userFavoriteProduct;
  }
}
