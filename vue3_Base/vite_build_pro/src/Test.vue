<template>
  <div class="test">
    <div class="btn-wrap">
      <button @click="increNum">增加数字</button>
      <button @click="desciNum">减少数字</button>
    </div>
    <TransitionGroup name="list">
      <span class="num-list" v-for="item in numLists" :key="item">{{ item }}</span>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import {ref, reactive, toRefs, toRef, unref, readonly} from "vue";

const props = defineProps({
  todo: Object
})
let defaultNum = ref(7);
let numLists = ref([1, 2, 3, 4, 5, 6]);

function increNum() {
  numLists.value.splice(Math.floor(Math.random() * numLists.value.length), 0, defaultNum.value++);
}

function desciNum() {
  numLists.value.splice(Math.floor(Math.random() * numLists.value.length), 1);
}

</script>

<style scoped lang="scss">
.test {
  .btn-wrap {
    margin: 20px 0;

    button {
      display: inline-block;
      margin: 0 20px;
      cursor: pointer;
    }
  }

  .num-list {
    display: inline-block;
    width: 120px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 20px 15px;
    font-size: 18px;
    background-color: skyblue;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(100px) scale(0.5);
  }


  .list-move,
  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }


  /* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
  .list-leave-active {
    position: absolute;
  }



}
</style>