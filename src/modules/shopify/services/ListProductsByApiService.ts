import AppError from '@shared/errors/AppError';
import axios from 'axios';
import IProductsDTO, {
  IRequestProductsDTO,
} from '@modules/shopify/dtos/IProductsDTO';

export default async (params: IRequestProductsDTO): Promise<IProductsDTO[]> => {
  const products = await axios({
    method: 'GET',
    url: `https://${process.env.API_KEY}:${process.env.API_PASSWORD}@send4-avaliacao.myshopify.com/admin/api/2021-04/products.json`,
    params,
  })
    .then(async res => {
      return res.data;
    })
    .catch(error => {
      return {
        error: error.response.data.message,
        status: error.response.status,
      };
    });

  if (products.error) {
    throw new AppError(
      `Unexpected error listing products - ${products.error}`,
      products.status,
    );
  }

  return products;
};
