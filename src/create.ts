import Vue from 'vue'
import pick from 'lodash/pick'
import isPlainObject from 'lodash/isPlainObject'
import _Listview from '@/Listview'

const allowPresetProps = [
  // StoreProvider
  'pressEnterSearch',
  'autoload',
  'requestMethod',
  'requestConfig',
  'transformRequestData',
  'transformResponseData',
  'contentDataMap',
  'contentMessage',
  'validateResponse',
  'resolveResponseErrorMessage',
  'usePage',
  'pageSize',
  'pageSizes',
  'pageProps',
  'pagePosition',

  // ListviewLayout
  'height',
  'fullHeight',

  // Filterbar
  'searchButton',
  'resetButton',
]

export function create(options?: any) {
  let component = _Listview

  if (isPlainObject(options)) {
    const { replaceComponents = {}, ..._options } = options
    component = Vue.extend({
      extends: _Listview,
      data() {
        return {
          presetProps__: pick(_options, allowPresetProps),
          replaceComponents__: replaceComponents,
        }
      },
    })
  }

  return { component }
}
