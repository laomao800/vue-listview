import Vue from 'vue'
import _Listview from '@/Listview'
import { pick } from 'lodash'

const allowPresetProps = [
  'searchButton',
  'resetButton',
  'usePage',
  'pagePosition',
  'pageSizes',
  'pageSize',
  'pageProps',
  'transformRequestData',
  'transformResponseData',
  'resolveResponseErrorMessage',
  'contentDataMap',
]

export function create(options: any = {}) {
  const component = Vue.extend({
    extends: _Listview,
    data() {
      return {
        presetProps: pick(options, allowPresetProps),
      }
    },
  })

  return { component }
}
