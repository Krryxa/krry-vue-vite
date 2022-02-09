import { defineStore } from 'pinia'

interface MusicType {
  id: number
  name: string
  url: string
}

// option API 写法
export const useMusicStore = defineStore('music', {
  state: () => ({
    name: 'krrymusic',
    list: [{ id: 1, name: '默认歌曲', url: '' }]
  }),
  getters: {
    getName: (state) => `输出 ${state.name}`
  },
  actions: {
    addMusic(item: MusicType) {
      this.list.push(item)
    }
  }
})
