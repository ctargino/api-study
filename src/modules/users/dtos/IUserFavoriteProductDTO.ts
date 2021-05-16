import IProductsDTO from '@modules/shopify/dtos/IProductsDTO';

export default interface IUserFavoriteProductDTO {
  product_id: string;
  user_id: string;
}

export interface IRequestUserFavoriteProductsDTO {
  user_id?: string;
  limit?: number;
  offset?: number;
}

export interface IListUserFavoriteProducts extends IProductsDTO {
  product_id: string;
  added_at: Date;
  user_id: string;
}
