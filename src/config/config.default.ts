import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1680935194403_8969',
  koa: {
    port: 7001,
  },
  sequelize: {
    dataSource: {
      // 第一个数据源，数据源的名字可以完全自定义
      default: {
        username: 'root',
        password: 'wangyafei1007!',
        database: 'jingyun_server',
        host: 'localhost',
        port: 3306,
        encrypt: false,
        dialect: 'mysql',
        define: { charset: 'utf8' },
        timezone: '+08:00',
        // 本地的时候，可以通过 sync: true 直接 createTable
        sync: true,
        // 或者扫描形式
        entities: ['**/model/*.model{.ts,.js}'],
      },
    },
  },
} as MidwayConfig;
