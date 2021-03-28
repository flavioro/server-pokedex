import { getMongoRepository, MongoRepository } from 'typeorm';

import IUserTokensRepository from '../../../../../modules/users/repositories/IUserTokensRepository';

import UserToken from '../schemas/UserToken';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: MongoRepository<UserToken>;

  constructor() {
    this.ormRepository = getMongoRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      user_id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
