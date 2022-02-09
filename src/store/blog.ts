import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useMusicStore } from './music'

interface BlogType {
  id: number
  name: string
  content: string
}

// composition API 写法（推荐）
export const useBlogStore = defineStore('blog', () => {
  const name = ref('krryblog')
  const list = ref([{ id: 1, name: '默认博客', content: '' }])

  const getName = computed(() => `输出 ${name.value}`)

  // 使用其他 store
  const musicStore = useMusicStore()
  const getMixMusicName = computed(
    () => `输出 ${name.value} ${musicStore.name}`
  )

  const addBlog = (item: BlogType) => {
    list.value.push(item)
  }

  return {
    name,
    list,
    getName,
    getMixMusicName,
    addBlog
  }
})
