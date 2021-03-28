import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePessoaService from '../../../../../modules/pessoas/services/CreatePessoaService';

export default class SubscriberController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, tipo_cadastro } = request.body;

    const createSubscriber = container.resolve(CreatePessoaService);

    const subscriber = await createSubscriber.execute({
      tipo_cadastro,
      email,
    });

    return response.json(subscriber);
  }
}
