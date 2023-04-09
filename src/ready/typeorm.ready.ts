import { Autoload, Scope, ScopeEnum } from '@midwayjs/core';
import { Init } from '@midwayjs/decorator';
import { UserDao } from '../dao/user.dao';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class TypeormInit extends UserDao {
  @Init()
  async init() {
    const { list } = await this.findAndCountUser(
      {
        username: 'admin',
      },
      {
        id: true,
        username: true,
      }
    );

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
