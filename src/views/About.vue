<template>
  <div>
    <button @click="addKey('token')">token</button>
    <button @click="addKey('name')">name</button>
    <button @click="addKey('password')">password</button>
    <button @click="addKey('qqq')">qqq</button>
    <button @click="getKey('token')">get token</button>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive } from 'vue'
import { storage } from '../utils/storage/index.js'
const { lStorage } = storage()

const addKey = (key) => {
  lStorage.setItem(key, 123, 3)
}
const getKey = (key) => {
  console.log('getKey:' + key, lStorage.getItem(key));
}
</script>

<style scoped>
</style>
