import GetProductByApiService from '@modules/shopify/services/GetProductByApiService';
import ListProductsByApiService from '@modules/shopify/services/ListProductsByApiService';
import { Request, Response } from 'express';

export default class ProductController {
  async list(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const products = await ListProductsByApiService(params);

    return response.json(products);
  }

  async get(request: Request, response: Response): Promise<Response> {
    const fields = request.query;
    const { product_id } = request.params;

    const product = await GetProductByApiService(+product_id, Object(fields));

    return response.json(product);
  }
}
