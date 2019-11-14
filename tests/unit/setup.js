import Vue from 'vue'
import ElementUI from 'element-ui'
import vueTestUtils, { config } from '@vue/test-utils'
import _ from 'lodash'
require('babel-plugin-require-context-hook/register')()

// 使用内建的 transition 组件，避免 <ElSelectDropdown> 组件在测试中报错
config.stubs.transition = false
config.stubs['el-table'] = {
  template:
    '<div class="mock-el-table" :row-class-name="internalRowClassName" />',
  props: {
    rowClassName: {}
  },
  computed: {
    internalRowClassName() {
      return typeof this.rowClassName === 'function'
        ? this.rowClassName({})
        : this.rowClassName
    }
  }
}
config.stubs['el-select'] = '<div class="mock-el-select" />'
config.stubs['el-input-number'] = '<div class="mock-el-input-number" />'
// config.stubs['el-pagination'] = '<div class="mock-el-pagination" />'
config.stubs['el-pagination'] = Vue.extend({
  name: 'ElPagination',
  template: '<div class="mock-el-pagination" />'
})

Vue.use(ElementUI)

_.mixin({
  pascalCase: _.flow(_.camelCase, _.upperFirst)
})

Vue.config.productionTip = false

// 全局 mixin 补充组件必要属性
Vue.mixin({
  created() {
    // 添加 CSS modules 下的默认 `$style` 属性
    this.$style = this.$style || {}
  }
})

// 模拟实现 window localStorage 方法
Object.defineProperty(window, 'localStorage', {
  value: (function() {
    let store = {}
    return {
      getItem: function(key) {
        return store[key] || null
      },
      setItem: function(key, value) {
        store[key] = value.toString()
      },
      clear: function() {
        store = {}
      }
    }
  })()
})

// 全局辅助方法
// https://vue-test-utils.vuejs.org/zh/api/mount.html
global.mount = vueTestUtils.mount

// https://vue-test-utils.vuejs.org/zh/api/shallowMount.html
global.shallowMount = vueTestUtils.shallowMount

// 创建带 store ， route ， style 的组件配置
global.createComponentMocks = ({ store, router, style, mocks, stubs }) => {
  // https://vue-test-utils.vuejs.org/zh/api/createLocalVue.html
  const localVue = vueTestUtils.createLocalVue()
  const returnOptions = { localVue }

  // https://vue-test-utils.vuejs.org/zh/api/options.html#stubs
  returnOptions.stubs = stubs || {}
  // https://vue-test-utils.vuejs.org/zh/api/options.html#mocks
  returnOptions.mocks = mocks || {}

  // 如果传入 `router: true` ，则会自动注册 2 个 Vue Router 的内置组件
  if (router) {
    returnOptions.stubs['router-link'] = true
    returnOptions.stubs['router-view'] = true
  }

  // 可通过 `style` 传入用于模拟 CSS Module 的数据
  if (style) {
    returnOptions.mocks.$style = style
  }

  return returnOptions
}
