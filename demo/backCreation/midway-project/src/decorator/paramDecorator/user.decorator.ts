import { createCustomParamDecorator } from '@midwayjs/decorator';
export const USER_KEY = 'decorator:user_key';
export function UserDecorator(): ParameterDecorator {
  return createCustomParamDecorator(USER_KEY, {});
}
