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
          title: 'headerTitle',
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('nav', () => {
      const wrapper = mount(ListviewHeader, {
        propsData: {
          nav: ['home', { text: 'list', to: '/list' }],
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title & nav', () => {
      const wrapper = mount(ListviewHeader, {
        propsData: {
          title: 'headerTitle',
          nav: [
            { text: 'home', to: '/home' },
            { text: 'list', to: '/list' },
          ],
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('contentMessage', () => {
    it('string', () => {
      const wrapper = mount(Listview, {
        propsData: {
          contentMessage: 'message text',
        },
      })
      expect(wrapper.vm.internalContentMessage).toEqual({
        type: null,
        icon: null,
        message: 'message text',
      })
    })

    it('object', () => {
      const wrapper = mount(Listview, {
        propsData: {
          contentMessage: {
            type: 'info',
            message: 'message text',
          },
        },
      })
      expect(wrapper.vm.internalContentMessage).toEqual({
        type: 'info',
        icon: 'el-icon-info',
        message: 'message text',
      })
    })
  })

  describe('row class name', () => {
    it('row string class', async () => {
      const wrapper = mount(Listview, {
        propsData: {
          tableProps: {
            rowClassName: 'row-view-class',
          },
        },
      })
      expect(
        wrapper
          .find({ ref: 'contentTable' })
          .element.getAttribute('row-class-name')
      ).toContain('row-view-class')
    })

    it('row func class', () => {
      const wrapper = mount(Listview, {
        propsData: {
          tableProps: {
            rowClassName: () => 'row-view-class-fn',
          },
        },
      })
      expect(
        wrapper
          .find({ ref: 'contentTable' })
          .element.getAttribute('row-class-name')
      ).toContain('row-view-class-fn')
    })
  })

  describe('listview footer', () => {
    it('pager off', () => {
      const wrapper = mount(Listview, { propsData: { usePage: false } })
      expect(wrapper.vm.$el.querySelector('.listview__pager')).toBe(null)
    })

    it('pager on right', () => {
      const wrapper = mount(Listview, { propsData: { pagePosition: 'right' } })
      expect(
        wrapper.vm.$el.querySelector('.listview__footer-left .listview__pager')
      ).toBe(null)
      expect(
        wrapper.vm.$el.querySelector('.listview__footer-right .listview__pager')
      ).not.toBe(null)
    })

    it('footer slots', () => {
      const slots = {
        'footer-left': 'footer left',
        'footer-center': 'footer center',
        'footer-right': 'footer right',
      }
      const wrapper = mount(Listview, {
        slots,
      })
      expect(
        wrapper.vm.$el.querySelector('.listview__footer-left').textContent
      ).toBe(slots['footer-left'])
      expect(
        wrapper.vm.$el.querySelector('.listview__footer-center').textContent
      ).toBe(slots['footer-center'])
      expect(
        wrapper.vm.$el.querySelector('.listview__footer-right').textContent
      ).toBe(slots['footer-right'])
    })
  })

  describe('Others', () => {
    it('specify height', () => {
      const wrapper = mount(Listview, {
        propsData: {
          autoload: false,
          usePage: false,
          height: 500,
        },
      })
      expect(wrapper.element.style.height).toBe('500px')
    })
  })
})
