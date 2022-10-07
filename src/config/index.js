/**
 * 环境配置的封装
 */
const env = import.meta.env.MODE || 'prod'
const EnvConfig = {
  dev: {
    baseApi: '/',
    mockApi: 'https://www.fastmock.site/mock/cdfae751f2a9b94a51b092728cebee67/api'
  },
  test: {
    baseApi: '//test/futufe.com/api',
    mockApi: 'https://www.fastmock.site/mock/cdfae751f2a9b94a51b092728cebee67/api'
  },
  prod: {
    baseApi: '//futufe.com/api',
    mockApi: 'https://www.fastmock.site/mock/cdfae751f2a9b94a51b092728cebee67/api'
  }
}
export default {
  env: 'dev',
  mock: true,
  ...EnvConfig[env]
}