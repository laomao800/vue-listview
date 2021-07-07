import Vue from 'vue'
import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import Filterbar from '@/components/Filterbar.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const h = new Vue().$createElement
const DATE1 = new Date('2021/01/01 09:30:00')
const DATE2 = new Date('2021/06/01 09:30:00')

describe('Filter buttons', () => {
  it('normal', async () => {
    const filterButtons: any = [
      { text: 'default' },
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
    expect(wrapper.html()).toMatchSnapshot()
    expect(buttons.length).toBe(filterButtons.length)
  })

  it('dropdown', () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterButtons: [
          {
            type: 'primary',
            text: '下拉按钮',
            children: [
              { icon: 'el-icon-circle-plus-outline', text: '菜单1' },
              { icon: 'el-icon-remove-outline', text: '菜单2' },
            ],
          },
        ],
      },
    })
    const buttons = wrapper
      .findComponent({ name: 'FilterbarButtons' })
      .findAllComponents({ name: 'ElButton' })
    const dropdownItem = wrapper.findAllComponents({
      name: 'ElDropdownItem',
    })
    expect(buttons.length).toBe(1)
    expect(dropdownItem.length).toBe(2)
  })

  it('click', () => {
    const mockFn1 = jest.fn()
    const mockFn2 = jest.fn()
    const mockFn3 = jest.fn()
    const filterButtons = [
      { text: 'btn', click: mockFn1 },
      {
        text: 'btn',
        children: [
          { text: '菜单1', click: mockFn2 },
          { text: '菜单2', click: mockFn3 },
        ],
      },
    ]
    const wrapper = mount(Filterbar, { propsData: { filterButtons } })
    const button = wrapper
      .findComponent({ name: 'FilterbarButtons' })
      .findComponent({ name: 'ElButton' })
    const childrenButtons = wrapper
      .findComponent({ name: 'FilterbarButtons' })
      .findAllComponents({ name: 'ElDropdownItem' }).wrappers
    button.trigger('click')
    childrenButtons[0].trigger('click')
    childrenButtons[1].trigger('click')
    expect(mockFn1.call.length).toBe(1)
    expect(mockFn2.call.length).toBe(1)
    expect(mockFn3.call.length).toBe(1)
  })

  it('other render type', () => {
    const filterButtons = [
      () => <div class="function-type">text</div>,
      <div class="jsx-type">text</div>,
    ]
    const wrapper = mount(Filterbar, { propsData: { filterButtons } })
    expect(wrapper.find('div.function-type').exists()).toBe(true)
    expect(wrapper.find('div.jsx-type').exists()).toBe(true)
  })
})

describe('Filter fields', () => {
  it('Field label render', () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        searchButton: false,
        resetButton: false,
        filterFields: [{ type: 'label', label: 'label text' }],
      },
    })
    expect(wrapper.find('div.el-form-item__label').element.innerHTML).toBe(
      'label text'
    )
  })

  it('Fields render', () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          { type: 'text', model: 'text' },
          { type: 'number', model: 'number' },
          { type: 'date', model: 'date' },
          { type: 'dateRange', model: 'dateRange' },
          { type: 'timeSelect', model: 'timeSelect' },
          { type: 'timePicker', model: 'timePicker' },
          { type: 'timePickerRange', model: 'timePickerRange' },
          { type: 'dateTime', model: 'dateTime' },
          { type: 'dateTimeRange', model: 'dateTimeRange' },
          { type: 'select', model: 'select' },
          { type: 'cascader', model: 'cascader' },
        ],
      },
    })
    expect(wrapper.findAllComponents({ name: 'FieldText' }).length).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldNumber' }).length).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldDate' }).length).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldDateRange' }).length).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldTimeSelect' }).length).toBe(
      1
    )
    expect(wrapper.findAllComponents({ name: 'FieldTimePicker' }).length).toBe(
      1
    )
    expect(
      wrapper.findAllComponents({ name: 'FieldTimePickerRange' }).length
    ).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldDateTime' }).length).toBe(1)
    expect(
      wrapper.findAllComponents({ name: 'FieldDateTimeRange' }).length
    ).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldSelect' }).length).toBe(1)
    expect(wrapper.findAllComponents({ name: 'FieldCascader' }).length).toBe(1)
  })

  it('Group fields render', () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          [
            { type: 'text', model: 'text' },
            { type: 'number', model: 'number' },
          ],
        ],
      },
    })
    expect(wrapper.find('.lv__field-group').exists()).toBe(true)
  })

  it('Filter fields set value', () => {
    const lvStore: any = { filterModel: {} }
    const wrapper = mount(Filterbar, {
      provide: { lvStore },
      propsData: {
        filterFields: [
          { type: 'text', model: 'text' },
          { type: 'number', model: 'number' },
          { type: 'date', model: 'date' },
          { type: 'dateRange', model: 'dateRange' },
          { type: 'timeSelect', model: 'timeSelect' },
          { type: 'timePicker', model: 'timePicker' },
          { type: 'timePickerRange', model: 'timePickerRange' },
          { type: 'dateTime', model: 'dateTime' },
          { type: 'dateTimeRange', model: 'dateTimeRange' },
          { type: 'select', model: 'select' },
          { type: 'cascader', model: 'cascader' },
        ],
      },
    })
    const _findVm = (name: string): any => wrapper.findComponent({ name }).vm
    _findVm('FieldText').value = 'text'
    _findVm('FieldNumber').value = 9527
    _findVm('FieldDate').value = DATE1
    _findVm('FieldDateRange').value = [DATE1, DATE2]
    _findVm('FieldTimeSelect').value = '10:00'
    _findVm('FieldTimePicker').value = DATE1
    _findVm('FieldTimePickerRange').value = [DATE1, DATE2]
    _findVm('FieldDateTime').value = DATE1
    _findVm('FieldDateTimeRange').value = [DATE1, DATE2]
    _findVm('FieldSelect').value = 'option1'
    _findVm('FieldCascader').value = [1, 2, 3, 4]
    expect(lvStore.filterModel).toStrictEqual({
      text: 'text',
      number: 9527,
      date: DATE1,
      dateRange: [DATE1, DATE2],
      timeSelect: '10:00',
      timePicker: DATE1,
      timePickerRange: [DATE1, DATE2],
      dateTime: DATE1,
      dateTimeRange: [DATE1, DATE2],
      select: 'option1',
      cascader: [1, 2, 3, 4],
    })
  })

  it('other render type', () => {
    const filterFields = [
      {
        label: 'label',
        model: 'text',
        render: () => <input class="object-type" />,
      },
      () => <input class="function-type" />,
      <input class="vnode-type" />,
    ]
    const wrapper = mount(Filterbar, { propsData: { filterFields } })
    expect(wrapper.find('.lv__field input.object-type').exists()).toBe(true)
    expect(wrapper.find('.lv__field input.function-type').exists()).toBe(true)
    expect(wrapper.find('.lv__field input.vnode-type').exists()).toBe(true)
  })
})

describe('Filter fields default value', () => {
  const lvStore = {
    filterModel: {
      text: 'text',
      number: 9527,
      date: DATE1,
      dateRange: [DATE1, DATE2],
      timeSelect: '10:00',
      timePicker: DATE1,
      timePickerRange: [DATE1, DATE2],
      dateTime: DATE1,
      dateTimeRange: [DATE1, DATE2],
      select: 'option1',
      cascader: [1, 2, 3, 4],
    },
  }
  const wrapper = mount(Filterbar, {
    provide: { lvStore },
    propsData: {
      filterFields: [
        { type: 'text', model: 'text' },
        { type: 'number', model: 'number' },
        { type: 'date', model: 'date' },
        { type: 'dateRange', model: 'dateRange' },
        { type: 'timeSelect', model: 'timeSelect' },
        { type: 'timePicker', model: 'timePicker' },
        { type: 'timePickerRange', model: 'timePickerRange' },
        { type: 'dateTime', model: 'dateTime' },
        { type: 'dateTimeRange', model: 'dateTimeRange' },
        { type: 'select', model: 'select' },
        { type: 'cascader', model: 'cascader' },
      ],
    },
  })
  const _findVm = (name: string): any => wrapper.findComponent({ name }).vm
  expect(_findVm('FieldText').value).toBe('text')
  expect(_findVm('FieldNumber').value).toBe(9527)
  expect(_findVm('FieldDate').value).toBe(DATE1)
  expect(_findVm('FieldDateRange').value).toEqual([DATE1, DATE2])
  expect(_findVm('FieldTimeSelect').value).toBe('10:00')
  expect(_findVm('FieldTimePicker').value).toBe(DATE1)
  expect(_findVm('FieldTimePickerRange').value).toEqual([DATE1, DATE2])
  expect(_findVm('FieldDateTime').value).toBe(DATE1)
  expect(_findVm('FieldDateTimeRange').value).toEqual([DATE1, DATE2])
  expect(_findVm('FieldSelect').value).toBe('option1')
  expect(_findVm('FieldCascader').value).toEqual([1, 2, 3, 4])
})

describe('Filter fields options resolve', () => {
  const options = [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
  ]

  it('array', async () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          { type: 'select', model: 'select', options },
          { type: 'cascader', model: 'cascader', options },
        ],
      },
    })
    await wait()
    expect(wrapper.findAllComponents({ name: 'ElOption' }).length).toBe(
      options.length
    )
    expect(
      wrapper.findComponent({ name: 'ElCascader' }).vm.$props.options
    ).toEqual(options)
  })

  it('promise', async () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          {
            type: 'select',
            model: 'select',
            options: Promise.resolve(options),
          },
          {
            type: 'cascader',
            model: 'cascader',
            options: Promise.resolve(options),
          },
        ],
      },
    })
    await wait()
    expect(wrapper.findAllComponents({ name: 'ElOption' }).length).toBe(
      options.length
    )
    expect(
      wrapper.findComponent({ name: 'ElCascader' }).vm.$props.options
    ).toEqual(options)
  })

  it('function return array', async () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          { type: 'select', model: 'select', options: () => options },
          { type: 'cascader', model: 'cascader', options: () => options },
        ],
      },
    })
    await wait()
    expect(wrapper.findAllComponents({ name: 'ElOption' }).length).toBe(
      options.length
    )
    expect(
      wrapper.findComponent({ name: 'ElCascader' }).vm.$props.options
    ).toEqual(options)
  })

  it('function return promise', async () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [
          {
            type: 'select',
            model: 'select',
            options: () => Promise.resolve(options),
          },
          {
            type: 'cascader',
            model: 'cascader',
            options: () => Promise.resolve(options),
          },
        ],
      },
    })
    await wait()
    expect(wrapper.findAllComponents({ name: 'ElOption' }).length).toBe(
      options.length
    )
    expect(
      wrapper.findComponent({ name: 'ElCascader' }).vm.$props.options
    ).toEqual(options)
  })

  it('invalid options', async () => {
    const wrapper = mount(Filterbar, {
      propsData: {
        filterFields: [{ type: 'select', model: 'select', options: 'options' }],
      },
    })
    await wait()
    expect(wrapper.findAllComponents({ name: 'ElOption' }).length).toBe(0)
  })
})
