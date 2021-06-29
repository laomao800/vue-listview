import { mount } from '@vue/test-utils'
import { wait } from '../helpers'
import Listview from '@/Listview'
import ListviewHeader from '@/components/ListviewHeader.vue'

describe('layout', () => {
  describe('height', () => {
    it('full height', async () => {
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 800,
      })

      const wrapper = await mount(Listview, {
        propsData: { autoload: false, usePage: false },
      })
      expect(wrapper.element.style.height).toBe('800px')

      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 500,
      })
      window.dispatchEvent(new Event('resize'))
      await wait()
      expect(wrapper.element.style.height).toBe('500px')
    })

    it('auto height', async () => {
      const wrapper = await mount(Listview, {
        propsData: { autoload: false, usePage: false, fullHeight: false },
      })
      expect(wrapper.element.style.height).toBe('')
    })

    it('specify height', async () => {
      const wrapper = await mount(Listview, {
        propsData: { autoload: false, usePage: false, height: 500 },
      })
      expect(wrapper.element.style.height).toBe('500px')
    })
  })

  describe('ListviewHeader', () => {
    it('empty', async () => {
      const wrapper = await mount(ListviewHeader)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title', () => {
      const headerTitle = 'headerTitle'
      const wrapper = mount(ListviewHeader, {
        propsData: { headerTitle },
      })
      expect(wrapper.text()).toMatch(headerTitle)
    })

    it('nav', async () => {
      const wrapper = await mount(ListviewHeader, {
        propsData: {
          headerNav: ['home', { text: 'list', to: '/list' }],
        },
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title & nav', async () => {
      const wrapper = await mount(ListviewHeader, {
        propsData: {
          headerTitle: 'headerTitle',
          headerNav: [
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
      const contentMessage = 'message text'
      const wrapper = mount(Listview, {
        propsData: { contentMessage },
      })
      const messageBlock = wrapper.find('.lv__message')
      expect(messageBlock.find('.el-icon-warning').exists()).toBe(true)
      expect(messageBlock.find('.lv__message-text').text()).toMatch(
        contentMessage
      )
    })

    it('object', () => {
      const contentMessage = {
        type: 'info',
        text: 'message text',
      }
      const wrapper = mount(Listview, {
        propsData: { contentMessage },
      })
      const messageBlock = wrapper.find('.lv__message')
      expect(messageBlock.find('.el-icon-info').exists()).toBe(true)
      expect(messageBlock.find('.lv__message-text').text()).toMatch(
        contentMessage.text
      )
    })
  })

  describe('row class name', () => {
    it('row string class', async () => {
      const wrapper = await mount(Listview, {
        propsData: {
          requestHandler: () => ({
            result: { items: [{}], total: 1 },
            is_success: true,
          }),
          tableProps: { rowClassName: 'row-view-class' },
        },
      })
      await wait()
      expect(
        wrapper.findAll('.el-table__body-wrapper .el-table__row.row-view-class')
          .length
      ).toBe(1)
    })

    it('row func class', async () => {
      const wrapper = await mount(Listview, {
        propsData: {
          requestHandler: () => ({
            result: { items: [{}], total: 1 },
            is_success: true,
          }),
          tableProps: {
            rowClassName: () => 'row-view-class-fn',
          },
        },
      })
      await wait()
      expect(
        wrapper.findAll(
          '.el-table__body-wrapper .el-table__row.row-view-class-fn'
        ).length
      ).toBe(1)
    })
  })

  describe('listview footer', () => {
    it('pager off', async () => {
      const wrapper = await mount(Listview, { propsData: { usePage: false } })
      expect(wrapper.vm.$el.querySelector('.lv__pager')).toBe(null)
    })

    it('pager on left', async () => {
      const wrapper = await mount(Listview, {
        propsData: { pagePosition: 'left' },
      })
      expect(wrapper.find('.lv__footer-left .lv__pager').exists()).toBe(true)
      expect(wrapper.find('.lv__footer-right .lv__pager').exists()).toBe(false)
    })

    it('pager on right', async () => {
      const wrapper = await mount(Listview, {
        propsData: { pagePosition: 'right' },
      })
      expect(wrapper.find('.lv__footer-left .lv__pager').exists()).toBe(false)
      expect(wrapper.find('.lv__footer-right .lv__pager').exists()).toBe(true)
    })

    it('footer slots', async () => {
      const slots = {
        'footer-left': 'footer left',
        'footer-center': 'footer center',
        'footer-right': 'footer right',
      }
      const wrapper = await mount(Listview, { slots })
      expect(wrapper.find('.lv__footer-left').text()).toBe(slots['footer-left'])
      expect(wrapper.find('.lv__footer-center').text()).toBe(
        slots['footer-center']
      )
      expect(wrapper.find('.lv__footer-right').text()).toBe(
        slots['footer-right']
      )
    })
  })
})
