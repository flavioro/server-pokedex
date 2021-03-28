import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string(),
      tipo_cadastro: Joi.string(),
    },
  }),
  usersController.create,
);

export default usersRouter;
