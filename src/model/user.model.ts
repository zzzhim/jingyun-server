// src/model/user.ts
import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { RoleModel } from './role.model';

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id?: number;

  @Column({ type: DataType.STRING, unique: true })
  username?: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  email?: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar?: string;

  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '0' }) // 0 - 保密 1 - 女 2 - 男
  sex?: '0' | '1' | '2';

  @ForeignKey(() => RoleModel)
  role_id?: number;

  // @Column({ type: DataType.STRING, allowNull: false, defaultValue: '0' }) // 0 - user 1 - admin 2 - super admin
  // role?: '0' | '1' | '2';
  @BelongsTo(() => RoleModel)
  role?: RoleModel;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;
}
