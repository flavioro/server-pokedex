import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import TwoFAValidateUserService from '../../../../../modules/users/services/2FAValidateUserService';

export default class Validate2FAController {
  public async show(request: Request, response: Response): Promise<Response> {


    const showProfile = container.resolve(TwoFAValidateUserService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }


}
