import { Provide, Inject } from '@midwayjs/core';
import { UserModel } from '../../model/user.model';
import { JwtService } from '@midwayjs/jwt';
import * as md5 from 'md5';
import { CaptchaService } from '@midwayjs/captcha';
import { captcha } from '../../config';

@Provide()
export class LoginService {
  @Inject()
  jwtService: JwtService;

  @Inject()
  captchaService: CaptchaService;

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

  async getCaptcha() {
    const { id, imageBase64 } = await this.captchaService.formula(
      captcha.default
    );
    return {
      captchaId: id, // 验证码 id
      captcha: imageBase64, // 验证码 SVG 图片的 base64 数据，可以直接放入前端的 img 标签内
    };
  }
}
