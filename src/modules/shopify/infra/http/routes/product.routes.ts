import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import _Joi from '@shared/utils/CelebratePatterns';
import ProductController from '@modules/shopify/infra/http/controllers/ProductController';

const productRouter = Router();

const productController = new ProductController();

productRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      ids: Joi.string(),
      limit: _Joi.number,
      since_id: _Joi.number,
      title: Joi.string(),
      vendor: Joi.string(),
      handle: Joi.string(),
      product_type: Joi.string(),
      status: Joi.string(),
      collection_id: Joi.number(),
      created_at_min: Joi.date(),
      created_at_max: Joi.date(),
      updated_at_min: Joi.date(),
      updated_at_max: Joi.date(),
      published_at_min: Joi.date(),
      published_at_max: Joi.date(),
      published_at_status: Joi.string(),
      fields: Joi.string(),
      presentment_currencies: Joi.string(),
    },
  }),
  productController.list,
);

productRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: _Joi.number,
    },
    [Segments.QUERY]: {
      fields: Joi.string(),
    },
  }),
  productController.get,
);

export default productRouter;
