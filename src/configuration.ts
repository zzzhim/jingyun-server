import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import * as sequelize from '@midwayjs/sequelize';
import * as jwt from '@midwayjs/jwt';
import { ReportMiddleware } from './middleware/report.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { initializePermissions } from './utils/permissionInitializer';
import { GlobalErrorMiddleware } from './middleware/globalError.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    sequelize, // 加载 sequelize 组件
    jwt, // 加载 jwt 组件
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([
      GlobalErrorMiddleware,
      ReportMiddleware,
      AuthMiddleware,
    ]);

    // 当服务器启动时，initializePermissions函数将遍历所有控制器文件并将权限插入到数据库中。
    await initializePermissions();
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
