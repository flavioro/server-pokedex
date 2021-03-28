/* eslint-disable camelcase */
import Email from '../infra/typeorm/schemas/Email';
import ICreateEmailDTO from '../dtos/ICreateEmailDTO';

export default interface IEmailRepository {
  findBySubject(subject: string): Promise<Email | undefined>;
  findByEmailTo(emailTo: string): Promise<Email | undefined>;
  create(data: ICreateEmailDTO): Promise<Email>;
  save(email: Email): Promise<Email>;
};
