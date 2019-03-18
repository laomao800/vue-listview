import Vue from 'vue'
import { mount } from '@vue/test-utils'
import Listview from '@/index'
import { successWrap } from '../../mock-api/utils'

const mockDataList = Array(10)
  .fill()
  .map((row, index) => ({ id: index, name: `row${index}` }))

const DataStore = function() {
  const store = {}
  return {
    store() {
      return store
    },
    set(key, data) {
      key && (store[key] = data)
    },
    get(key) {
      return store[key]
    },
    hasProp(key, prop) {
      return store[key] && store[key].hasOwnProperty(prop)
    },
    getProp(key, prop) {
      return store[key] && store[key][prop]
    }
  }
}

function createVM(store, options = {}) {
  return mount({
    template: `<Listview ref="listview" v-bind="$data" />`,
    components: { Listview },
    data() {
      return {
        fieldFields: [],
        autoload: false,
        usePage: true,
        pageSize: 2,
        requestHandler: this.requestFunc,
        ...options
      }
    },
    methods: {
      requestFunc(requestData) {
        store && store.set('requestData', requestData)
        return Promise.resolve(
          successWrap({
            items: mockDataList,
            total_count: 40
          })
        )
      }
    }
  })
}

describe('分页参数', () => {
  let store, wrapper, $listview, $pagination

  beforeEach(() => {
    store = new DataStore()
    wrapper = createVM(store, {
      usePage: true
    })
    $listview = wrapper.vm.$refs.listview
    $pagination = wrapper.find({ name: 'ElPagination' })
  })

  it('带分页参数', () => {
    expect($pagination).toBeTruthy()
    $listview.search()
    expect(store.getProp('requestData', 'page_index')).toBe(1)
    expect(store.getProp('requestData', 'page_size')).toBe(2)
  })

  it('不带分页参数', () => {
    wrapper.setData({ usePage: false })
    $listview.search()
    expect(store.hasProp('requestData', 'page_index')).toBe(false)
    expect(store.hasProp('requestData', 'page_size')).toBe(false)
  })

  it('自定义分页参数', () => {
    wrapper.vm.usePage = {
      pageIndex: 'customPageIndex',
      pageSize: 'customPageSize'
    }
    $listview.search()
    expect(store.getProp('requestData', 'customPageIndex')).toBe(1)
    expect(store.getProp('requestData', 'customPageSize')).toBe(2)
  })

  it('无效自定义分页参数', () => {
    wrapper.vm.usePage = {
      errorPageIndex: 'customPageIndex',
      errorPageSize: 'customPageSize'
    }
    $listview.search()
    expect(store.getProp('requestData', 'page_index')).toBe(1)
    expect(store.getProp('requestData', 'page_size')).toBe(2)
  })

  it('pageSize 切换', () => {
    $pagination.vm.$emit('size-change', 3)
    expect($listview.currentPage).toBe(1)
    expect($listview.currentPageSize).toBe(3)
  })

  it('search(true) 保持当前页码', () => {
    $pagination.vm.$emit('current-change', 20)
    $listview.search(true)
    expect($listview.currentPage).toBe(20)
    $listview.search()
    expect($listview.currentPage).toBe(1)
  })
})

describe('Request', () => {
  const store = new DataStore()
  const wrapper = createVM(store, {
    filterModel: {
      static_text: 'abc',
      multipleSelect: [1, 2, 3]
    },
    filterFields: [],
    transformRequestData: null,
    requestDataKeyCase: null
  })
  const $listview = wrapper.vm.$refs.listview

  it('常规参数验证', () => {
    $listview.search()
    expect(store.getProp('requestData', 'static_text')).toBe('abc')
    expect(store.getProp('requestData', 'multipleSelect')).toEqual([1, 2, 3])
  })

  it('transformRequestData', () => {
    wrapper.setData({
      transformRequestData: requestData => {
        return {
          addonNum: 1,
          addonStr: 'listview',
          staticText: requestData.static_text,
          multipleSelect: requestData.multipleSelect
        }
      }
    })
    $listview.search()
    expect(store.getProp('requestData', 'staticText')).toBe('abc')
    expect(store.getProp('requestData', 'multipleSelect')).toEqual([1, 2, 3])
    expect(store.getProp('requestData', 'addonNum')).toBe(1)
    expect(store.getProp('requestData', 'addonStr')).toBe('listview')
  })

  it('自定义参数 getter', () => {
    wrapper.setData({
      filterFields: [
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ],
          get: val => val.join(',')
        }
      ]
    })
    $listview.search()
    expect(store.getProp('requestData', 'multipleSelect')).toBe('1,2,3')
  })
})

describe('requestDataKeyCase', () => {
  const store = new DataStore()
  const wrapper = createVM(store, {
    filterModel: {
      static_text: 'abc',
      staticNumber: 123
    },
    requestDataKeyCase: null
  })
  const $listview = wrapper.vm.$refs.listview

  it('camelCase', () => {
    wrapper.setData({
      requestDataKeyCase: 'camelCase'
    })
    $listview.search()
    expect(store.get('requestData')).toHaveProperty('staticText')
    expect(store.get('requestData')).toHaveProperty('staticNumber')
  })

  it('snakeCase', () => {
    wrapper.setData({
      requestDataKeyCase: 'snakeCase'
    })
    $listview.search()
    expect(store.get('requestData')).toHaveProperty('static_text')
    expect(store.get('requestData')).toHaveProperty('static_number')
  })

  it('pascalCase', () => {
    wrapper.setData({
      requestDataKeyCase: 'pascalCase'
    })
    $listview.search()
    expect(store.get('requestData')).toHaveProperty('StaticText')
    expect(store.get('requestData')).toHaveProperty('StaticNumber')
  })
})

describe('Response', () => {
  it('contentDataMap', async () => {
    const store = new DataStore()
    const wrapper = createVM(store, {
      contentDataMap: {
        items: 'result.items',
        total: 'result.total_count',
        success: 'is_success',
        unknow: 'result.unknow.prop'
      }
    })
    const $listview = wrapper.vm.$refs.listview
    $listview.search()
    await Vue.nextTick()
    expect($listview.contentData).toEqual({
      items: mockDataList,
      total: 40,
      success: true,
      unknow: undefined
    })
  })

  it('validateResponse', async () => {
    const result = {
      items: mockDataList,
      total_count: 40
    }
    const wrapper = createVM(null, {
      requestHandler() {
        return Promise.resolve({
          custom_is_success: 'done',
          result
        })
      },
      validateResponse: response => response.custom_is_success === 'done'
    })
    const $listview = wrapper.vm.$refs.listview
    $listview.search()
    await Vue.nextTick()
    expect($listview.contentData).toEqual({
      items: result.items,
      total: result.total_count
    })
  })

  it('resolveResponseErrorMessage', async () => {
    const wrapper = createVM(null, {
      requestHandler() {
        return Promise.resolve({
          custom_is_success: 'fail',
          error: {
            msg: {
              info: 'error info'
            }
          }
        })
      },
      validateResponse: response => response.custom_is_success === 'done',
      resolveResponseErrorMessage: response => {
        try {
          return response.error.msg.info
        } catch (e) {
          return '未知错误'
        }
      }
    })
    const $listview = wrapper.vm.$refs.listview
    $listview.search()
    await Vue.nextTick()
    expect($listview.internalContentMessage).toEqual({
      type: 'error',
      icon: 'el-icon-error',
      message: 'error info'
    })
  })

  it('transformResponseData', async () => {
    const store = new DataStore()
    const wrapper = createVM(store, {
      contentDataMap: {
        success: 'is_success',
        items: 'new_data.items',
        total: 'new_data.total',
        addon: 'new_data.addon'
      },
      transformResponseData: response => ({
        is_success: true,
        new_data: {
          items: response.result.items,
          total: response.result.total_count,
          addon: 'addon data'
        }
      })
    })
    const $listview = wrapper.vm.$refs.listview
    $listview.search()
    await Vue.nextTick()
    expect($listview.contentData).toEqual({
      success: true,
      items: mockDataList,
      total: 40,
      addon: 'addon data'
    })
  })
})
