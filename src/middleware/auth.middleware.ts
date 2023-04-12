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
      // 验证token
      const authorization = await this.authorization(ctx);

      // 验证权限
      const permission = await this.permission(ctx);

      if (!authorization || !permission) return;

      await next();
    };
  }

  // token验证
  async authorization(ctx: Context) {
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
      return true;
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

      return true;
    } catch (error) {
      console.log(error, 'auth.middleware');
      this.response(ctx);
    }
  }

  // 权限验证
  async permission(ctx: Context) {
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
      return true;
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

    // 超级管理员直接放行
    if (user?.role?.name === 'superadmin') {
      return true;
    }

    if (!user) {
      this.response(ctx, ErrorCode.INSUFFICIENT_PERMISSIONS);
      return;
    }

    // 获取用户权限列表
    const permissions = user.role.role_permissions.map(
      rolePermission => rolePermission.permission.name
    );

    // 如果有权限要求，但是用户没有权限
    if (requiredPermission && !permissions.includes(requiredPermission)) {
      this.response(ctx, ErrorCode.INSUFFICIENT_PERMISSIONS);
      return;
    }

    return true;
  }

  response(ctx: Context, status?: number) {
    ctx.status = status ?? ErrorCode.UNAUTHORIZED;
    ctx.body = createResponse(
      null,
      false,
      ctx.status,
      ErrorMessage[ctx.status]
    );
  }
}
