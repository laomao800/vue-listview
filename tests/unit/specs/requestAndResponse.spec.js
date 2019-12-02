import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import { successWrap } from '../../mock-api/utils'
import Listview from '@/index'

const mockDataList = Array(10)
  .fill()
  .map((row, index) => ({ id: index, name: `row${index}` }))

function createWrapper(options = {}) {
  const requestSpy = jest.fn(() =>
    Promise.resolve(
      successWrap({
        items: mockDataList,
        total_count: 40
      })
    )
  )

  const wrapper = mount(Listview, {
    propsData: {
      requestHandler: requestSpy,
      ...options
    }
  })

  return { wrapper, requestSpy }
}

describe('Request params', () => {
  it('常规参数验证', () => {
    const { requestSpy } = createWrapper({
      filterModel: {
        static_text: 'abc',
        multipleSelect: [1, 2, 3]
      }
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('static_text', 'abc')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('multipleSelect', [
      1,
      2,
      3
    ])
  })

  it('transformRequestData', () => {
    const { requestSpy } = createWrapper({
      filterModel: {
        static_text: 'abc',
        multipleSelect: [1, 2, 3]
      },
      transformRequestData: requestData => {
        const multipleSelect = requestData.multipleSelect
        multipleSelect.push(4)
        return {
          addonNum: 1,
          addonStr: 'listview',
          staticText: requestData.static_text + 'd',
          multipleSelect
        }
      }
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('staticText', 'abcd')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('multipleSelect', [
      1,
      2,
      3,
      4
    ])
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('addonNum', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('addonStr', 'listview')
  })

  it('自定义参数 getter', () => {
    const { requestSpy } = createWrapper({
      filterModel: {
        multipleSelect: [1, 2, 3]
      },
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
    expect(requestSpy.mock.calls[0][0]).toHaveProperty(
      'multipleSelect',
      '1,2,3'
    )
  })
})

describe('分页参数', () => {
  it('默认分页参数', () => {
    const { wrapper, requestSpy } = createWrapper({
      pageSize: 2
    })
    expect(wrapper.find({ ref: 'pagination' }).exists()).toBe(true)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_index', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_size', 2)
  })

  it('不带分页参数', () => {
    const { wrapper, requestSpy } = createWrapper({
      usePage: false
    })
    expect(wrapper.find({ ref: 'pagination' }).exists()).toBe(false)
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_index')
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_size')
  })

  it('自定义分页参数', () => {
    const { requestSpy } = createWrapper({
      pageSize: 2,
      usePage: {
        pageIndex: 'customPageIndex',
        pageSize: 'customPageSize'
      }
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('customPageIndex', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('customPageSize', 2)
  })

  it('无效自定义分页参数', () => {
    const { requestSpy } = createWrapper({
      pageSize: 2,
      usePage: {
        errorPageIndex: 'errorPageIndex',
        errorPageSize: 'errorPageSize'
      }
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_index', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_size', 2)
  })

  it('切换 pageSize', () => {
    const { wrapper } = createWrapper({
      pageSize: 2
    })
    const $pagination = wrapper.find({ name: 'ElPagination' })
    $pagination.vm.$emit('size-change', 3)
    expect(wrapper.vm.currentPageSize).toBe(3)
  })

  it('search(true) 保持当前页码', () => {
    const { wrapper } = createWrapper({
      pageSize: 2
    })
    const $pagination = wrapper.find({ name: 'ElPagination' })
    $pagination.vm.$emit('current-change', 20)
    wrapper.vm.search(true)
    expect(wrapper.vm.currentPage).toBe(20)
    wrapper.vm.search()
    expect(wrapper.vm.currentPage).toBe(1)
  })
})

describe('Response', () => {
  it('contentDataMap', async () => {
    const { wrapper } = createWrapper({
      contentDataMap: {
        items: 'result.items',
        total: 'result.total_count',
        success: 'is_success',
        unknow: 'result.unknow.prop'
      }
    })
    await wait()
    expect(wrapper.vm.contentData).toEqual({
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
    const { wrapper } = createWrapper({
      requestHandler() {
        return Promise.resolve({
          custom_is_success: 'done',
          result
        })
      },
      validateResponse: response => response.custom_is_success === 'done'
    })
    await wait()
    expect(wrapper.vm.contentData).toEqual({
      items: result.items,
      total: result.total_count
    })
  })

  it('resolveResponseErrorMessage', async () => {
    const { wrapper } = createWrapper({
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
    await wait()
    expect(wrapper.vm.internalContentMessage).toEqual({
      type: 'error',
      icon: 'el-icon-error',
      message: 'error info'
    })
  })

  it('transformResponseData', async () => {
    const { wrapper } = createWrapper({
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
    await wait()
    expect(wrapper.vm.contentData).toEqual({
      success: true,
      items: mockDataList,
      total: 40,
      addon: 'addon data'
    })
  })
})
