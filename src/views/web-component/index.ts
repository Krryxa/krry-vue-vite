import { defineCustomElement } from 'vue'
import LittleSfc from './little-sfc.ce.vue'

const MyVueElement = defineCustomElement({
  props: {
    info: String
  },
  emits: {},
  template: `<div class="test">{{ info }}</div>`,
  styles: [`.test { color: red; }`]
})
// 注册
customElements.define('krry-vue-element', MyVueElement)

console.log(LittleSfc.styles) // ["/* 内联的 css */"]
const LittleSfcEle = defineCustomElement(LittleSfc)

// 注册
customElements.define('krry-little-sfc', LittleSfcEle)