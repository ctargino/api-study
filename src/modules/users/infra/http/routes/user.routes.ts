import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import authentication from '@shared/infra/middlewares/authentication';
import UserController from '@modules/users/infra/http/controllers/UserController';

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

userRouter.use(authentication);

export default userRouter;
