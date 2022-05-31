import { ALL, Config, Init } from '@midwayjs/decorator';
import { MemoryCache } from '../decorator/propertyDecorator/memery.decorator';
import { Model } from '../decorator/classDecorator/model.decorator';
import { IUserOptions } from '../interface';
import { LoggingTime } from '../decorator/methodDecorator/loggingTime.decorator';
import { UserDecorator } from '../decorator/paramDecorator/user.decorator';

@Model()
// @Scope(ScopeEnum.Request, { allowDowngrade: true }) // 如果添加这行，则允许降级。
export class UserService {
  @Config(ALL)
  config;

  constructor() {
    console.log('UserService constructor');
  }

  @MemoryCache('aaa')
  cacheValue;

  @Init()
  async init() {
    // console.log(this.config);
    // console.log(1111, this.cacheValue);
  }

  @LoggingTime('ms')
  async getUser(options: IUserOptions, @UserDecorator() user?: string) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
