import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1652151679533_9910',
  koa: {
    port: 7123,
  },
  orm: {
    /**
     * 单数据库实例
     */
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'asd456789',
    database: 'flb_test_db',
    synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true
    logging: false,
  },
  session: {
    renew: true,
  },
  httpClient: {
    default: {
      timeout: 3000,
    },
    clients: {
      aaa: {
        baseUrl: '',
      },
      bbb: {
        baseUrl: '',
      },
    },
  },
} as MidwayConfig;
