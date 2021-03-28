import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ValidateCPF from '../../../shared/tools/cpf';
import removeAccents from '../../../shared/tools/string/removeAccents';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

interface IRequest {
  user_id?: string;
  nome?: string;
  email: string;
  tipo_cadastro: string;
  cpf?: string;
  dt_nascimento?: Date;
  country?: string;
  phone?: string;
  uf?: string;
  cidade?: string;
  cep?: string;
  bairro?: string;
  logradouro?: string;
  numero_casa?: string;
  complemento?: string;
}

@injectable()
class CreatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
    user_id,
    nome,
    email,
    tipo_cadastro,
    cpf,
    dt_nascimento,
    country,
    phone,
    uf,
    cidade,
    cep,
    bairro,
    logradouro,
    numero_casa,
    complemento,
  }: IRequest): Promise<Pessoa> {
    // eslint-disable-next-line no-param-reassign
    tipo_cadastro = removeAccents(tipo_cadastro).toUpperCase();

    if (!ValidateCPF.isValid(cpf as string)) {
      throw new AppError("The person's CPF is not valid.");
    }

    let cpfOnlyNumbers: string | undefined = ValidateCPF.strip(cpf as string);
    let phoneOnlyNumbers: string | undefined = ValidateCPF.strip(
      phone as string,
    );

    const checkCpfPeopleExists = await this.pessoasRepository.findByCPF(
      cpfOnlyNumbers,
    );

    if (checkCpfPeopleExists) {
      throw new AppError('CPF people already used.');
    }

    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );
    if (checkEmailPeopleExists) {
      throw new AppError('Email people already used.');
    }

    const pessoa = this.pessoasRepository.create({
      user_id,
      nome,
      email,
      tipo_cadastro,
      cpf: cpfOnlyNumbers,
      dt_nascimento,
      country,
      phone: phoneOnlyNumbers,
      uf,
      cidade,
      cep,
      bairro,
      logradouro,
      numero_casa,
      complemento,
    });

    return pessoa;
  }
}

export default CreatePessoaService;
