import Vue from 'vue'
import { mount, Wrapper } from '@vue/test-utils'
import zipObject from 'lodash/zipObject'
import { removeElCascaderHtmlId } from '../helpers'
import Filterbar from '@/components/Filterbar.vue'

const DATE1 = new Date('2021/01/01 09:30:00')
const DATE2 = new Date('2021/06/01 09:30:00')
const ALL_TEST_FIELDS = [
  {
    fieldType: 'text',
    fieldValue: 'test text',
    fieldConfig: { type: 'text', model: 'name', label: 'text' },
  },
  {
    fieldType: 'number',
    fieldValue: 9527,
    fieldConfig: { type: 'number', label: 'number', model: 'number' },
  },
  {
    fieldType: 'date',
    fieldValue: DATE1,
    fieldConfig: { type: 'date', model: 'date', label: 'date' },
  },
  {
    fieldType: 'dateRange',
    fieldValue: [DATE1, DATE2],
    fieldConfig: { type: 'dateRange', model: 'dateRange', label: 'dateRange' },
  },
  {
    fieldType: 'timeSelect',
    fieldValue: '10:00',
    fieldConfig: {
      type: 'timeSelect',
      model: 'timeSelect',
      label: 'timeSelect',
    },
  },
  {
    fieldType: 'timePicker',
    fieldValue: DATE1,
    fieldConfig: {
      type: 'timePicker',
      model: 'timePicker',
      label: 'timePicker',
    },
  },
  {
    fieldType: 'timePickerRange',
    fieldValue: [DATE1, DATE2],
    fieldConfig: {
      type: 'timePickerRange',
      model: 'timePickerRange',
      label: 'timePickerRange',
    },
  },
  {
    fieldType: 'dateTime',
    fieldValue: DATE1,
    fieldConfig: { type: 'dateTime', model: 'dateTime', label: 'dateTime' },
  },
  {
    fieldType: 'dateTimeRange',
    fieldValue: [DATE1, DATE2],
    fieldConfig: {
      type: 'dateTimeRange',
      model: 'dateTimeRange',
      label: 'dateTimeRange',
    },
  },
  {
    fieldType: 'select',
    fieldValue: 'option1',
    fieldConfig: {
      type: 'select',
      model: 'select',
      label: 'select',
      options: [
        { label: 'option1', value: 'option1' },
        { label: 'option2', value: 'option2' },
      ],
    },
  },
  {
    fieldType: 'multipleSelect',
    fieldValue: ['option1', 'option2'],
    fieldConfig: {
      type: 'multipleSelect',
      model: 'multipleSelect',
      label: 'multipleSelect',
      options: [
        { label: 'option1', value: 'option1' },
        { label: 'option2', value: 'option2' },
      ],
    },
  },
  {
    fieldType: 'cascader',
    fieldValue: [1, 2, 3, 4],
    fieldConfig: {
      type: 'cascader',
      model: 'cascader',
      label: 'cascader',
      options: [
        {
          value: '1',
          label: 'menu1',
          children: [
            {
              value: '2',
              label: 'menu2',
              children: [
                {
                  value: '3',
                  label: 'menu3',
                  children: [{ value: '4', label: 'menu4' }],
                },
              ],
            },
          ],
        },
      ],
    },
  },
]

describe('Filter buttons', () => {
  it('all', async () => {
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
    expect(wrapper.html()).toMatchSnapshot()
    expect(buttons.length).toBe(filterButtons.length)
  })
})

describe('Filter fields render', () => {
  it('Field label render', () => {
    const wrapper = mount(Filterbar, {
      propsData: { filterFields: [{ type: 'label', label: 'label text' }] },
    })
    expect(wrapper.find('div.el-form-item__label').element.innerHTML).toBe(
      'label text'
    )
  })

  ALL_TEST_FIELDS.forEach(({ fieldType, fieldConfig }) => {
    it(`Field ${fieldType} render`, () => {
      const wrapper = mount(Filterbar, {
        provide: { lvStore: { filterModel: {} } },
        propsData: { filterFields: [fieldConfig] },
      })
      expect(removeElCascaderHtmlId(wrapper.html())).toMatchSnapshot()
    })
  })
})

describe('Filter fields set value', () => {
  let lvStore: any
  beforeEach(() => {
    lvStore = { filterModel: {} }
  })

  ALL_TEST_FIELDS.forEach(({ fieldType, fieldValue, fieldConfig }) => {
    it(`Field ${fieldType} set value`, () => {
      const wrapper = mount(Filterbar, {
        provide: { lvStore },
        propsData: { filterFields: [fieldConfig] },
      })
      const fieldVm = wrapper
        .findComponent({ name: 'FilterbarField' })
        .findComponent({ name: 'ElFormItem' }).vm.$children[1]
      // @ts-ignore
      fieldVm.value = fieldValue
      expect(lvStore.filterModel[fieldConfig.model]).toBe(fieldValue)
    })
  })
})

describe('Filter fields default value', () => {
  const lvStore = {
    filterModel: zipObject(
      ALL_TEST_FIELDS.map((r) => r.fieldType),
      ALL_TEST_FIELDS.map((r) => r.fieldValue)
    ),
  }
  const wrapper = mount(Filterbar, {
    provide: { lvStore },
    propsData: {
      filterFields: Object.values(ALL_TEST_FIELDS).map((r) => r.fieldConfig),
    },
  })
  wrapper
    .findAllComponents({ name: 'FilterbarField' })
    .wrappers.forEach((w: any) => {
      const modelKey = w.vm.field.model
      const inputVm = w.findComponent({ name: 'ElFormItem' }).vm.$children[1]
      it(modelKey, () => {
        expect(inputVm.value).toBe(lvStore.filterModel[modelKey])
      })
    })
})
