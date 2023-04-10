import { Middleware } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { createResponse } from '../utils/response';
import { ErrorMessage } from '../types/response/message.error';
import { ErrorCode } from '../types/response/code.error';

@Middleware()
export class GlobalErrorMiddleware {
  async resolve() {
    return async (ctx: Context, next: NextFunction) => {
      try {
        await next();
      } catch (error) {
        // 打印错误信息，以便于调试
        console.error('Error:', error);

        // 设置响应状态码
        ctx.status = error.status || 500;

        // 构建错误响应对象
        ctx.body = createResponse(
          null,
          false,
          ErrorMessage[ErrorCode[ctx.status]],
          error.message || 'Internal Server Error'
        );
      }
    };
  }
}
