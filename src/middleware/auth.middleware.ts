import { Provide } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { UserModel } from '../model/user.model';
import { RoleModel } from '../model/role.model';
import { RolePermissionModel } from '../model/role_permission.model';
import { PermissionModel } from '../model/permission.model';
import { PermissionMetadataKey } from '../decorator/permission.decorator';

@Provide()
export class AuthMiddleware {
  async resolve() {
    return async (ctx: Context, next: NextFunction) => {
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
        ctx.status = 401;
        ctx.body = { message: 'User not found' };
        return;
      }

      // 检查是否有访问权限
      const permissions = user.role.role_permissions.map(
        rolePermission => rolePermission.permission.name
      );
      const requiredPermission = Reflect.getMetadata(
        PermissionMetadataKey,
        ctx._matchedRoute.controller[ctx.routerName].prototype,
        ctx.routerName
      );

      // 如果有权限要求，但是用户没有权限
      if (requiredPermission && !permissions.includes(requiredPermission)) {
        ctx.status = 403;
        ctx.body = { message: 'Forbidden' };
        return;
      }

      await next();
    };
  }
}
