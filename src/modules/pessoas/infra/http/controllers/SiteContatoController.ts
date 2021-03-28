/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatePeopleContactSiteService from '../../../../../modules/pessoas/services/CreatePeopleContactSiteService';
import CreateSiteContatoService from '../../../../../modules/pessoas/services/CreateSiteContatoService';
import SendEmailContactSiteService from '../../../../../modules/pessoas/services/SendEmailContactSiteService';

import CreateEmailService from '../../../../../modules/emails/services/CreateEmailService';

export default class SiteContatoController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      nome,
      email,
      tipo_cadastro,
      phone,
      message,
      subject,
    } = request.body;

    const createPeople = container.resolve(CreatePeopleContactSiteService);
    const createContact = container.resolve(CreateSiteContatoService);
    const createEmail = container.resolve(CreateEmailService);
    const sendEmailContact = container.resolve(SendEmailContactSiteService);

    const people = await createPeople.execute({
      nome,
      email,
      tipo_cadastro,
      phone,
    });

    // const contactSite = await createContact.execute({
    //   pessoa_id: people.id,
    //   subject,
    //   message,
    // });

    // const sendEmail = await sendEmailContact.execute({
    //   pessoa_id: people.id,
    //   name: people.nome,
    //   email: people.email,
    //   phone: people.phone,
    //   subject: contactSite.subject,
    //   message: contactSite.message,
    // });

    const saveEmail = await createEmail.execute({
      pessoa_id: people.id,
      subject,
      message_html: message,
      email_from: 'naoresponder@archshop.com.br',
      email_to: email,
      email_send: true,
    });

    return response.json(saveEmail);
  }
}
