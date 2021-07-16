import { createListviewWrapper } from '../helpers'

describe('Events', () => {
  it('filter-submit', async () => {
    const { wrapper } = await createListviewWrapper()
    const filterBtns = wrapper
      .findComponent({ name: 'Filterbar' })
      .findAllComponents({ name: 'ElButton' })
    const searchBtn = filterBtns.at(0)
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit')!.length).toBe(1)
    searchBtn.trigger('click')
    expect(wrapper.emitted('filter-submit')!.length).toBe(2)
  })

  it('filter-reset', async () => {
    const { wrapper } = await createListviewWrapper()
    const filterBtns = wrapper
      .findComponent({ name: 'Filterbar' })
      .findAllComponents({ name: 'ElButton' })
    const resetBtn = filterBtns.at(1)
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset')!.length).toBe(1)
    resetBtn.trigger('click')
    expect(wrapper.emitted('filter-reset')!.length).toBe(2)
  })

  it('before-request & request-start & request-success & requested', async () => {
    const { wrapper } = await createListviewWrapper({
      autoload: false,
      requestHandler: () => ({}),
    })
    await (wrapper.vm as any).search()
    expect(wrapper.emitted('before-request')!.length).toBe(1)
    expect(wrapper.emitted('request-success')!.length).toBe(1)
    await (wrapper.vm as any).search()
    expect(wrapper.emitted('before-request')!.length).toBe(2)
    expect(wrapper.emitted('request-success')!.length).toBe(2)
    expect(wrapper.emitted('requested')!.length).toBe(2)
  })

  it('request-error', async () => {
    const { wrapper } = await createListviewWrapper({
      autoload: false,
      requestHandler: () => ({}),
      validateResponse: () => false,
    })
    await (wrapper.vm as any).search()
    expect(wrapper.emitted('before-request')!.length).toBe(1)
    expect(wrapper.emitted('request-error')!.length).toBe(1)
  })
})
