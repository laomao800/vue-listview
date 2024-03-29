import Vue from 'vue'
import pick from 'lodash/pick'
import isPlainObject from 'lodash/isPlainObject'
import { Listview as _Listview } from '@/index'
import { CreateFunction } from '~/types/Create'

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

const create: CreateFunction = (options = {}) => {
  options = isPlainObject(options) ? options : {}
  const { replaceComponents = {}, ..._options } = options

  return Vue.extend({
    extends: _Listview,
    data() {
      return {
        presetProps__: pick(_options, allowPresetProps),
        replaceComponents__: replaceComponents,
      }
    },
  })
}

export { create }
