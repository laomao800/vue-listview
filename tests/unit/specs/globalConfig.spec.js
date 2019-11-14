import _ from 'lodash'
import { mount, createLocalVue } from '@vue/test-utils'
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

  it('Props will override global config', () => {
    const propsData = {
      validateResponse: () => true,
      resolveResponseErrorMessage: () => 'config error',
      transformRequestData: requestData => {
        requestData.addon = 'requestAddon from prop'
        return requestData
      },
      transformResponseData: response => {
        response.addon = 'responseAddon from prop'
        return response
      },
      contentDataMap: {
        addon: 'prop.addon',
        items: 'prop.result.items',
        total: 'prop.result.total_count'
      }
    }
    const wrapper = mount(Listview, {
      propsData
    })
    expect(_.pick(wrapper.vm, Object.keys(propsData))).toEqual(propsData)
  })
})
