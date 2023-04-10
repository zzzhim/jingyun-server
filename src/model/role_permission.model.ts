import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { RoleModel } from './role.model';
import { PermissionModel } from './permission.model';

@Table({ tableName: 'role_permissions' })
export class RolePermissionModel extends Model<RolePermissionModel> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => RoleModel)
  @Column
  role_id: number;

  @ForeignKey(() => PermissionModel)
  @Column
  permission_id: number;

  @BelongsTo(() => RoleModel)
  role: RoleModel;

  @BelongsTo(() => PermissionModel)
  permission: PermissionModel;
}
