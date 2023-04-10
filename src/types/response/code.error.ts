export enum ErrorCode {
  // 成功
  SUCCESS = 200,

  // 客户端错误
  BAD_REQUEST = 400, // 错误请求
  UNAUTHORIZED = 401, // 未授权
  FORBIDDEN = 403, // 禁止访问
  NOT_FOUND = 404, // 未找到
  CONFLICT = 409, // 冲突

  // 服务器错误
  INTERNAL_SERVER_ERROR = 500, // 内部服务器错误

  // 自定义错误码（业务逻辑）
  INVALID_CREDENTIALS = 1000, // 无效的凭据
  EMAIL_ALREADY_EXISTS = 1001, // 邮箱已存在
  USERNAME_ALREADY_EXISTS = 1002, // 用户名已存在
  VIDEO_NOT_FOUND = 1003, // 视频未找到
  COMMENT_NOT_FOUND = 1004, // 评论未找到
  PLAYLIST_NOT_FOUND = 1005, // 播放列表未找到
  CATEGORY_NOT_FOUND = 1006, // 分类未找到
  TAG_NOT_FOUND = 1007, // 标签未找到
  USER_NOT_FOUND = 1008, // 用户未找到
  INSUFFICIENT_PERMISSIONS = 1009, // 权限不足
  RATE_LIMIT_EXCEEDED = 1010, // 超过速率限制
  CAPTCHA_ERROR = 1011, // 验证码错误
}
