import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import Listview from '@/index'

describe('Methods', () => {
  it('resetFilter()', async () => {
    const wrapper = mount(Listview, {
      propsData: {
        filterModel: {
          text: '123',
          multiple: [1, 2, 3],
        },
        filterFields: [
          { type: 'text', model: 'text' },
          { type: 'multiple', model: 'multiple' },
        ],
      },
    })
    const vm = wrapper.vm as any
    const store = wrapper.findComponent({ ref: 'storeProvider' })
    vm.resetFilter()
    await wait()
    expect(store.vm.$props.filterModel).toEqual({
      text: undefined,
      multiple: [],
    })
  })

  it('setContentMessage("text")', async () => {
    const wrapper = mount(Listview)
    const vm = wrapper.vm as any
    vm.setContentMessage('text')
    await wait()
    expect(wrapper.find('.lv__message').html()).toMatchSnapshot()
  })

  it('setContentMessage("text", "error")', async () => {
    const wrapper = mount(Listview)
    const vm = wrapper.vm as any
    vm.setContentMessage('text', 'error')
    await wait()
    expect(wrapper.find('.lv__message').html()).toMatchSnapshot()
  })

  it('setContentMessage("text", "error", true)', async () => {
    const wrapper = await mount(Listview, {
      propsData: {
        requestHandler: () => ({
          result: { items: [{}], total: 1 },
          is_success: true,
        }),
      },
    })
    const vm = wrapper.vm as any
    vm.setContentMessage('text')
    await wait()
    expect(wrapper.find('.lv__message').exists()).toBeFalsy()
    vm.setContentMessage('text', null, true)
    await wait()
    expect(wrapper.find('.lv__message').html()).toMatchSnapshot()
  })
})
