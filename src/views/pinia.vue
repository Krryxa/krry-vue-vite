<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useMusicStore } from '@/store/music'
import { useBlogStore } from '@/store/blog'

const musicStore = useMusicStore()
const blogStore = useBlogStore()

const addList = (flag: boolean) => {
  flag
    ? musicStore.addMusic({
        id: 2,
        name: '春夏秋冬 - 张国荣',
        url: ''
      })
    : blogStore.addBlog({
        id: 2,
        name: 'Pinia 的学习',
        content: ''
      })
}

const { list, name } = storeToRefs(blogStore)

blogStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  console.log(mutation.type) // 'direct' | 'patch object' | 'patch function'
  // same as blogStore.$id
  console.log(mutation.storeId) // 'blog'
  // only available with mutation.type === 'patch object'
  // patch object passed to blogStore.$patch()
  mutation.type === 'patch object' && console.log(mutation.payload)

  console.log('改变的 state：', state)
})
</script>

<template>
  <h2>Pinia</h2>
  <div class="module">
    <h3>musicStore：option API 写法</h3>
    <div>state：{{ musicStore.list }}</div>
    <div>getters：{{ musicStore.getName }}</div>
    <button @click="addList(true)">触发 action，添加元素</button>
  </div>
  <div class="module">
    <h3>blogStore：composition API 写法</h3>
    <div>state：{{ blogStore.list }}</div>
    <div>getters：{{ blogStore.getName }}</div>
    <button @click="addList(false)">触发 action，添加元素</button>
    <div>在 blogStore 使用 musicStore：{{ blogStore.getMixMusicName }}</div>
  </div>
</template>

<style lang="scss" scoped>
div {
  margin: 10px 0;
  &.module {
    margin-top: 40px;
  }
}
</style>
