import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '../../../../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../../../../modules/users/infra/typeorm/repositories/UsersRepository';

import IPessoasRepository from '../../../../../modules/pessoas/repositories/IPessoasRepository';
import PessoasRepository from '../../../../../modules/pessoas/infra/typeorm/repositories/PessoasRepository';

import ISiteContactRepository from '../../../../../modules/pessoas/repositories/ISiteContatoRepository';
import SiteContactsRepository from '../../../../../modules/pessoas/infra/typeorm/repositories/SiteContatoRepository';

import IEmailRepository from '../../../../../modules/emails/repositories/IEmailRepository';
import EmailRepository from '../../../../../modules/emails/infra/typeorm/repositories/EmailRepository';

import IUserTokensRepository from '../../../../../modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '../../../../../modules/users/infra/typeorm/repositories/UserTokensRepository';


container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IPessoasRepository>(
  'PessoasRepository',
  PessoasRepository,
);

container.registerSingleton<ISiteContactRepository>(
  'SiteContactsRepository',
  SiteContactsRepository,
);

container.registerSingleton<IEmailRepository>(
  'EmailRepository',
  EmailRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
