import Vue from 'vue'
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

  it('specify height', () => {
    const wrapper = mount(Listview, {
      propsData: {
        autoload: false,
        usePage: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.setProps({
      height: 500
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('contentMinHeight', () => {
    const wrapper = mount(Listview, {
      propsData: {
        height: 200,
        contentMinHeight: 500
      }
    })
    wrapper.vm.updateContentHeight()
    return Vue.nextTick().then(function() {
      expect(wrapper.vm.contentHeight).toBe(500)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('pager', () => {
    const wrapper = mount(Listview, {
      propsData: {
        usePage: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
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
})
