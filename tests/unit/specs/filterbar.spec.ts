import { mount } from '@vue/test-utils'
import { createListviewWrapper, wait } from '../helpers'
import Filterbar from '@/components/Filterbar.vue'

describe('Filterbar', () => {
  const mockFn = jest.fn()
  const filterButtons: any = [
    { text: 'default', click: mockFn },
    { type: 'text', text: 'text' },
    { type: 'primary', icon: 'el-icon-edit', text: 'primary' },
    { type: 'success', icon: 'el-icon-check', text: 'success' },
    { type: 'info', icon: 'el-icon-message', text: 'info' },
    { type: 'warning', icon: 'el-icon-star-off', text: 'warning' },
    { type: 'danger', icon: 'el-icon-delete', text: 'danger' },
  ]
  const wrapper = mount(Filterbar, { propsData: { filterButtons } })
  const buttons = wrapper
    .findComponent({ name: 'FilterbarButtons' })
    .findAllComponents({ name: 'ElButton' })

  it('Filter buttons', async () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(buttons.length).toBe(filterButtons.length)
  })
})
