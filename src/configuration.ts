import { Configuration, App, Inject } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as sequelize from '@midwayjs/sequelize';
import * as jwt from '@midwayjs/jwt';
import * as captcha from '@midwayjs/captcha';
import * as session from '@midwayjs/session';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { AuthMiddleware } from './middleware/auth.middleware';
import { initializePermissions } from './utils/permissionInitializer';
import { GlobalErrorMiddleware } from './middleware/globalError.middleware';
import { MemorySessionStore } from './store/session.store';

@Configuration({
  imports: [
    koa,
    validate,
    sequelize, // 加载 sequelize 组件
    jwt, // 加载 jwt 组件
    captcha, // 加载 captcha 组件
    session, // 加载 session 组件
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

  @Inject()
  memoryStore: MemorySessionStore;

  @Inject()
  sessionStoreManager: session.SessionStoreManager;

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

    this.sessionStoreManager.setSessionStore(this.memoryStore);
  }
}
