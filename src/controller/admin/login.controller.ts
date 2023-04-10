import { Inject, Controller, Post, Body, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginService } from '../../service/admin/login.service';
// import { Permission } from '../../decorator/permission.decorator';
import { createResponse } from '../../utils/response';
import { Authorization } from '../../decorator/authorization.decorator';
import { ErrorCode } from '../../types/response/code.error';
import { ErrorMessage } from '../../types/response/message.error';

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

    if (!user) {
      return createResponse(
        user,
        false,
        ErrorCode.USER_NOT_FOUND,
        ErrorMessage[ErrorCode.USER_NOT_FOUND]
      );
    }

    return createResponse(user);
  }

  @Get('/captcha')
  @Authorization(false)
  async getCaptcha() {
    const captcha = await this.loginService.getCaptcha();

    this.ctx.session.loginCaptchaId = captcha.captchaId;

    return createResponse({
      captcha: captcha.captcha,
    });
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
