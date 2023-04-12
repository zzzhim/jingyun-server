import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'menu',
  comment: '菜单表',
})
export class MenuModel extends Model<MenuModel> {
  @Column({
    type: DataType.INTEGER({ length: 11 }),
    primaryKey: true,
    autoIncrement: true,
    comment: '菜单ID',
  })
  id: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    comment: '菜单名称',
  })
  name: string;

  @Column({
    type: DataType.STRING(50),
    comment: '菜单图标',
  })
  icon: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: '菜单链接',
  })
  url: string;

  @Column({
    type: DataType.ENUM('0', '1', '2'), // 0 - 主菜单 1 - 子菜单 2 - 按钮
    allowNull: false,
    comment: '菜单类型',
  })
  type: '0' | '1' | '2';

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    allowNull: false,
    comment: '菜单排序',
  })
  sort: number;

  @Column({
    type: DataType.INTEGER({ length: 11 }),
    comment: '父菜单ID',
  })
  parent_id: number;

  @BelongsTo(() => MenuModel, 'parentId')
  parent: MenuModel;

  @HasMany(() => MenuModel, 'parentId')
  children: MenuModel[];

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: '是否隐藏',
  })
  hidden: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    comment: '是否启用',
  })
  enable: boolean;

  @Column({
    comment: '权限名称',
  })
  permission_name: string;

  @CreatedAt
  created_at?: Date;

  @UpdatedAt
  updated_at?: Date;
}
