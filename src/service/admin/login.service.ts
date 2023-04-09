import { Provide } from '@midwayjs/core';
import { UserDao } from '../../dao/user.dao';
import { FindOptionsSelect } from 'typeorm';
import { UserModel } from '../../entity/user.entity';

@Provide()
export class LoginService extends UserDao {
  async getUser(query: UserModel, select?: FindOptionsSelect<UserModel>) {
    const user = await this.findUser(query, select);

    return user;
  }

  async getUserList(query: UserModel, select?: FindOptionsSelect<UserModel>) {
    const { list, total } = await this.findAndCountUser(query, select);

    return {
      list,
      total,
    };
  }
}
