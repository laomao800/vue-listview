import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import Listview from '@/index'

describe('Methods', () => {
  const wrapper = mount({
    template: `
      <Listview
        ref="listview"
        :use-page="false"
        @filter-submit="$emit('filter-submit')"
        @filter-reset="$emit('filter-reset')"
      />
    `,
    components: { Listview },
  })
  const filterBtns = wrapper
    .findComponent({ name: 'FilterBar' })
    .findComponent({ name: 'ElFormItem' })
    .findAllComponents({ name: 'ElButton' })
  const searchBtn = filterBtns.at(0)
  const resetBtn = filterBtns.at(1)

  it('filter-submit', () => {
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit')).toBeTruthy()
    expect(wrapper.emitted('filter-submit').length).toBe(1)
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit').length).toBe(2)
  })

  it('filter-reset', async () => {
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset')).toBeTruthy()
    expect(wrapper.emitted('filter-reset').length).toBe(1)
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset').length).toBe(2)
  })

  it('before-request & requested', async () => {
    const wrapper = mount(Listview, {
      propsData: {
        autoload: false,
        requestHandler: () => ({}),
      },
    })
    wrapper.vm.search()
    await wait()
    expect(wrapper.emitted('before-request')).toBeTruthy()
    expect(wrapper.emitted('before-request').length).toBe(1)
    expect(wrapper.emitted('requested')).toBeTruthy()
    expect(wrapper.emitted('requested').length).toBe(1)
  })
})
