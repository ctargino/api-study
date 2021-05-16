import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateUserFavoriteProductService from '@modules/users/services/CreateUserFavoriteProductService';
import DeleteUserFavoriteProductService from '@modules/users/services/DeleteUserFavoriteProductService';
import ListUserFavoriteProductService from '@modules/users/services/ListUserFavoriteProductService';
import GetUserFavoriteProductService from '@modules/users/services/GetUserFavoriteProductService';
import AppError from '@shared/errors/AppError';
import GetProductByApiService from '@modules/shopify/services/GetProductByApiService';
import { IListUserFavoriteProducts } from '@modules/users/dtos/IUserFavoriteProductDTO';

export default class UserFavoriteProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { product_id } = request.params;

    await GetProductByApiService(+product_id);

    const createUserFavoriteProduct = container.resolve(
      CreateUserFavoriteProductService,
    );
    const userFavoriteProduct = await createUserFavoriteProduct.execute({
      user_id,
      product_id,
    });

    if (!userFavoriteProduct.product_id)
      return response.json({ message: 'Product is no longer favorite' });

    return response.json(userFavoriteProduct);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { product_id } = request.params;

    const getUserFavoriteProduct = container.resolve(
      GetUserFavoriteProductService,
    );
    const userFavoriteProduct = await getUserFavoriteProduct.execute({
      user_id,
      product_id,
    });

    if (!userFavoriteProduct) throw new AppError('Registry not found', 404);

    const deleteUserFavoriteProduct = container.resolve(
      DeleteUserFavoriteProductService,
    );
    await deleteUserFavoriteProduct.execute({
      user_id,
      product_id,
    });

    return response.json({ message: 'Product deleted of user favorites' });
  }

  public async list(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const params = request.query;

    const listUserFavoriteProducts = container.resolve(
      ListUserFavoriteProductService,
    );
    const userFavoriteProducts = await listUserFavoriteProducts.execute({
      user_id,
      ...params,
    });

    const userProductsList: IListUserFavoriteProducts[] = [];

    await Promise.all(
      userFavoriteProducts.map(async product => {
        const productByApi = await GetProductByApiService(+product.product_id);

        if (productByApi) {
          const userProductList = {
            ...product,
            ...productByApi,
          };

          userProductsList.push(userProductList);
        } else {
          const userProductList = {
            ...product,
            product: 'Product id no longer exist in API',
          };
          userProductsList.push(userProductList);
        }
      }),
    );

    return response.json(userProductsList);
  }

  public async get(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { product_id } = request.params;

    const getUserFavoriteProducts = container.resolve(
      GetUserFavoriteProductService,
    );
    const userFavoriteProduct = await getUserFavoriteProducts.execute({
      user_id,
      product_id,
    });

    if (!userFavoriteProduct) throw new AppError('Registry not found', 404);

    const productByApi = await GetProductByApiService(+product_id);

    if (productByApi) {
      const userProductList = {
        ...userFavoriteProduct,
        ...productByApi,
      };

      return response.json(userProductList);
    }

    return response.json({
      ...userFavoriteProduct,
      product: 'Product id no longer exist in API',
    });
  }
}
