import { track, trigger } from './effect.js'
export const reactive = <T extends object> (target: T) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      let res = Reflect.get(target, key, receiver)
      track(target, key)
      return res
    },
    set(target, key, value, receiver) {
      let res = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return res
    }
  })
} 