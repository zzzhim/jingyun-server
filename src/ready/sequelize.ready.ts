import { Autoload, Scope, ScopeEnum } from '@midwayjs/core';
import { Init } from '@midwayjs/decorator';
import { UserDao } from '../dao/user.dao';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class SequelizeInit extends UserDao {
  @Init()
  async init() {
    const { list } = await this.findAndCountUser({}, ['id']);

    if (list.length > 0) {
      return;
    }

    this.saveUser({
      username: 'admin',
      password: '123456',
      role: '2',
    });
  }
}
