import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';
import { IUserOptions } from '../interface';

@Provide()
// @Scope(ScopeEnum.Request, { allowDowngrade: true }) // 如果添加这行，则允许降级。
export class UserService {
  constructor() {
    console.log('user');
  }
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }
}
