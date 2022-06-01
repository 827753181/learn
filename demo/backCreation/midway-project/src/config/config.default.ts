import { MidwayConfig } from '@midwayjs/core';
import { FORMAT } from '@midwayjs/decorator';

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
  i18n: {
    localeTable: {
      en_US: require('../locales/en_US'),
      zh_CN: require('../locales/zh_CN'),
    },
    defaultLocale: 'en_US',
    // 语言映射，可以用 * 号通配
    fallbacks: {
      //   'en_*': 'en_US',
      //   pt: 'pt-BR',
    },
    // 是否将请求参数写入 cookie
    writeCookie: true,
    resolver: {
      // url query 参数，默认是 "locale"
      queryField: 'locale',
      cookieField: {
        // Cookie 里的 key，默认是 "locale"
        fieldName: 'locale',
        // Cookie 域名，默认为空，代表当前域名有效
        cookieDomain: '',
        // Cookie 默认的过期时间，默认一年
        cookieMaxAge: FORMAT.MS.ONE_YEAR,
      },
    },
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
