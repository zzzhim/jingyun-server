import { Middleware, Inject, MidwayWebRouterService } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';
import { RoleModel } from '../model/role.model';
import { RolePermissionModel } from '../model/role_permission.model';
import { PermissionModel } from '../model/permission.model';
import { PermissionMetadataKey } from '../decorator/permission.decorator';
import { ErrorCode } from '../types/response/code.error';
import { createResponse } from '../utils/response';
import { ErrorMessage } from '../types/response/message.error';

@Middleware()
export class AuthMiddleware {
  @Inject()
  webRouterService: MidwayWebRouterService;

  async resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      // 查询当前路由是否在路由表中注册
      const routeInfo = await this.webRouterService.getMatchedRouterInfo(
        ctx.path,
        ctx.method
      );

      // 如果没有注册权限，直接放行
      const requiredPermission = Reflect.getMetadata(
        PermissionMetadataKey,
        routeInfo.controllerClz.prototype,
        routeInfo.method as string
      );

      // 没有权限要求，直接放行
      if (!requiredPermission) {
        await next();
        return;
      }

      // 从请求头中获取用户ID
      const userId = ctx.get('user-id');

      if (!userId) {
        ctx.status = 401;
        ctx.body = { message: 'Unauthorized' };
        return;
      }

      const user = await UserModel.findByPk(userId, {
        include: [
          {
            model: RoleModel,
            include: [
              {
                model: RolePermissionModel,
                include: [PermissionModel],
              },
            ],
          },
        ],
      });

      if (!user) {
        ctx.status = ErrorCode.UNAUTHORIZED;
        ctx.body = createResponse(
          null,
          false,
          ctx.status,
          ErrorMessage[ctx.status]
        );
        return;
      }

      // 获取用户权限列表
      const permissions = user.role.role_permissions.map(
        rolePermission => rolePermission.permission.name
      );

      // 如果有权限要求，但是用户没有权限
      if (requiredPermission && !permissions.includes(requiredPermission)) {
        ctx.status = ErrorCode.UNAUTHORIZED;
        ctx.body = createResponse(
          null,
          false,
          ctx.status,
          ErrorMessage[ctx.status]
        );
        return;
      }

      await next();
    };
  }
}
