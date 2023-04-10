export const captcha: CaptchaOptions = {
  default: {
    // 默认配置
    size: 4,
    noise: 4,
    width: 200,
    height: 100,
  },
  image: {
    // 最终会合并 default 配置
    type: 'mixed',
  },
  formula: {}, // 最终会合并 default 配置
  text: {}, // 最终会合并 default 配置
  expirationTime: 3600,
  idPrefix: 'midway:vc',
};
