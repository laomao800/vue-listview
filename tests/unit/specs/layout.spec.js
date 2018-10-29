import Vue from 'vue'
import { shallowMount } from '@vue/test-utils'
import Listview from '@/index.js'
import ListviewHeader from '@/components/listview-header'

describe('layout', () => {
  describe('listview header', () => {
    it('empty', () => {
      const wrapper = shallowMount(ListviewHeader)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title', () => {
      const wrapper = shallowMount(ListviewHeader, {
        propsData: {
          title: 'headerTitle'
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('nav', () => {
      const wrapper = shallowMount(ListviewHeader, {
        propsData: {
          nav: [{ text: 'home', to: '/home' }, { text: 'list', to: '/list' }]
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('title & nav', () => {
      const wrapper = shallowMount(ListviewHeader, {
        propsData: {
          title: 'headerTitle',
          nav: [{ text: 'home', to: '/home' }, { text: 'list', to: '/list' }]
        }
      })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  it('specify height', () => {
    const wrapper = shallowMount(Listview, {
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
    const wrapper = shallowMount(Listview, {
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
    const wrapper = shallowMount(Listview, {
      propsData: {
        usePage: false
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  describe('contentMessage', () => {
    it('string', () => {
      const wrapper = shallowMount(Listview, {
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
      const wrapper = shallowMount(Listview, {
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
