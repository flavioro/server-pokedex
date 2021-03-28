import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserPictureService from '../../../../../modules/users/services/UpdateUserPictureService';
import { uuid } from 'uuidv4';

export default class UserPictureController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserPicture = container.resolve(UpdateUserPictureService);

    const user = await updateUserPicture.execute({
      // user_id: request.user.id,
      user_id: uuid(),
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
}
