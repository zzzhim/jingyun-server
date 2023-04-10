import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  CreatedAt,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { RolePermissionModel } from './role_permission.model';

@Table({ tableName: 'roles' })
export class RoleModel extends Model<RoleModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ unique: true })
  name: string;

  @Column
  description: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @HasMany(() => RolePermissionModel)
  role_permissions: RolePermissionModel[];
}
