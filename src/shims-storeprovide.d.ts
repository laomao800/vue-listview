import Vue from 'vue'

type LvStore = any
// TODO: 补充类型定义
interface _LvStore {}

declare module 'vue/types/vue' {
  interface Vue {
    lvStore: LvStore
  }
}
