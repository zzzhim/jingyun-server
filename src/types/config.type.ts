interface CaptchaOptions {
  default?: {
    // 默认配置
    // 验证码字符长度，默认 4 个字符
    size?: number;
    // 干扰线条的数量，默认 1 条
    noise?: number;
    // 宽度，默认为 120 像素
    width?: number;
    // 宽度，默认为 40 像素
    height?: number;
    // 图形验证码配置，图形中包含一些字符
  };
  image?: {
    // 验证码字符长度，默认 4 个字符
    size?: number;
    // 图像验证码中的字符类型，默认为 'mixed'
    // - 'mixed' 表示 0-9、A-Z 和 a-z
    // - 'letter' 表示 A-Z 和 a-z
    // - 'number' 表示 0-9
    type?: 'mixed';
    // 干扰线条的数量，默认 1 条
    noise?: number;
    // 宽度，默认为 120 像素
    width?: number;
    // 宽度，默认为 40 像素
    height?: number;
  };
  // 计算公式验证码配置，例如返回的图像内容为 1+2，需要用户填入 3
  formula?: {
    // 干扰线条的数量，默认 1 条
    noise?: number;
    // 宽度，默认为 120 像素
    width?: number;
    // 宽度，默认为 40 像素
    height?: number;
  };
  // 纯文本验证码配置，基于纯文本验证码可以实现短信验证码、邮件验证码
  text?: {
    // 验证码字符长度，默认 4 个字符
    size?: number;
    // 文本验证码中的字符类型，默认为 'mixed'
    // - 'mixed' 表示 0-9、A-Z 和 a-z
    // - 'letter' 表示 A-Z 和 a-z
    // - 'number' 表示 0-9
    type?: 'mixed';
  };
  // 验证码过期时间，默认为 1h
  expirationTime?: 3600;
  // 验证码存储的 key 前缀
  idPrefix: 'midway:vc';
}
