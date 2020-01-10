import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import { createRequestSpyWrapper, mockDataList } from '../helpers'

describe('Request params', () => {
  it('常规参数验证', () => {
    const { requestSpy } = createRequestSpyWrapper({
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
    const { requestSpy } = createRequestSpyWrapper({
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
    const { requestSpy } = createRequestSpyWrapper({
      filterModel: {
        multipleSelect: [1, 2, 3],
        text1: 'text1',
        text2: 'text2'
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
        },
        [
          { type: 'text', model: 'text1', get: val => val + '-addon' },
          { type: 'text', model: 'text2', get: val => val + '-addon' }
        ]
      ]
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty(
      'multipleSelect',
      '1,2,3'
    )
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text1', 'text1-addon')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text2', 'text2-addon')
  })

  it('text 字段默认开启 trim', () => {
    const testString = '  text string  '
    const { wrapper, requestSpy } = createRequestSpyWrapper({
      filterModel: {
        text1: testString,
        text2: testString
      },
      filterFields: [
        { type: 'text', model: 'text1' },
        { type: 'text', model: 'text2', trim: false }
      ]
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text1', testString)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text2', testString)

    wrapper
      .find({ ref: 'filterbar' })
      .find({ ref: 'filterForm' })
      .findAll({ name: 'ElInput' })
      .wrappers.forEach(inputWrapper => {
        inputWrapper.vm.$emit('blur')
      })
    wrapper.vm.search()

    expect(requestSpy.mock.calls[1][0]).toHaveProperty(
      'text1',
      testString.trim()
    )
    expect(requestSpy.mock.calls[1][0]).toHaveProperty('text2', testString)
  })
})

describe('分页参数', () => {
  it('默认分页参数', () => {
    const { wrapper, requestSpy } = createRequestSpyWrapper({
      pageSize: 2
    })
    expect(wrapper.find({ ref: 'pagination' }).exists()).toBe(true)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_index', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_size', 2)
  })

  it('不带分页参数', () => {
    const { wrapper, requestSpy } = createRequestSpyWrapper({
      usePage: false
    })
    expect(wrapper.find({ ref: 'pagination' }).exists()).toBe(false)
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_index')
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_size')
  })

  it('自定义分页参数', () => {
    const { requestSpy } = createRequestSpyWrapper({
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
    const { requestSpy } = createRequestSpyWrapper({
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
    const { wrapper } = createRequestSpyWrapper({
      pageSize: 2
    })
    const $pagination = wrapper.find({ name: 'ElPagination' })
    $pagination.vm.$emit('size-change', 3)
    expect(wrapper.vm.currentPageSize).toBe(3)
  })

  it('search(true) 保持当前页码', () => {
    const { wrapper } = createRequestSpyWrapper({
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
    const { wrapper } = createRequestSpyWrapper({
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
    const { wrapper } = createRequestSpyWrapper({
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
    const { wrapper } = createRequestSpyWrapper({
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
    const { wrapper } = createRequestSpyWrapper({
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
