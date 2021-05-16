import _Joi from '@shared/utils/CelebratePatterns';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();

const productController = new ProductController();

productRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      ids: Joi.array().items(Joi.string().required()),
      limit: _Joi.number,
      since_id: _Joi.number,
      title: Joi.string(),
      vendor: Joi.string(),
      handle: Joi.array().items(Joi.string().required()),
      product_type: Joi.string(),
      status: Joi.array().items(Joi.string().required()),
      collection_id: Joi.number(),
      created_at_min: Joi.date(),
      created_at_max: Joi.date(),
      updated_at_min: Joi.date(),
      updated_at_max: Joi.date(),
      published_at_min: Joi.date(),
      published_at_max: Joi.date(),
      published_at_status: Joi.string(),
      fields: Joi.array().items(Joi.string().required()),
      presentment_currencies: Joi.array().items(Joi.string().required()),
    },
  }),
  productController.list,
);

export default productRouter;
