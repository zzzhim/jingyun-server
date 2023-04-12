import { Rule, RuleType } from '@midwayjs/validate';
import { MenuModel } from '../../model/meun.model';

export class CreateMenuDTO {
  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().optional())
  icon?: string;

  @Rule(RuleType.string().required())
  url: string;

  @Rule(RuleType.valid('0', '1', '2').required())
  type: '0' | '1' | '2';

  @Rule(RuleType.number().required())
  sort: number;

  @Rule(RuleType.number().optional())
  parent_id?: number;

  @Rule(RuleType.boolean().optional())
  hidden?: boolean;

  @Rule(RuleType.boolean().optional())
  enable?: boolean;

  @Rule(RuleType.string().optional())
  permission_name?: string;

  @Rule(
    RuleType.array().items(RuleType.object().instance(MenuModel)).optional()
  )
  children?: MenuModel[];
}

export class UpdateMenuDTO extends CreateMenuDTO {
  @Rule(RuleType.number().required())
  id: number;
}
