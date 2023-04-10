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
import { AuthorizationMetadataKey } from '../decorator/authorization.decorator';
import { JwtService } from '@midwayjs/jwt';
import { readFileSync } from 'fs';
import path = require('path');

@Middleware()
export class AuthMiddleware {
  @Inject()
  webRouterService: MidwayWebRouterService;

  @Inject()
  jwtService: JwtService;

  async resolve() {
    return async (ctx: Context, next: () => Promise<any>) => {
      try {
        // 验证token
        await this.authorization(ctx);

        // 验证权限
        await this.permission(ctx);

        await next();
      } catch (error) {
        console.log(error, 'auth.middleware');
        this.response(ctx);
      }
    };
  }

  // token验证
  async authorization(ctx: Context) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      // 查询当前路由是否在路由表中注册
      const routeInfo = await this.webRouterService.getMatchedRouterInfo(
        ctx.path,
        ctx.method
      );

      // 如果没有注册权限，直接放行
      const requiredPermission = Reflect.getMetadata(
        AuthorizationMetadataKey,
        routeInfo.controllerClz.prototype,
        routeInfo.method as string
      );

      // 没有权限要求，直接放行
      if (requiredPermission === false) {
        resolve(true);
        return;
      }

      try {
        // 从请求头中获取token
        const token = ctx.get('token');
        this.jwtService.verifySync(
          token,
          readFileSync(path.join(__dirname, '../../secret.key'), {
            encoding: 'utf-8',
          })
        );

        resolve(true);
      } catch (error) {
        console.log(error, 'auth.middleware');
        reject();
      }
    });
  }

  // 权限验证
  async permission(ctx: Context) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
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
        resolve(true);
        return;
      }

      // 从请求头中获取token
      const token = ctx.get('token');
      const tokenResult = this.jwtService.decodeSync(token) as UserModel;

      const user = await UserModel.findByPk(tokenResult.id, {
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
        reject();
        return;
      }

      // 获取用户权限列表
      const permissions = user.role.role_permissions.map(
        rolePermission => rolePermission.permission.name
      );

      // 如果有权限要求，但是用户没有权限
      if (requiredPermission && !permissions.includes(requiredPermission)) {
        reject();
        return;
      }

      resolve(true);
      return;
    });
  }

  response(ctx: Context) {
    ctx.status = ErrorCode.UNAUTHORIZED;
    ctx.body = createResponse(
      null,
      false,
      ctx.status,
      ErrorMessage[ctx.status]
    );
  }
}
