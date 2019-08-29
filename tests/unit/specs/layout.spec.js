import { mount } from '@vue/test-utils'
import Listview from '@/index.js'
import ListviewHeader from '@/components/listview-header'

describe('layout', () => {
  describe('listview header', () => {
    it('empty', () => {
      const wrapper = mount(ListviewHeader)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title', () => {
      const wrapper = mount(ListviewHeader, {
        propsData: {
          title: 'headerTitle'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('nav', () => {
      const wrapper = mount(ListviewHeader, {
        propsData: {
          nav: ['home', { text: 'list', to: '/list' }]
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title & nav', () => {
      const wrapper = mount(ListviewHeader, {
        propsData: {
          title: 'headerTitle',
          nav: [{ text: 'home', to: '/home' }, { text: 'list', to: '/list' }]
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('height', () => {
    it('specify height', () => {
      const wrapper = mount(Listview, {
        propsData: {
          autoload: false,
          usePage: false,
          height: 500
        }
      })
      expect(wrapper.element.style.height).toBe('500px')
    })
  })

  describe('contentMessage', () => {
    it('string', () => {
      const wrapper = mount(Listview, {
        propsData: {
          contentMessage: 'message text'
        }
      })
      expect(wrapper.vm.internalContentMessage).toEqual({
        type: null,
        icon: null,
        message: 'message text'
      })
    })

    it('object', () => {
      const wrapper = mount(Listview, {
        propsData: {
          contentMessage: {
            type: 'info',
            message: 'message text'
          }
        }
      })
      expect(wrapper.vm.internalContentMessage).toEqual({
        type: 'info',
        icon: 'el-icon-info',
        message: 'message text'
      })
    })
  })

  it('pager off', () => {
    const wrapper = mount(Listview, { propsData: { usePage: false } })
    expect(wrapper.vm.$el.querySelector('.listview__page')).toBe(null)
  })

  describe('row class name', () => {
    it('row string class', async () => {
      const wrapper = mount(Listview, {
        propsData: {
          tableProps: {
            rowClassName: 'row-view-class'
          }
        }
      })
      expect(
        wrapper.vm.$refs.contentTable.rowClassName({
          row: {},
          rowIndex: 1
        })
      ).toContain('row-view-class')
    })

    it('row func class', () => {
      const wrapper = mount(Listview, {
        propsData: {
          tableProps: {
            rowClassName: ({ rowIndex }) => 'row-' + rowIndex
          }
        }
      })
      expect(
        wrapper.vm.$refs.contentTable.rowClassName({
          row: {},
          rowIndex: 1
        })
      ).toContain('row-1')
    })
  })
})
