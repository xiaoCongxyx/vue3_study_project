// h渲染函数
let h = (tag, props, children) => {
    // vnode -> javascript对象 -> {}
    return {
        tag,
        props,
        children
    }
}

// 挂载节点
let mount = (vnode, container) => {
    // vnode -> element
    let el = vnode.el = document.createElement(vnode.tag)

    // 通过props设置attribute
    for (let key in vnode.props) {
        let value = vnode.props[key]
        if (key.startsWith('on')) { // 是否为事件
            el.addEventListener(key.slice(2).toLowerCase(), value)
        } else {
            el.setAttribute(key, value)
        }
    }

    // 判断children的类型 string || Array
    if (typeof vnode.children === 'string') {
        el.textContent = vnode.children
    } else {
        vnode.children.forEach( v => {
            mount(v, el)
        })
    }

    // 挂载到根节点
    container.appendChild(el)

}

// patch比对函数
let patch = (n1, n2) => {
    console.log(n1, n2)
    if (n1.tag !== n2.tag) { // 新vnode的tag和之前的类型都不同 完全替换dom
        let parentEle = n1.el.parentElement
        parentEle.removeChild(n1.el);
        mount(n2, parentEle)
    } else {
        // 存储el
        let el = n2.el = n1.el;

        // 处理props
        let oldProps = n1.props || {};
        let newProps = n2.props || {};

        console.log( n1,  n2, oldProps, newProps)
        // 获取所有的newProps添加到el
        for (const propsKey in newProps) {
            const newValue = newProps[propsKey];
            const oldValue = oldProps[propsKey];
            if (newValue !== oldValue) {
                if (propsKey.startsWith('on')) { // 是否为事件
                    el.addEventListener(propsKey.slice(2).toLowerCase(), newValue)
                } else {
                    el.setAttribute(propsKey, newValue)
                }
            }
        }

        // 删除旧的props
        for (const key in oldProps) {
            if ( key.startsWith('on') ) {
                const value = oldProps[key]
                el.removeEventListener(key.slice(2).toLowerCase(), value)
            }
            if (!key in newProps) {
                el.removeAttribute(key)
            }
        }


        // 处理children
        let oldChildren = n1.children || [];
        let newChildren = n2.children || [];

        if ( typeof newChildren == 'string' ) { // newChildren为String
            if (typeof oldChildren == 'string') {
                if( newChildren !== oldChildren ) {
                    el.textContent = newChildren
                }
            } else {
                el.innerHTML = newChildren
            }
        } else { // newChildren为数组
            if( typeof oldChildren == 'string') { // oldChildren为string
                el.innerHTML = ''
                newChildren.forEach(v => {
                    mount(v, el)
                })
            } else { // oldChildren为数组

                // 对相同节点的原生进行patch
                let commonChildrenLength = Math.min(oldChildren.length, newChildren.length);
                for (let i = 0; i < commonChildrenLength; i++) {
                    patch(oldChildren[i], newChildren[i])
                }

                // newChildren > oldChildren
                if (newChildren.length > oldChildren.length) {
                    newChildren.slice(oldChildren.length).forEach(v => {
                        mount(v, el)
                    })
                }

                // oldChildren > newChildren
                if (oldChildren.length > newChildren.length) {
                    //unmount卸载操作
                    oldChildren.slice(newChildren.length).forEach(v => {
                        el.removeChild(v.el)
                    })
                }

            }
        }



    }
}