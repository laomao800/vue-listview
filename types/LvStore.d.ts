interface ContentMessage {
  type: 'warning' | 'info' | 'error' | null
  text: string
}

export interface LvStore {
  // store
  pressEnterSearch: boolean
  filterModel: Record<string, any>
  $rootEmitProxy: (event: string, ...args: any[]) => void
  search: (keepInPage = false) => Promise<>

  // layout
  contentHeight: number
  contentLoading: boolean

  // content
  contentData: { items: any[]; total: number }
  selection: any[]
  internalContentMessage: ContentMessage

  // footer
  usePage: true
  currentPage: number
  currentPageSize: number
  pageSizes: number
  pagePosition: 'left' | 'right'
  pageProps: Record<string, any>
}
