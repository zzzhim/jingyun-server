import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginService } from '../../service/admin/login.service';

@Controller('/api/admin/login')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;

  @Get('/')
  async getUser(@Query('username') username) {
    const user = await this.loginService.getUser({ username });
    return { success: true, message: 'OK', data: user };
  }
}
