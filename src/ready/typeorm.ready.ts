import { Autoload, Scope, ScopeEnum } from '@midwayjs/core';
import { Init } from '@midwayjs/decorator';
import { UserDao } from '../dao/user.dao';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class TypeormInit extends UserDao {
  @Init()
  async init() {
    const user = await this.findUser(
      {
        username: 'admin',
      },
      {
        id: true,
        username: true,
      }
    );

    if (user) {
      return;
    }

    this.saveUser({
      username: 'admin',
      password: '123456',
    });
  }
}
