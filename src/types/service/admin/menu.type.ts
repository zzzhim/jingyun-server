import { MenuModel } from '../../../model/meun.model';

export interface CreateMenuDto {
  id?: number;
  name: string;
  icon?: string;
  url: string;
  type: '0' | '1' | '2';
  sort: number;
  parent_id?: number;
  hidden?: boolean;
  enable?: boolean;
  permission_name?: string;
  children?: MenuModel[];
}
