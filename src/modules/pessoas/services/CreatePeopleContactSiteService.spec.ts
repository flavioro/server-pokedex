import AppError from '../../../../../shared/errors/AppError';

import FakePessoasRepository from '../repositories/fakes/FakePessoasRepository';
import CreatePessoaService from './CreatePessoaService';

let fakePessoasRepository: FakePessoasRepository;
let createPessoa: CreatePessoaService;

describe('CreatePeopleContactSite', () => {
  beforeEach(() => {
    fakePessoasRepository = new FakePessoasRepository();
    createPessoa = new CreatePessoaService(fakePessoasRepository);
  });

  it('should be able to create a new people, contact site', async () => {
    const pessoa = await createPessoa.execute({
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'contatosite',
      phone: '19987894561',
    });

    expect(pessoa).toHaveProperty('id');
  });

  it('should not be able to create a new people, with type subscriber', async () => {
    const pessoa = await createPessoa.execute({
      nome: 'Maria Antonia',
      email: 'marai.anotnia@pessoal.com',
      tipo_cadastro: 'inscrito',
      phone: '19987894561',
    });

    expect(pessoa).toHaveProperty('id');
  });
});
