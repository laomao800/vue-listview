/* eslint-disable @typescript-eslint/no-var-requires */
import { mount } from '@vue/test-utils'
import { ListviewProps } from '~/types'

export async function createListviewWrapper(
  propsData: Partial<ListviewProps> = {}
) {
  const Listview = require('@/index').default
  const { successWrap } = require('../mock-api/utils')

  const requestSpy = jest.fn<Promise<any>, any[]>(() =>
    Promise.resolve(
      successWrap({
        items: mockDataList,
        total_count: 40,
      })
    )
  )

  const wrapper = mount(Listview, {
    propsData: {
      requestHandler: requestSpy,
      ...propsData,
    },
  })
  const vm = wrapper.vm as any
  const storeVm = wrapper.findComponent({ name: 'StoreProvider' }).vm as any

  await wait()
  return { requestSpy, wrapper, vm, storeVm }
}

export const wait = (time = 100) =>
  new Promise((resolve) => setTimeout(resolve, time))

export const mockDataList = Array(10)
  .fill(undefined)
  .map((row, index) => ({ id: index, name: `row${index}` }))

export function removeElCascaderHtmlId(html: string) {
  return html.replace(/id="cascader-menu-\d+-\d+"/, '')
}
