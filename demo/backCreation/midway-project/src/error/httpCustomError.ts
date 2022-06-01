import { MidwayError, registerErrorCode } from '@midwayjs/core';

export const CustomHttpErrorCodeEnum = registerErrorCode('CustomHttpError', {
  UNKNOWN: 10000,
  COMMON: 10001,
  PARAM_TYPE: 10002,
  // ...
} as const);
export class HttpCustomError extends MidwayError {
  constructor(
    message = 'http-custom-error',
    code: typeof CustomHttpErrorCodeEnum[keyof typeof CustomHttpErrorCodeEnum] = CustomHttpErrorCodeEnum.UNKNOWN
  ) {
    super(message, code);
  }
}
