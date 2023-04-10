export interface CreateRoleDto {
  id?: number;
  name?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  rolePermissions?: any[];
}
