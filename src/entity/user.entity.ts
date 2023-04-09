import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VirtualColumn,
} from 'typeorm';
import { EntityModel } from '@midwayjs/orm';

@EntityModel('user', {})
export class UserModel {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username?: string;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: false })
  password?: string;

  @VirtualColumn({
    query: (alias: string) => {
      return `${alias}.id`;
    },
  })
  token?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: '0', nullable: true }) // 0 - 保密 1 - 女 2 - 男
  sex?: '0' | '1' | '2';

  @Column({ default: '0' }) // 0 - user 1 - admin 2 - super admin
  role?: '0' | '1' | '2';

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at?: Date;
}
