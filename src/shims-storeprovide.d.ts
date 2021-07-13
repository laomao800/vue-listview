/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'

interface ContentMessage {
  type: 'warning' | 'info' | 'error' | null
  text: string
}

interface LvStore {
  // store
  pressEnterSearch: boolean
  filterModel: Record<string, any>
  $rootEmitProxy: (event: string) => void
  search: (keepInPage = false) => Promise<>

  // layout
  contentHeight: number
  contentLoading: boolean

  // content
  contentData: { items: any[]; total: number }
  internalSelection: any[]
  internalContentMessage: ContentMessage

  // footer
  usePage: true
  currentPage: number
  currentPageSize: number
  pageSizes: number
  pagePosition: 'left' | 'right'
  pageProps: Record<string, any>
}

declare module 'vue/types/vue' {
  interface Vue {
    lvStore: LvStore
    $rootEmitProxy: LvStore['$rootEmitProxy']
  }
}
