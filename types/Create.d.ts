import { Component, VueConstructor } from 'vue'
import { ListviewProps } from './Props'

type AllowPresetProps =
  | 'pressEnterSearch'
  | 'autoload'
  | 'requestMethod'
  | 'requestConfig'
  | 'transformRequestData'
  | 'transformResponseData'
  | 'contentDataMap'
  | 'contentMessage'
  | 'validateResponse'
  | 'resolveResponseErrorMessage'
  | 'usePage'
  | 'pageSize'
  | 'pageSizes'
  | 'pageProps'
  | 'pagePosition'
  | 'height'
  | 'fullHeight'
  | 'searchButton'
  | 'resetButton'

type CreateOptions = Partial<Pick<ListviewProps, AllowPresetProps>> & {
  replaceComponents?: Record<string, Component>
}

export type CreateFunction = (options?: CreateOptions) => VueConstructor
