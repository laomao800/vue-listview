import { createLocalVue } from '@vue/test-utils'
import Listview from '@/index.js'

const globalConfig = {
  validateResponse: () => false,
  resolveResponseErrorMessage: () => 'global config error',
  transformRequestData: requestData => {
    requestData.addon = 'requestAddon'
    return requestData
  },
  transformResponseData: response => {
    response.addon = 'responseAddon'
    return response
  },
  contentDataMap: {
    addon: 'addon',
    items: 'result.items',
    total: 'result.total_count'
  }
}

const localVue = createLocalVue()
localVue.use(Listview, globalConfig)

describe('Global config', () => {
  it('Vue.prototype.$LISTVIEW', () => {
    expect(localVue.prototype.$LISTVIEW).toEqual(globalConfig)
  })
})
