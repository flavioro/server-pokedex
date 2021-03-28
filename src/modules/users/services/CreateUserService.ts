import { inject, injectable } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import User from '../infra/typeorm/schemas/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { getMongoRepository } from 'typeorm';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (
      checkUserExists &&
      checkUserExists.name === name &&
      typeof password === 'undefined'
    ) {
      return checkUserExists;
    }

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    let user = new User();

    if (password) {
      user.password = await this.hashProvider.generateHash(password);
    }

    const userCreate = this.usersRepository.create({
      name,
      email,
      password: user.password,
    });

    return userCreate;
  }
}

export default CreateUserService;
