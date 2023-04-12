import { Provide } from '@midwayjs/core';
import { MenuModel } from '../../model/meun.model';
import { CreateMenuDto } from '../../types/service/admin/menu.type';

@Provide()
export class MenuService {
  async getMenuList() {
    const menu = await MenuModel.findAll();

    return menu;
  }

  async addMenu(menuModel: CreateMenuDto) {
    const menu = await MenuModel.create(menuModel);

    return menu;
  }

  async editMenu(menuModel: CreateMenuDto) {
    await MenuModel.update(menuModel, {
      where: {
        id: menuModel.id,
      },
    });

    return {};
  }

  async deleteMenu(id: number) {
    await MenuModel.destroy({
      where: {
        id,
      },
    });

    return {};
  }
}
