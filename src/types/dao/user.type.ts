export interface CreateUserDto {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  avatar?: string;
  sex?: '0' | '1' | '2';
  role?: '0' | '1' | '2';
  createdAt?: number;
  updatedAt?: number;
}
