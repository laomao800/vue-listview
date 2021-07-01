import { mount } from '@vue/test-utils'
import Listview from '@/index'

describe('Events', () => {
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
    .findComponent({ name: 'Filterbar' })
    .findComponent({ name: 'ElFormItem' })
    .findAllComponents({ name: 'ElButton' })
  const searchBtn = filterBtns.at(0)
  const resetBtn = filterBtns.at(1)

  it('filter-submit', () => {
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit')!.length).toBe(1)
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit')!.length).toBe(2)
  })

  it('filter-reset', () => {
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset')!.length).toBe(1)
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset')!.length).toBe(2)
  })

  it('before-request & request-start & request-success', async () => {
    const wrapper = mount(Listview, {
      propsData: {
        autoload: false,
        requestHandler: () => ({}),
      },
    })
    // this.$rootEmitProxy('request-error', 'invalid')
    // this.$rootEmitProxy('request-error', error)
    await (wrapper.vm as any).search()
    expect(wrapper.emitted('before-request')!.length).toBe(1)
    expect(wrapper.emitted('request-start')!.length).toBe(1)
    expect(wrapper.emitted('request-success')!.length).toBe(1)
    await (wrapper.vm as any).search()
    expect(wrapper.emitted('before-request')!.length).toBe(2)
    expect(wrapper.emitted('request-start')!.length).toBe(2)
    expect(wrapper.emitted('request-success')!.length).toBe(2)
  })
})
