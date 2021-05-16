import IUserFavoriteProductDTO, {
  IRequestUserFavoriteProductsDTO,
} from '@modules/users/dtos/IUserFavoriteProductDTO';
import UserFavoriteProduct from '@modules/users/infra/typeorm/entities/UserFavoriteProduct';

export default interface IUserFavoriteProductRepository {
  create(data: IUserFavoriteProductDTO): Promise<UserFavoriteProduct>;
  delete(ids: IUserFavoriteProductDTO): Promise<UserFavoriteProduct>;
  list(params: IRequestUserFavoriteProductsDTO): Promise<UserFavoriteProduct[]>;
  get(ids: IUserFavoriteProductDTO): Promise<UserFavoriteProduct | undefined>;
}
