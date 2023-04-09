import { Provide } from '@midwayjs/core';
import { UserDao } from '../../dao/user.dao';
import { UserModel } from '../../entity/user.entity';
import { FindAttributeOptions, WhereOptions } from 'sequelize';

@Provide()
export class LoginService extends UserDao {
  async getUser(
    query: WhereOptions<UserModel>,
    attributes?: FindAttributeOptions
  ) {
    const user = await this.findUser(query, attributes);

    return user;
  }

  async getUserList(
    query: WhereOptions<UserModel>,
    attributes?: FindAttributeOptions
  ) {
    const { list, total } = await this.findAndCountUser(query, attributes);

    return {
      list,
      total,
    };
  }
}
