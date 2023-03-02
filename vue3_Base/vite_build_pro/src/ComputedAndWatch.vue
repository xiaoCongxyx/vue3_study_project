<template>
  <h2>计算属性与监听器</h2>
  <h4>计算属性</h4>
  <input type="text" v-model="skillFName" style="margin-right: 15px">
  <input type="text" v-model="skillLName">
  <div style="margin-top: 15px;color: blue; font-size: 26px; font-weight: bold;">{{ skillFullName }}</div>
  <h4>监听器&ref</h4>
  <div ref="docRef"></div>
  <h4>侦听器watch使用</h4>
  <ul>
    <li v-for="item of hobbyLists" :key="item">{{ item }}</li>
  </ul>
  <button @click="changeHobby">改变数据</button>
  <div style="position: fixed;bottom: 30px;right: 15px;display: flex;flex-direction: column">
    <span>X：{{mousePosition.mouseX}}</span>
    <span>Y：{{mousePosition.mouseY}}</span>
  </div>
</template>
<script setup>
import {ref, watch, reactive, watchEffect, computed, onMounted} from "vue";
import CustomRef from './hooks/debunceRef';
import mousePos from './hooks/mousePos';

let mousePosition = mousePos()

let skillFName = CustomRef('破界-')
let skillLName = CustomRef('莫虚斩')

let docRef = ref(null);

let skillFullName = computed(() => {
  return skillFName.value + skillLName.value;
});

// 取到ref的方法一  方法二使用onMounted生命周期
watchEffect(() => {
  console.log(docRef.value)
    let text = docRef.value;
    text.innerHTML = `监听改变再加入数据${(Math.random() * 10).toFixed(4)}`
},{ // 执行时机 默认pre 。 post在挂载完监听
  flush: 'post'
})

// let hobbyLists = reactive({
//   soccer: 'Messi',
//   game: '守望先锋',
//   song: 'I AM'
// });
let hobbyLists = ref({
  soccer: 'Messi',
  game: '守望先锋',
  song: 'I AM'
});

// 侦听器 传入一个getter函数
// watch(() => hobbyLists.game,(newVal,oldVal) => {
//   console.log(`newVal:${newVal}`,`oldVal:${oldVal}`)
// })

watch(() => hobbyLists.value.game,(newVal,oldVal) => {
  console.log(`newVal:${newVal}`,`oldVal:${oldVal}`)
})

let changeHobby = () => {
  hobbyLists.value.game = `奥日2：精灵与萤火之森${(Math.random()*15).toFixed(5)}`
}

</script>

<style scoped>

</style>