import { Inject, Controller, Post, Body, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { LoginService } from '../../service/admin/login.service';
// import { Permission } from '../../decorator/permission.decorator';
import { createResponse } from '../../utils/response';
import { Authorization } from '../../decorator/authorization.decorator';
import { ErrorCode } from '../../types/response/code.error';
import { ErrorMessage } from '../../types/response/message.error';
import { LoginDTO } from '../../dto/admin/login.dto';
import { CaptchaService } from '@midwayjs/captcha';
import { captcha } from '../../config';

@Controller('/api/admin/login')
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  loginService: LoginService;

  @Post('/')
  @Authorization(false)
  // @Permission('access_login')
  // async login(@Body('username') username, @Body('password') password) {
  async login(@Body() login: LoginDTO) {
    const captchaId = this.ctx.session.loginCaptchaId;

    if (
      !captchaId ||
      !(await this.captchaService.check(captchaId, login.captcha))
    ) {
      return createResponse(
        null,
        false,
        ErrorCode.CAPTCHA_ERROR,
        ErrorMessage[ErrorCode.CAPTCHA_ERROR]
      );
    }

    const user = await this.loginService.login(login.username, login.password);

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
    const { id, imageBase64 } = await this.captchaService.formula(
      captcha.default
    );

    this.ctx.session.loginCaptchaId = id;

    return createResponse({
      captcha: imageBase64,
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
