import pick from 'lodash/pick'
import ListviewOrigin, { create as createListview } from '@/index'

import { createListviewWrapper } from '../helpers'

const globalConfig = {
  validateResponse: () => false,
  resolveResponseErrorMessage: () => 'config error from global',
  transformRequestData(data: Record<string, any>) {
    data.addon = 'requestAddon from global'
    return data
  },
  transformResponseData(response: Record<string, any>) {
    response.addon = 'responseAddon from global'
    return response
  },
  contentDataMap: {
    addon: 'addon',
    items: 'result.items',
    total: 'result.total_count',
  },
  usePage: { pageIndex: 'global_page_index', pageSize: 'global_page_size' },
}

const { component: ListviewNormal } = createListview()
const { component: ListviewCustom } = createListview(globalConfig)

describe('Create config', () => {
  it('Create normal listview', async () => {
    const { vm: vmOrigin } = await createListviewWrapper({}, ListviewOrigin)
    const { vm: vmNormal } = await createListviewWrapper({}, ListviewNormal)
    const { vm: vmCustom } = await createListviewWrapper({}, ListviewCustom)
    expect(vmNormal.presetProps__).toEqual(vmOrigin.presetProps__)
    expect(vmCustom.presetProps__).not.toEqual(vmOrigin.presetProps__)
  })

  it('Use global config', async () => {
    const { vm, requestSpy } = await createListviewWrapper({}, ListviewCustom)
    expect(pick(vm.mergedAttrs, Object.keys(globalConfig))).toEqual(
      globalConfig
    )
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('global_page_index')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('global_page_size')
  })

  it('Props will override global config', async () => {
    const propsData = {
      validateResponse: () => true,
      resolveResponseErrorMessage: () => 'config error from prop',
      transformRequestData(data: Record<string, any>) {
        data.addon = 'requestAddon from prop'
        return data
      },
      transformResponseData(response: Record<string, any>) {
        response.addon = 'responseAddon from prop'
        return response
      },
      contentDataMap: {
        addon: 'prop.addon',
        items: 'prop.result.items',
        total: 'prop.result.total_count',
      },
      usePage: {
        pageIndex: 'prop_page_index',
        pageSize: 'prop_page_size',
      },
    }
    const { vm, requestSpy } = await createListviewWrapper(
      propsData,
      ListviewCustom
    )
    expect(pick(vm.mergedAttrs, Object.keys(propsData))).toEqual(propsData)
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('prop_page_index')
    expect(requestSpy.mock.calls[0][0]).toHaveProperty('prop_page_size')
  })
})

// describe('Replace component', () => {})
