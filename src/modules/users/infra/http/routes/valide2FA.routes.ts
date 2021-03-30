import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../../../../../modules/users/infra/http/middlewares/ensureAuthenticated';

import ValidateTwoFAController from '../controllers/Validate2FAUserController';

const twoFARouter = Router();
const twoFAController = new ValidateTwoFAController();

twoFARouter.use(ensureAuthenticated);

twoFARouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      code: Joi.string().required().length(6),
    },
  }),
  twoFAController.show,
);

export default twoFARouter;
