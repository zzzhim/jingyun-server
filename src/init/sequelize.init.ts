import { Autoload, Scope, ScopeEnum } from '@midwayjs/core';
import { Init } from '@midwayjs/decorator';
import { UserDao } from '../dao/user.dao';
import { RoleDao } from '../dao/role.dao';
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
    const roleDao = new RoleDao();

    const roles = [
      { name: 'user', description: '普通用户' },
      { name: 'admin', description: '管理员' },
      { name: 'superadmin', description: '超级管理员' },
    ];

    for (const roleData of roles) {
      const role = await roleDao.findRole({ name: roleData.name });
      if (!role) {
        await roleDao.saveRole(roleData);
      }
    }
  }

  // 初始化用户
  async initUser() {
    const userDao = new UserDao();
    const roleDao = new RoleDao();

    const role = await roleDao.findRole({ name: 'superadmin' });

    if (role) {
      // const rolePermissionModel = await RoleModel.findOne({
      //   where: { name: 'superadmin' },
      //   include: [
      //     {
      //       model: RolePermissionModel,
      //       as: 'role_permissions',
      //       include: [PermissionModel],
      //     },
      //   ],
      // });

      // console.log(rolePermissionModel.toJSON(), 'rolePermissionModel');

      const user = await userDao.findUser({
        role_id: role.id,
      });

      if (user) {
        return;
      }

      await userDao.saveUser({
        username: 'admin',
        password: '123456',
        role_id: role.id,
      });
    }
  }
}
