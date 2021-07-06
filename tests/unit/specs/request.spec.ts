import { createListviewWrapper, mockDataList } from '../helpers'

describe('Request params', () => {
  it('常规参数验证', async () => {
    const { requestSpy } = await createListviewWrapper({
      filterModel: {
        static_text: 'abc',
        multipleSelect: [1, 2, 3],
      },
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('static_text', 'abc')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty(
      'multipleSelect',
      [1, 2, 3]
    )
  })

  it('transformRequestData', async () => {
    const { requestSpy } = await createListviewWrapper({
      filterModel: {
        static_text: 'abc',
        multipleSelect: [1, 2, 3],
      },
      transformRequestData: (requestData) => {
        const multipleSelect = requestData.multipleSelect
        multipleSelect.push(4)
        return {
          addonNum: 1,
          addonStr: 'listview',
          staticText: requestData.static_text + 'd',
          multipleSelect,
        }
      },
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('staticText', 'abcd')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty(
      'multipleSelect',
      [1, 2, 3, 4]
    )
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('addonNum', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('addonStr', 'listview')
  })

  it('text 字段默认开启 trim', async () => {
    const testString = '  text string  '
    const { wrapper, requestSpy } = await createListviewWrapper({
      filterModel: { text1: testString, text2: testString },
      filterFields: [
        { type: 'text', model: 'text1' },
        { type: 'text', model: 'text2', trim: false },
      ],
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text1', testString)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('text2', testString)

    wrapper
      .findAllComponents({ name: 'ElInput' })
      .wrappers.forEach((w) => w.vm.$emit('blur'))
    const vm = wrapper.vm as any
    await vm.search()

    expect(requestSpy.mock.calls[1][0]).toHaveProperty(
      'text1',
      testString.trim()
    )
    expect(requestSpy.mock.calls[1][0]).toHaveProperty('text2', testString)
  })
})

describe('分页参数', () => {
  it('默认分页参数', async () => {
    const { requestSpy } = await createListviewWrapper({
      pageSize: 2,
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_index', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_size', 2)
  })

  it('不带分页参数', async () => {
    const { requestSpy } = await createListviewWrapper({
      usePage: false,
    })
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_index')
    expect(requestSpy.mock.calls[0][0]).not.toHaveProperty('page_size')
  })

  it('自定义分页参数', async () => {
    const { requestSpy } = await createListviewWrapper({
      pageSize: 2,
      usePage: {
        pageIndex: 'customPageIndex',
        pageSize: 'customPageSize',
      },
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('customPageIndex', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('customPageSize', 2)
  })

  it('无效自定义分页参数', async () => {
    const { requestSpy } = await createListviewWrapper({
      pageSize: 2,
      usePage: {
        // @ts-ignore
        errorPageIndex: 'errorPageIndex',
        // @ts-ignore
        errorPageSize: 'errorPageSize',
      },
    })
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_index', 1)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('page_size', 2)
  })

  it('切换 pageSize', async () => {
    const { wrapper } = await createListviewWrapper({
      pageSize: 2,
    })
    const $pagination = wrapper.findComponent({ name: 'ElPagination' })
    $pagination.vm.$emit('size-change', 3)
    const store = wrapper.findComponent({ name: 'StoreProvider' })
    expect(store.vm.$data.currentPageSize).toBe(3)
  })

  it('search(true) 保持当前页码', async () => {
    const { wrapper, vm, storeVm } = await createListviewWrapper({
      pageSize: 2,
    })

    const newCurPage = 18
    wrapper
      .findComponent({ name: 'ElPagination' })
      .vm.$emit('current-change', newCurPage)
    await vm.search(true)
    expect(storeVm.currentPage).toBe(newCurPage)
    await vm.search()
    expect(storeVm.currentPage).toBe(1)
  })
})

describe('Response', () => {
  it('contentDataMap', async () => {
    const { storeVm } = await createListviewWrapper({
      contentDataMap: {
        custom_items: 'result.items',
        custom_total: 'result.total_count',
        custom_success: 'success',
        custom_unknow: 'result.unknow.prop',
      },
    })
    expect(storeVm.contentData).toEqual({
      custom_items: mockDataList,
      custom_total: 40,
      custom_success: true,
      custom_unknow: undefined,
    })
  })

  it('validateResponse', async () => {
    const result = {
      items: mockDataList,
      total: 40,
    }
    const { storeVm } = await createListviewWrapper({
      requestHandler: () =>
        Promise.resolve({
          custom_is_success: 'done',
          result,
        }),
      validateResponse: (response) => response.custom_is_success === 'done',
    })
    expect(storeVm.contentData).toEqual(result)
  })

  it('resolveResponseErrorMessage', async () => {
    const { storeVm } = await createListviewWrapper({
      requestHandler: () =>
        Promise.resolve({
          custom_is_success: 'fail',
          error: { msg: { info: 'error info' } },
        }),
      validateResponse: (response) => response.custom_is_success === 'done',
      resolveResponseErrorMessage: (response) => {
        try {
          return response.error.msg.info
        } catch (e) {
          return '未知错误'
        }
      },
    })
    expect(storeVm.internalContentMessage).toEqual({
      type: 'error',
      text: 'error info',
    })
  })

  it('transformResponseData', async () => {
    const { storeVm } = await createListviewWrapper({
      contentDataMap: {
        success: 'is_success',
        items: 'new_data.items',
        total: 'new_data.total',
        addon: 'new_data.addon',
      },
      transformResponseData: (response) => ({
        is_success: true,
        new_data: {
          items: response.result.items,
          total: response.result.total_count,
          addon: 'addon data',
        },
      }),
    })
    expect(storeVm.contentData).toEqual({
      success: true,
      items: mockDataList,
      total: 40,
      addon: 'addon data',
    })
  })
})
