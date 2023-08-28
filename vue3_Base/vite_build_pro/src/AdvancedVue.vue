<template>
  <h2 class="mb30">自定义指令</h2>
  <input type="text" v-focus style="display: block">
  <span class="format-time" v-time-format="'YYYY-MM-DD HH:mm'">{{ time }}</span>
  <h2 class="mb30">Vue插件</h2>
</template>

<script setup>
// 自定义指令
// 在 <script setup> 中，任何以 v 开头的驼峰式命名的变量都可以被用作一个自定义指令。在上面的例子中，vFocus 即可以在模板中以 v-focus 的形式使用。
// 在没有使用 <script setup> 的情况下，自定义指令需要通过 directives 选项注册
let vFocus = {
  mounted: el => el.focus(),
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  // mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
// 时间戳
let time = 1683699984527





</script>

<style scoped lang="scss">
.format-time {
  display: inline-block;
  box-sizing: border-box;
  margin-top: 25px;
  padding: 10px 25px;
  font-size: 18px;
  font-weight: bold;
  color: goldenrod;
  background-color: rgba(204, 204, 204, 0.66);
}
.mb30 {
  margin-bottom: 30px;
}
</style>