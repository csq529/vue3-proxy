class ReactiveEffect<T = any> {
  public fn: () => T
  constructor(fn: any) {
    this.fn = fn
  }
  run() {
    activeEffect = this
    this.fn();
  }
}

export const effect = (fn:Function) => {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
}

let targetMap = new WeakMap()
let activeEffect: ReactiveEffect
// 收集依赖
export const track = (target:object, key:any) => {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  // targetMap key: {name: 'dacui', age: 20, sex: '男'} value:Map(1) {'name' => ReactiveEffect}
  // depsMap key: "name" value: ReactiveEffect(fn)
  // dep ReactiveEffect(fn)
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }
  dep.add(activeEffect)
}

// 触发依赖
export const trigger = (target: object, key: any) => {
  let depsMap = targetMap.get(target)
  // dep ReactiveEffect(fn)
  let dep = depsMap.get(key)
  for (let effect of dep) {
    console.log('effect:', effect)
    effect.run()
  }
}