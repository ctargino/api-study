import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';

import authentication from '@shared/infra/middlewares/authentication';
import _Joi from '@shared/utils/CelebratePatterns';
import UserFavoriteProductController from '@modules/users/infra/http/controllers/UserFavoriteProductController';

const userFavoriteProductRouter = Router();
const userFavoriteProductontroller = new UserFavoriteProductController();

userFavoriteProductRouter.use(authentication);

userFavoriteProductRouter.post(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: _Joi.number,
    },
  }),
  userFavoriteProductontroller.create,
);

userFavoriteProductRouter.delete(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: _Joi.number,
    },
  }),
  userFavoriteProductontroller.delete,
);

userFavoriteProductRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      limit: _Joi.number,
      offset: _Joi.number,
    },
  }),
  userFavoriteProductontroller.list,
);

userFavoriteProductRouter.get(
  '/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: _Joi.number,
    },
  }),
  userFavoriteProductontroller.get,
);

export default userFavoriteProductRouter;
