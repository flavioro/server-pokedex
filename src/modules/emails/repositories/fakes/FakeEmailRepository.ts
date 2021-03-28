/* eslint-disable camelcase */
import { uuid } from 'uuidv4';
import IEmailRepository from '../../../../modules/emails/repositories/IEmailRepository';
import ICreateEmailDTO from '../../../../modules/emails/dtos/ICreateEmailDTO';

import Email from '../../infra/typeorm/schemas/Email';

class SiteContatoRepository implements IEmailRepository {
  private Emails: Email[] = [];

  public async findBySubject(subject: string): Promise<Email | undefined> {
    const findEmail = this.Emails.find(email => email.subject === subject);

    return findEmail;
  }

  public async findByEmailTo(emailTo: string): Promise<Email | undefined> {
    const findEmail = this.Emails.find(email => email.email_to === emailTo);

    return findEmail;
  }

  public async create(data: ICreateEmailDTO): Promise<Email> {
    const email = new Email();

    Object.assign(email, { id: uuid() }, data);

    this.Emails.push(email);

    return email;
  }

  public async save(email: Email): Promise<Email> {
    const emailIndex = this.Emails.findIndex(
      emailItem => emailItem.id === email.id,
    );

    this.Emails[emailIndex] = email;

    return email;
  }
}

export default SiteContatoRepository;
