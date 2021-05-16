import ListProductsByApiService from '@modules/shopify/services/ListProductsByApiService';
import { Request, Response } from 'express';

export default class ProductController {
  async list(request: Request, response: Response): Promise<Response> {
    const params = request.query;

    const products = await ListProductsByApiService(params);

    return response.json(products);
  }
}
