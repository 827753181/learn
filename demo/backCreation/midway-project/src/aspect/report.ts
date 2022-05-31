import { Aspect, IMethodAspect, JoinPoint } from '@midwayjs/decorator';
import { HomeController } from '../controller/home.controller';

// 第三个参数是优先级，数值越大越先注册越后执行(即数值越小越先执行)
@Aspect(HomeController, 'home', 0) // 这里只对 home 方法做拦截
export class ReportInfo implements IMethodAspect {
  /*
    try {
    // before
    // around or invokeMethod
    // afterReturn
    } catch(err){
        // afterThrow
    } finally {
        // after
    }
   */
  async around(point: JoinPoint) {
    // console.log('around');
    const result = await point.proceed(...point.args); // 执行原方法
    result.extraAround = 'world';
    return result;
  }
  async afterReturn(joinPoint: JoinPoint, result: any) {
    // console.log('afterReturn');
    result.extraAfterReturn = 'world';
    return result;
  }
  async after(joinPoint: JoinPoint, result: any, error: Error) {
    // console.log('final run after');
  }
  async before(joinPoint: JoinPoint): Promise<void> {
    // console.log('before');
  }
  async afterThrow(joinPoint: JoinPoint, error: Error): Promise<void> {
    // console.log('afterThrow');
  }
}
