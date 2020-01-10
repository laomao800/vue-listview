import _ from 'lodash'
import VueTestUtils, { mount, createLocalVue } from '@vue/test-utils'
import Listview from '@/index.js'
import { createRequestSpyWrapper } from '../helpers'

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
  },
  usePage: {
    pageIndex: 'global_page_index',
    pageSize: 'global_page_size'
  }
}

const localVue = createLocalVue()
localVue.use(Listview, globalConfig)
VueTestUtils.config.mocks['$LISTVIEW'] = globalConfig

describe('Global config', () => {
  it('Vue.prototype.$LISTVIEW', () => {
    expect(localVue.prototype.$LISTVIEW).toEqual(globalConfig)
  })

  it('Use global config', () => {
    const { wrapper, requestSpy } = createRequestSpyWrapper()
    expect(_.pick(wrapper.vm.overrideProps, Object.keys(globalConfig))).toEqual(
      globalConfig
    )
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('global_page_index')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('global_page_size')
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
      },
      usePage: {
        pageIndex: 'inter_page_index',
        pageSize: 'inter_page_size'
      }
    }
    const { wrapper, requestSpy } = createRequestSpyWrapper(propsData)
    expect(_.pick(wrapper.vm.overrideProps, Object.keys(propsData))).toEqual(
      propsData
    )
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('inter_page_index')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('inter_page_size')
  })
})
