<script setup lang="ts">
import {ref} from 'vue'
import Test from './Test.vue'
import CustomerRef from './CustomerRef.vue'
import ComputedAndWatch from './ComputedAndWatch.vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
let a = 15;
let groceryList = ref([
  {id: 0, text: 'Vegetables'},
  {id: 1, text: 'Cheese'},
  {id: 2, text: 'Whatever else humans are supposed to eat'}
])
</script>

<template>
  <h2>vue3学习{{ a }}</h2>
  <ul>
    <Test/>
  </ul>
  <CustomerRef/>
  <ComputedAndWatch/>
</template>

<style lang="scss">
html, body, #app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;

  #app {
    overflow: hidden;
    padding: 0 50px;
  }
}
</style>
