import { OmitDto, PickDto, Rule, RuleType } from '@midwayjs/validate';

export class CommonUserDTO {
  @Rule(RuleType.string().max(10))
  token: string;
  @Rule(RuleType.string().max(10))
  workId: string;
}
export class userDto extends CommonUserDTO {
  @Rule(RuleType.number().max(9999).required())
  uid: number;
}
// only token
export class simpleUserDto extends PickDto(CommonUserDTO, ['token']) {}
// only workId
export class NewUserDTO extends OmitDto(CommonUserDTO, ['token']) {}
