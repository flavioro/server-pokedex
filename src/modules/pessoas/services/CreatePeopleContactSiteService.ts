/* eslint-disable camelcase */
import AppError from '../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ValidateCPF from '../../../shared/tools/cpf';
import removeAccents from '../../../shared/tools/string/removeAccents';
import type from '../../../shared/tools/enum/validationItemEnum';
import Pessoa from '../infra/typeorm/entities/Pessoa';
import IPessoasRepository from '../repositories/IPessoasRepository';

interface IRequest {
  nome?: string;
  email: string;
  tipo_cadastro: string;
  phone?: string;
}

@injectable()
class CreatePessoaService {
  constructor(
    @inject('PessoasRepository')
    private pessoasRepository: IPessoasRepository,
  ) {}

  public async execute({
    nome,
    email,
    tipo_cadastro,
    phone,
  }: IRequest): Promise<Pessoa> {
    // eslint-disable-next-line no-param-reassign
    tipo_cadastro = removeAccents(tipo_cadastro).toUpperCase();

    const phoneOnlyNumbers: string | undefined = ValidateCPF.strip(
      phone as string,
    );

    if (phoneOnlyNumbers && phoneOnlyNumbers.length < 10) {
      throw new AppError('Number phone incorrect or missing digits');
    }

    const checkEmailPeopleExists = await this.pessoasRepository.findByEmail(
      email,
    );

    if (checkEmailPeopleExists) {
      throw new AppError('Email people already used.');
    }

    const pessoa = this.pessoasRepository.create({
      nome,
      email,
      tipo_cadastro,
      phone: phoneOnlyNumbers,
    });

    return pessoa;
  }
}

export default CreatePessoaService;
