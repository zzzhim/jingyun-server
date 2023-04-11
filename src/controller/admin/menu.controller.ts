import { Inject, Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { createResponse } from '../../utils/response';
import { ErrorCode } from '../../types/response/code.error';
import { ErrorMessage } from '../../types/response/message.error';
import { MenuService } from '../../service/admin/menu.service';
// import { Permission } from '../../decorator/permission.decorator';

@Controller('/api/admin/menu')
export class MenuController {
  @Inject()
  ctx: Context;

  @Inject()
  menuService: MenuService;

  @Get('/list')
  // @Permission('access_login')
  async getMenuList() {
    const user = await this.menuService.getMenuList();

    if (!user) {
      return createResponse(
        user,
        false,
        ErrorCode.USER_NOT_FOUND,
        ErrorMessage[ErrorCode.USER_NOT_FOUND]
      );
    }

    return createResponse(user);
  }
}
