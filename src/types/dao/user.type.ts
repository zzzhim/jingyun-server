import { RoleModel } from '../../model/role.model';

export interface CreateUserDto {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  sex?: '0' | '1' | '2';
  role_id?: number;
  role?: RoleModel;
  created_at?: Date;
  updated_at?: Date;
}
