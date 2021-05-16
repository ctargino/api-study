import AppError from '@shared/errors/AppError';
import axios from 'axios';
import IProductsDTO from '@modules/shopify/dtos/IProductsDTO';

export default async (
  product_id: number,
  params?: Object,
): Promise<IProductsDTO> => {
  const products = await axios({
    method: 'GET',
    url: `https://${process.env.API_KEY}:${process.env.API_PASSWORD}@send4-avaliacao.myshopify.com/admin/api/2021-04/products/${product_id}.json`,
    params,
  })
    .then(async res => {
      return res.data;
    })
    .catch(error => {
      console.log(error);

      return {
        error: error.response.data.errors,
        status: error.response.status,
      };
    });

  if (products.error) {
    throw new AppError(
      `Unexpected error getting product - ${products.error}`,
      products.status,
    );
  }

  return products;
};
