import { lStorage } from './lStorage'

// 二次封装localStorage，支持设置过期时间，规范key唯一
export function storage () {
    return {
        lStorage
    }
}