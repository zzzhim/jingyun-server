import { Inject, Controller, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { createResponse } from '../../utils/response';
import { MenuService } from '../../service/admin/menu.service';
import { Permission } from '../../decorator/permission.decorator';
import { CreateMenuDTO, UpdateMenuDTO } from '../../dto/admin/menu.dto';

@Controller('/api/admin/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Inject()
  menuService: MenuService;

  @Get('/list')
  @Permission('menu:list')
  async getMenuList() {
    const menu = await this.menuService.getMenuList();

    return createResponse(menu);
  }

  @Post('/add')
  @Permission('menu:add')
  async addMenu(@Body() body: CreateMenuDTO) {
    const menu = await this.menuService.addMenu(body);

    return createResponse(menu);
  }

  @Post('/edit')
  @Permission('menu:edit')
  async editMenu(@Body() body: UpdateMenuDTO) {
    const menu = await this.menuService.editMenu(body);

    return createResponse(menu);
  }

  @Post('/delete')
  @Permission('menu:delete')
  async deleteMenu(@Body() body: { id: number }) {
    const menu = await this.menuService.deleteMenu(body.id);

    return createResponse(menu);
  }
}
