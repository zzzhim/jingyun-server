import { Provide, Scope, ScopeEnum } from '@midwayjs/core';
import { UserModel } from '../entity/user.entity';
import { FindAttributeOptions, WhereOptions } from 'sequelize';
import { CreateUserDto } from '../types/dao/user.type';

@Provide()
@Scope(ScopeEnum.Singleton)
export class UserDao {
  // 创建
  async saveUser(params: CreateUserDto) {
    // 创建实体 & 保存
    const user = await UserModel.create({
      ...params,
    });

    return user;
  }

  // 查询
  async findUser(
    query: WhereOptions<UserModel>,
    attributes?: FindAttributeOptions
  ) {
    // 查询单个
    const User = await UserModel.findOne({
      attributes,
      where: query,
    });

    return User;
  }

  // 查询所有
  async findAndCountUser(
    query: WhereOptions<UserModel>,
    attributes?: FindAttributeOptions
  ) {
    // 查询所有
    const { rows, count } = await UserModel.findAndCountAll({
      attributes,
      where: query,
    });

    return {
      list: rows,
      total: count,
    };
  }
}
