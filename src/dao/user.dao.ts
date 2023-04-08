import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { FindOptionsSelect, Repository } from 'typeorm';
import { UserModel } from '../entity/user.entity';

@Provide()
export class UserDao {
  @InjectEntityModel(UserModel)
  UserModel: Repository<UserModel>;

  // 保存
  async saveUser(params: UserModel) {
    // 创建实体
    const User = new UserModel();

    // 保存实体
    const UserResult = await this.UserModel.save(Object.assign(User, params));

    return UserResult;
  }

  // 查询
  async findUser(query: UserModel, select: FindOptionsSelect<UserModel>) {
    // 查询单个
    const User = await this.UserModel.findOne({
      select,
      where: query,
    });

    return User;
  }

  // 查询所有
  async findAllUser() {}
}
