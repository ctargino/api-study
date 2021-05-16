export default interface IProductsDTO {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at: Date;
  template_suffix: string;
  status: string;
  published_scope: string;
  tags: string;
  admin_graphql_api_id: string;
  variants: IVariantDTO[];
  options: IOptionsDTO[];
  images: IImageDTO[];
  image: IImageDTO;
}

export interface IVariantDTO {
  id: number;
  product_id: number;
  title: string;
  price: string;
  sku: string;
  position: number;
  inventory_policy: string;
  compare_at_price: string;
  fulfillment_service: string;
  inventory_management: string;
  option1: string;
  option2: string;
  option3: string;
  created_at: Date;
  updated_at: Date;
  taxable: boolean;
  barcode: string;
  grams: number;
  image_id: number;
  weight: number;
  weight_unit: string;
  inventory_item_id: number;
  inventory_quantity: number;
  old_inventory_quantity: number;
  requires_shipping: boolean;
  admin_graphql_api_id: string;
}

export interface IOptionsDTO {
  id: number;
  product_id: number;
  name: string;
  position: number;
  values: [string];
}

export interface IImageDTO {
  id: number;
  product_id: number;
  position: number;
  created_at: Date;
  updated_at: Date;
  alt: string;
  width: number;
  height: number;
  src: string;
  variant_ids: [];
  admin_graphql_api_id: string;
}

export interface IRequestProductsDTO {
  ids?: [number];
  limit?: number;
  since_id?: number;
  title?: string;
  vendor?: string;
  handle?: Object;
  product_type?: string;
  status?: Object;
  collection_id?: number;
  created_at_min?: Date;
  created_at_max?: Date;
  updated_at_min?: Date;
  updated_at_max?: Date;
  published_at_min?: Date;
  published_at_max?: Date;
  published_at_status?: string;
  fields?: Object;
  presentment_currencies?: Object;
}
