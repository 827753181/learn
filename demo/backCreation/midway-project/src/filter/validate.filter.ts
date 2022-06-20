import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { MidwayValidationError } from '@midwayjs/validate';

@Catch(MidwayValidationError)
export class ValidationErrorFilter {
  async catch(err: MidwayValidationError, ctx: Context) {
    return {
      success: false,
      status: 500,
      message: err.message,
    };
  }
}
