import { lStorageConfig } from './lStorageConfig'

export const lStorage = {
  /**
   * 设置过期时间
   * @param {*} key key值
   * @param {*} sec 秒
   */
  setExpireTime(keyName, sec){
    const now = Date.now(); // 获取当前时间的毫秒数
    const oneMinuteLater = now + (sec * 1000); // 计算x秒后的时间的毫秒数
    const setExpireTimeName = lStorageConfig.state.name + lStorageConfig.state.expireTimeList // 设置过期时间的键名合集ls键名
    const expireMap = JSON.parse(localStorage.getItem(setExpireTimeName)) || {}// 获取过期时间的键名合集
    // 新增的值
    let obj = {
      [keyName]: oneMinuteLater
    }
    const newExpireMap = Object.assign({}, expireMap, obj)
    localStorage.setItem(setExpireTimeName, JSON.stringify(newExpireMap))
  },
  /**
   * 删除过期时间的键名合集已过期的key
   * @param {*} keyName key名
   * @param {*} sec 秒
   */
  delExpireTime(keyName, sec){
    const setExpireTimeName = lStorageConfig.state.name + lStorageConfig.state.expireTimeList // 设置过期时间的键名合集ls键名
    const expireMap = JSON.parse(localStorage.getItem(setExpireTimeName)) || {} // 获取过期时间的键名合集
    const newExpireMap = Object.assign({}, expireMap)
    delete newExpireMap[keyName]
    localStorage.setItem(setExpireTimeName, JSON.stringify(newExpireMap))
  },
  /**
   * 设置ls数据
   * @param {*} key key值
   * @param {*} value value值
   * @param {*} sec 单位秒
   * @returns 
   */
  setItem(key, value, sec = lStorageConfig.state.time){
    if(!Object.prototype.hasOwnProperty.call(lStorageConfig.keys, key)) return console.log('请先配置唯一key: ' + key) // 必须在lStorageConfig先配置
    const keyName = lStorageConfig.state.name + key
    localStorage.setItem(keyName, value) // 设置ls
    lStorage.setExpireTime(keyName, sec) // 设置过期时间
  },

  /**
   * 获取ls数据
   * @param {*} key key值
   * @returns 
   */
  getItem(key){
    const keyName = lStorageConfig.state.name + key
    const setExpireTimeName = lStorageConfig.state.name + lStorageConfig.state.expireTimeList // 设置过期时间的键名合集
    const expireMap = JSON.parse(localStorage.getItem(setExpireTimeName)) || {}
    // 判断时间是否已过期
    if(expireMap[keyName] && expireMap[keyName] > Date.now()) {
      return localStorage.getItem(keyName) // 返回对应ls数据
    } else {
      localStorage.removeItem(keyName) // 删除ls
      lStorage.delExpireTime(keyName) // 删除设置过期时间合集的对应键名
      // console.log(keyName + '已过期')
      return null
    }
  }
}
