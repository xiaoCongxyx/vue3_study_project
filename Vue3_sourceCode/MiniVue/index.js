function createApp(rootComponent) {
    return {
        mount(selector) {
            let container = document.querySelector(selector)
            let isMounted = false
            let oldVnode = null

            watchEffect(function () {
                if (!isMounted) { // 首次挂载  完成则改变isMounted值
                    oldVnode = rootComponent.render();
                    mount(oldVnode, container)
                    isMounted = true;
                } else { // 当依赖的值变化时需要拿到新旧node去比对
                    let newVNode = rootComponent.render()
                    console.log(oldVnode, newVNode,'patch.....')
                    patch(oldVnode,newVNode)
                    oldVnode = newVNode
                }
            })
        }
    }
}