class Dep {
    constructor() {
        this.subscribers = new Set() // 保证没有重复
    }

    // 注入依赖
    depend() {
        // 判断是否有依赖
        if (activeEffect) {
            this.subscribers.add(activeEffect)
        }
    }

    // 通知调用
    notify() {
        this.subscribers.forEach(effect => {
            effect()
        })
    }

}

const targetMap = new WeakMap();
function getDep(target,key)  {
    // 根据对象(target) 取出对应的map对象
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    // 取出具体的dep对象
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Dep();
        depsMap.set(key, dep)
    }
    return dep;
}


// vue2使用defineProperty 对 raw进行数据劫持
let reactive = (raw) => {

    Object.keys(raw).forEach(key => {
        let dep = getDep(raw,key)
        let value = raw[key]
        Object.defineProperty(raw, key, {
            get() {
                dep.depend();
                return value;
            },
            set(newVal) {
                if(value !== newVal) {
                    value = newVal;
                    dep.notify()
                }
            }
        })
    })
    return raw;
}


let activeEffect = null
const watchEffect = effect => {
    activeEffect = effect
    effect() // 首次就执行一次effect注入
    activeEffect = null; // 初始化注入的依赖  防止depend死循环
}



const info = reactive({ count: 100, name:'tomato' });
const msg = reactive({ height: 167 });


watchEffect(() => {
    console.log( "effect1：", info.count * 2)
})

watchEffect(() => {
    console.log("effect2：", info.count * info.count)
})

watchEffect(() => {
    console.log("effect3：",info.name)
})

watchEffect(() => {
    console.log("effect4：",msg.height)
})

// info.count++
// info.name = 'xiaoCong'
msg.height = 172