<template>
  <h2>CustomerRef使用</h2>
  <input type="text" v-model="message"><br>
  {{message}}
</template>

<script setup>
import { ref } from "vue";
import CustomRef from './hooks/debunceRef'
let message = CustomRef('555');

</script>

<style scoped>

</style>