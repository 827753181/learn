import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

describe('test/controller/home.test.ts', () => {
  it('should GET /api/get_user', async () => {
    // create app
    const app = await createApp<Framework>();

    // make request
    const result = await createHttpRequest(app)
      .get('/api/get_user')
      .query({ id: 1 });

    // use expect by jest
    expect(result.status).toBe(200);
    expect(result.body.message).toBe('OK');

    // 根据依赖注入 Id 获取实例
    const siteService = await app
      .createAnonymousContext()
      .requestContext.getAsync('SiteService');
    
    const res =await (siteService as any).getSite({ id: 1 })
    expect(
      res.message
    ).toBe('OK');

    // close app
    await close(app);
  });
});
