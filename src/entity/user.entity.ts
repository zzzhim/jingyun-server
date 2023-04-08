import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ nullable: true })
  avatar?: string;

  @Column({ default: '0', nullable: true }) // 0 - 保密 1 - 女 2 - 男
  sex?: string;

  @Column({ default: '0' }) // 0 - user 1 - admin 2 - super admin
  role?: string;

  @CreateDateColumn({
    type: 'timestamp',
  })
  created_at?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updated_at?: Date;
}
