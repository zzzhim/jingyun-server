import { Inject, Controller, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginService } from '../../service/admin/login.service';
// import { Permission } from '../../decorator/permission.decorator';
import { createResponse } from '../../utils/response';
import { Authorization } from '../../decorator/authorization.decorator';

@Controller('/api/admin/login')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  loginService: LoginService;

  @Post('/')
  @Authorization(false)
  // @Permission('access_login')
  async login(@Body('username') username, @Body('password') password) {
    const user = await this.loginService.login(username, password);

    return createResponse(user);
  }

  // @Post('/register')
  // @Permission('access_register')
  // async registerUser(@Body('username') username) {
  //   const user = await this.loginService.getUser({
  //     username,
  //   });

  //   return createResponse(user);
  // }
}
