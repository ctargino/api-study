import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import authentication from '@shared/infra/middlewares/authentication';
import UserController from '@modules/users/infra/http/controllers/UserController';
import _Joi from '@shared/utils/CelebratePatterns';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.create,
);

userRouter.get(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  userController.login,
);

userRouter.use(authentication);

userRouter.delete(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: _Joi.uuidRequired,
    },
  }),
  userController.delete,
);

userRouter.get('/logout', userController.logout);

export default userRouter;
