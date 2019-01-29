import { mount } from '@vue/test-utils'
import Filterbar from '@/listview/components/filterbar'
import {
  filterButtonsNormal,
  filterButtonsDropdown,
  filterFields
} from './props.js'

describe('filterbar - filterButtons', () => {
  it('普通按钮渲染', () => {
    const filterButtons = filterButtonsNormal
    const wrapper = mount(Filterbar, {
      propsData: { filterButtons }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.filterbar__buttons .el-button')).toHaveLength(
      filterButtons.length
    )
  })

  it('带下拉按钮渲染', () => {
    const filterButtons = filterButtonsDropdown
    const wrapper = mount(Filterbar, {
      propsData: { filterButtons }
    })
    // el-dropdown 会生成随机 id ，先删除后再测试 snapshots
    const randomAttrReg = /aria-controls="dropdown-menu-\d+"|id="dropdown-menu-\d+"/g
    let wrapperHtml = wrapper.html()
    wrapperHtml = wrapperHtml.replace(randomAttrReg, '')
    expect(wrapperHtml).toMatchSnapshot()
    expect(wrapper.findAll('.filterbar__buttons .el-dropdown')).toHaveLength(
      filterButtons.length
    )
  })

  it('JSX', function() {
    const jsxWrapper = {
      components: { Filterbar },
      render(h) {
        return (
          <filterbar
            filterButtons={[<button>button</button>, <strong>strong</strong>]}
          />
        )
      }
    }
    const wrapper = mount(jsxWrapper)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('按钮点击事件', () => {
    const spy = jest.fn()
    const wrapper = mount(Filterbar, {
      propsData: {
        filterButtons: [
          {
            text: 'default',
            click() {
              spy('default')
            }
          },
          {
            text: 'dropdown1',
            click() {
              spy('dropdown1')
            },
            children: [
              {
                text: 'sub1',
                click() {
                  spy('sub1')
                }
              }
            ]
          },
          {
            text: 'dropdown2',
            click() {
              spy('dropdown2')
            },
            splitButton: true,
            children: [
              {
                text: 'sub2',
                click() {
                  spy('sub2')
                }
              }
            ]
          }
        ]
      }
    })
    wrapper.find('.filterbar__buttons .el-button--default').trigger('click')
    const dropdown = wrapper.findAll('.filterbar__buttons .el-dropdown')
    dropdown
      .at(0)
      .find('.el-button')
      .trigger('click')
    dropdown
      .at(0)
      .find('.el-dropdown-menu .el-dropdown-menu__item')
      .trigger('click')
    dropdown
      .at(1)
      .find('.el-button')
      .trigger('click')
    dropdown
      .at(1)
      .find('.el-dropdown-menu .el-dropdown-menu__item')
      .trigger('click')

    expect(spy.mock.calls.length).toBe(5)
    expect(spy.mock.calls[0][0]).toBe('default')
    expect(spy.mock.calls[1][0]).toBe('dropdown1')
    expect(spy.mock.calls[2][0]).toBe('sub1')
    expect(spy.mock.calls[3][0]).toBe('dropdown2')
    expect(spy.mock.calls[4][0]).toBe('sub2')
  })
})

describe('filterbar - filterFields', () => {
  describe('FilterForm', () => {
    it('渲染所有有效的内置字段类型', () => {
      const wrapper = mount(Filterbar, {
        propsData: {
          filterFields: [
            {
              type: 'unknow',
              label: '无效类型'
            },
            ...filterFields
          ]
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
      expect(wrapper.findAll('.filterbar__field')).toHaveLength(
        filterFields.length
      )
    })

    it('指定 width', () => {
      const WIDTH = 280
      const cloneFields = JSON.parse(JSON.stringify(filterFields))
      Object.keys(cloneFields).forEach(key => {
        cloneFields[key].width = WIDTH
      })
      const wrapper = mount(Filterbar, {
        propsData: {
          filterFields: cloneFields
        }
      })
      const $fields = wrapper.findAll(
        '.filterbar__field > .el-form-item > .el-form-item__content > div'
      )
      $fields.wrappers.forEach(field => {
        expect(field.element.style.width).toBe(`${WIDTH}px`)
      })
    })

    it('JSX', function() {
      const jsxWrapper = {
        components: { Filterbar },
        render(h) {
          return (
            <filterbar
              filterFields={[<button>button</button>, <strong>strong</strong>]}
            />
          )
        }
      }
      const wrapper = mount(jsxWrapper)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})

describe('filterbar - filterbarFold', () => {
  const wrapper = mount(Filterbar, {
    propsData: {
      filterbarFold: true
    }
  })

  it('toggleFilterbar', () => {
    const foldClassName = 'list-view__filterbar--fold'
    const $toggler = wrapper.find('.filterbar__submit-more')
    const $filterbar = wrapper.find('.list-view__filterbar').element
    expect($filterbar.classList.contains(foldClassName)).toBe(true)
    wrapper.setProps({ filterbarFold: false })
    expect($filterbar.classList.contains(foldClassName)).toBe(false)
    $toggler.trigger('click')
    expect($filterbar.classList.contains(foldClassName)).toBe(true)
  })
})

describe('filterbar - SearchButton & ResetButton', () => {
  it('SearchButton', () => {
    const wrapper = mount(Filterbar, {
      propsData: { showFilterSearch: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      showFilterSearch: true
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('ResetButton', () => {
    const wrapper = mount(Filterbar, {
      propsData: { showFilterReset: false }
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      showFilterReset: true
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Slots', () => {
    const slotWrapper = {
      components: { Filterbar },
      render(h) {
        return (
          <filterbar>
            <div slot="prepend-filterbar-submit">prepend-filterbar-submit</div>
            <div slot="append-filterbar-submit">append-filterbar-submit</div>
          </filterbar>
        )
      }
    }
    const wrapper = mount(slotWrapper)
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('Events', () => {
    const wrapper = mount(Filterbar)
    const searchBtn = wrapper.findAll('.filterbar__submit-btn button').at(0)
    const resetBtn = wrapper.findAll('.filterbar__submit-btn button').at(1)

    it('Search button', () => {
      searchBtn.trigger('click')
      expect(wrapper.emitted('filter-submit')).toBeTruthy()
      expect(wrapper.emitted('filter-submit').length).toBe(1)
    })

    it('Reset button', () => {
      resetBtn.trigger('click')
      expect(wrapper.emitted('filter-reset')).toBeTruthy()
      expect(wrapper.emitted('filter-reset').length).toBe(1)
    })

    it('Reset model', async () => {
      const wrapper = mount(Filterbar, {
        propsData: {
          filterFields: [
            { type: 'text', model: 'text' },
            { type: 'number', model: 'number' },
            { type: 'multipleSelect', model: 'multipleSelect' }
          ],
          filterModel: {
            text: 'mock text',
            number: 100,
            multipleSelect: [1, 2, 3],
            hiddenParam: 'hidden'
          }
        }
      })
      const resetBtn = wrapper.findAll('.filterbar__submit-btn button').at(1)
      resetBtn.trigger('click')
      expect(wrapper.vm.filterModel).toEqual({
        text: undefined,
        number: undefined,
        multipleSelect: [],
        hiddenParam: 'hidden'
      })
    })
  })
})
