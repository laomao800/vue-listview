import { mount } from '@vue/test-utils'
import Listview from '@/Listview'
import ListviewHeader from '@/components/ListviewHeader.vue'

describe('layout', () => {
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
        propsData: {
          contentMessage,
        },
      })
      const messageBlock = wrapper.find('.lv__message')
      expect(messageBlock.find('.el-icon-warning').exists()).toBe(true)
      expect(messageBlock.find('.lv__message-text').text()).toMatch(
        contentMessage
      )
    })

    //   it('object', () => {
    //     const wrapper = mount(Listview, {
    //       propsData: {
    //         contentMessage: {
    //           type: 'info',
    //           message: 'message text',
    //         },
    //       },
    //     })
    //     expect(wrapper.vm.$data.internalContentMessage).toEqual({
    //       type: 'info',
    //       icon: 'el-icon-info',
    //       message: 'message text',
    //     })
    //   })
  })

  // describe('row class name', () => {
  //   it('row string class', async () => {
  //     const wrapper = await mount(Listview, {
  //       propsData: {
  //         tableProps: {
  //           rowClassName: 'row-view-class',
  //         },
  //       },
  //     })
  //     expect(
  //       wrapper
  //         .findComponent({ ref: 'contentTable' })
  //         .element.getAttribute('row-class-name')
  //     ).toContain('row-view-class')
  //   })

  //   it('row func class', async () => {
  //     const wrapper = await mount(Listview, {
  //       propsData: {
  //         tableProps: {
  //           rowClassName: () => 'row-view-class-fn',
  //         },
  //       },
  //     })
  //     expect(
  //       wrapper
  //         .findComponent({ ref: 'contentTable' })
  //         .element.getAttribute('row-class-name')
  //     ).toContain('row-view-class-fn')
  //   })
  // })

  // describe('listview footer', () => {
  //   it('pager off', async () => {
  //     const wrapper = await mount(Listview, { propsData: { usePage: false } })
  //     expect(wrapper.vm.$el.querySelector('.lv__pager')).toBe(null)
  //   })

  //   it('pager on right', async () => {
  //     const wrapper = await mount(Listview, {
  //       propsData: { pagePosition: 'right' },
  //     })
  //     expect(wrapper.vm.$el.querySelector('.lv__footer-left .lv__pager')).toBe(
  //       null
  //     )
  //     expect(
  //       wrapper.vm.$el.querySelector('.lv__footer-right .lv__pager')
  //     ).not.toBe(null)
  //   })

  //   it('footer slots', async () => {
  //     const slots = {
  //       'footer-left': 'footer left',
  //       'footer-center': 'footer center',
  //       'footer-right': 'footer right',
  //     }
  //     const wrapper = await mount(Listview, {
  //       slots,
  //     })
  //     expect(
  //       wrapper.vm.$el.querySelector('.lv__footer-left')!.textContent
  //     ).toBe(slots['footer-left'])
  //     expect(
  //       wrapper.vm.$el.querySelector('.lv__footer-center')!.textContent
  //     ).toBe(slots['footer-center'])
  //     expect(
  //       wrapper.vm.$el.querySelector('.lv__footer-right')!.textContent
  //     ).toBe(slots['footer-right'])
  //   })
  // })

  // describe('Others', () => {
  //   it('specify height', async () => {
  //     const wrapper = await mount(Listview, {
  //       propsData: {
  //         autoload: false,
  //         usePage: false,
  //         height: 500,
  //       },
  //     })
  //     expect(wrapper.element.style.height).toBe('500px')
  //   })
  // })
})
