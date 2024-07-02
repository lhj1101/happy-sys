export const lStorageConfig = {
  state: {
    name: 'happy-', // 系统前缀
    expireTimeList: 'EXPIRE-TIME-LIST', // ls过期时间合集
    time: 86400, // 单位秒，默认一天
  },
  // 需要配置key才能setls
  keys: {
    token: 'token',
    name: 'name',
    password: 'password',
  }
}