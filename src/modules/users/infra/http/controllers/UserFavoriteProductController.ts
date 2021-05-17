import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { scheduleJob } from 'node-schedule';

import CreateUserFavoriteProductService from '@modules/users/services/CreateUserFavoriteProductService';
import DeleteUserFavoriteProductService from '@modules/users/services/DeleteUserFavoriteProductService';
import ListUserFavoriteProductService from '@modules/users/services/ListUserFavoriteProductService';
import GetUserFavoriteProductService from '@modules/users/services/GetUserFavoriteProductService';
import AppError from '@shared/errors/AppError';
import GetProductByApiService from '@modules/shopify/services/GetProductByApiService';
import { IListUserFavoriteProducts } from '@modules/users/dtos/IUserFavoriteProductDTO';
import SendEmailService from '@modules/users/services/SendEmailService';
import GetUserService from '@modules/users/services/GetUserService';

function sendEmailMessage(
  email: string | undefined,
  action: string,
  product: string,
  list: Array<string>,
) {
  const message = {
    from: 'contateste99999123@gmail.com',
    to: email,
    subject: 'Your Shopify favourites products has changes',
    html: `<h1><b>Hey there! </b></h1> <h3><br> You have ${action} to your favorite list the item <font color='red'><b>${product}</b></font> </br><br> Now, You have these products in your favourite list: <font color='red'><b>${list}</b></font> </br></h3>`,
  };
  return message;
}

export default class UserFavoriteProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.user;
    const { product_id } = request.params;

    const product = await GetProductByApiService(+product_id);
    product;

    const createUserFavoriteProduct = container.resolve(
      CreateUserFavoriteProductService,
    );
    const userFavoriteProduct = await createUserFavoriteProduct.execute({
      user_id,
      product_id,
    });

    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(user_id);

    const listUserFavoriteProducts = container.resolve(
      ListUserFavoriteProductService,
    );
    const userFavoriteProducts = await listUserFavoriteProducts.execute({
      user_id,
    });

    const userProductsList: string[] = [];

    await Promise.all(
      userFavoriteProducts.map(async product => {
        const productByApi = await GetProductByApiService(+product.product_id);

        if (productByApi) {
          userProductsList.push(productByApi.product.title);
        }
      }),
    );

    const sendEmail = container.resolve(SendEmailService);
    const date = new Date();
    const dateEmail = new Date(date.getTime() + 2 * 60000);

    if (!userFavoriteProduct.product_id) {
      scheduleJob(dateEmail, () => {
        sendEmail.execute(
          sendEmailMessage(
            user?.email,
            'deleted',
            product.product.title,
            userProductsList,
          ),
        );
      });
      return response.json({ message: 'Product is no longer favorite' });
    }

    scheduleJob(dateEmail, () => {
      sendEmail.execute(
        sendEmailMessage(
          user?.email,
          'added',
          product.product.title,
          userProductsList,
        ),
      );
    });

    return response.json({ ...userFavoriteProduct, ...product });
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
            no_product: 'Product id no longer exist in API',
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
