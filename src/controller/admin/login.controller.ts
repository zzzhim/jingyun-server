import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginService } from '../../service/admin/login.service';
import { Permission } from '../../decorator/permission.decorator';
import { createResponse } from '../../utils/response';

@Controller('/api/admin/login')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;

  @Post('/')
  @Permission('access_login') // 这里的权限名字是随便起的，只要和数据库中的权限名字一致就行
  async getUser(@Body('username') username) {
    const user = await this.loginService.getUser({
      username,
    });

    return createResponse(user);
  }

  @Post('/register')
  @Permission('access_register') // 这里的权限名字是随便起的，只要和数据库中的权限名字一致就行
  async registerUser(@Body('username') username) {
    const user = await this.loginService.getUser({
      username,
    });

    return createResponse(user);
  }
}
