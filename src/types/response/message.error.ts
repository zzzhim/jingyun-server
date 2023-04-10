import { ErrorCode } from './code.error';

export const ErrorMessage = {
  // 成功
  [ErrorCode.SUCCESS]: '操作成功',

  // 客户端错误
  [ErrorCode.BAD_REQUEST]: '错误的请求',
  [ErrorCode.UNAUTHORIZED]: '未授权',
  [ErrorCode.FORBIDDEN]: '禁止访问',
  [ErrorCode.NOT_FOUND]: '未找到资源',
  [ErrorCode.CONFLICT]: '资源冲突',

  // 服务器错误
  [ErrorCode.INTERNAL_SERVER_ERROR]: '内部服务器错误',

  // 自定义错误消息（业务逻辑）
  [ErrorCode.INVALID_CREDENTIALS]: '无效的凭据',
  [ErrorCode.EMAIL_ALREADY_EXISTS]: '邮箱已存在',
  [ErrorCode.USERNAME_ALREADY_EXISTS]: '用户名已存在',
  [ErrorCode.VIDEO_NOT_FOUND]: '视频未找到',
  [ErrorCode.COMMENT_NOT_FOUND]: '评论未找到',
  [ErrorCode.PLAYLIST_NOT_FOUND]: '播放列表未找到',
  [ErrorCode.CATEGORY_NOT_FOUND]: '分类未找到',
  [ErrorCode.TAG_NOT_FOUND]: '标签未找到',
  [ErrorCode.USER_NOT_FOUND]: '用户未找到',
  [ErrorCode.INSUFFICIENT_PERMISSIONS]: '权限不足',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: '超过速率限制',
};
