import type { LvStore } from '~/types'
import type { VNode } from 'vue'
import Vue from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    lvStore: LvStore
    $rootEmitProxy: LvStore['$rootEmitProxy']
  }
}
