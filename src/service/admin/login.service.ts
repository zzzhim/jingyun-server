import { Provide, Inject } from '@midwayjs/core';
import { UserModel } from '../../model/user.model';
import { JwtService } from '@midwayjs/jwt';
import * as md5 from 'md5';

@Provide()
export class LoginService {
  @Inject()
  jwtService: JwtService;

  async login(username: string, password: string) {
    const user = await UserModel.findOne({
      where: {
        username,
        password: md5(password),
      },
    });

    if (!user) {
      return null;
    }

    const result = user.toJSON() as UserModel;

    delete result.password;

    const token = this.jwtService.signSync({
      ...result,
    });

    return {
      ...result,
      token,
    };
  }
}
