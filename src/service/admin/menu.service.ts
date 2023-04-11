import { Provide } from '@midwayjs/core';
import { MenuModel } from '../../model/meun.model';

@Provide()
export class MenuService {
  async getMenuList() {
    const menu = await MenuModel.findAll();

    return menu;
  }
}
