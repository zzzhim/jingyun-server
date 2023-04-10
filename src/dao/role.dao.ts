import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { RoleModel } from '../model/role.model';
import { FindAttributeOptions, WhereOptions } from 'sequelize';
import { CreateRoleDto } from '../types/dao/role.type';

@Provide()
@Scope(ScopeEnum.Singleton)
export class RoleDao {
  // 创建
  async saveRole(params: CreateRoleDto) {
    // 创建实体 & 保存
    const role = await RoleModel.create({
      ...params,
    });

    return role;
  }

  // 查询
  async findRole(
    query: WhereOptions<RoleModel>,
    attributes?: FindAttributeOptions
  ) {
    // 查询单个
    const role = await RoleModel.findOne({
      attributes,
      where: query,
    });

    return role;
  }

  // 查询所有
  async findAndCountRole(
    query: WhereOptions<RoleModel>,
    attributes?: FindAttributeOptions
  ) {
    // 查询所有
    const { rows, count } = await RoleModel.findAndCountAll({
      attributes,
      where: query,
    });

    return {
      list: rows,
      total: count,
    };
  }
}
