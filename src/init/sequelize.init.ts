import { Autoload, Scope, ScopeEnum } from '@midwayjs/core';
import { Init } from '@midwayjs/decorator';
import * as md5 from 'md5';
import { RoleModel } from '../model/role.model';
import { UserModel } from '../model/user.model';
// import { RoleModel } from '../model/role.model';
// import { RolePermissionModel } from '../model/role_permission.model';
// import { PermissionModel } from '../model/permission.model';

@Autoload()
@Scope(ScopeEnum.Singleton)
export class SequelizeInit {
  @Init()
  async init() {
    this.initRoles();
    this.initUser();
  }

  // 初始化管理员角色
  async initRoles() {
    const roles = [
      { name: 'user', description: '普通用户' },
      { name: 'admin', description: '管理员' },
      { name: 'superadmin', description: '超级管理员' },
    ];

    for (const roleData of roles) {
      const role = await RoleModel.findOne({
        where: {
          name: roleData.name,
        },
      });
      if (!role) {
        await RoleModel.create(roleData);
      }
    }
  }

  // 初始化用户
  async initUser() {
    const role = await RoleModel.findOne({
      where: {
        name: 'superadmin',
      },
    });

    if (role) {
      const user = await UserModel.findOne({
        where: {
          username: 'admin',
          role_id: role.id,
        },
      });

      if (user) {
        return;
      }

      const password = md5('123456');

      await UserModel.create({
        username: 'admin',
        password: password,
        role_id: role.id,
      });
    }
  }
}
