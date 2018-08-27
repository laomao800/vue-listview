import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import vueTestUtils from '@vue/test-utils'
import _ from 'lodash'
require('babel-plugin-require-context-hook/register')()

Vue.use(ElementUI)

_.mixin({
  pascalCase: _.flow(
    _.camelCase,
    _.upperFirst
  )
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

  // 可以通过以下格式传入 store 定义:
  //
  // store: {
  //   someModuleName: {
  //     state: { ... },
  //     getters: { ... },
  //     actions: { ... },
  //   },
  //   anotherModuleName: {
  //     getters: { ... },
  //   },
  // },
  //
  // 模块默认开启命名空间配置
  if (store) {
    localVue.use(Vuex)
    returnOptions.store = new Vuex.Store({
      modules: Object.keys(store)
        .map(moduleName => {
          const storeModule = store[moduleName]
          return {
            [moduleName]: {
              state: storeModule.state || {},
              getters: storeModule.getters || {},
              actions: storeModule.actions || {},
              namespaced:
                typeof storeModule.namespaced === 'undefined'
                  ? true
                  : storeModule.namespaced
            }
          }
        })
        .reduce((moduleA, moduleB) => Object.assign({}, moduleA, moduleB), {})
    })
  }

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

// 可传入 Vuex 的单个 module ，自动创建只包含传入 module 的一个 store
global.createModuleStore = vuexModule => {
  vueTestUtils.createLocalVue().use(Vuex)
  const store = new Vuex.Store({
    ..._.cloneDeep(vuexModule)
  })
  if (vuexModule.actions.init) {
    store.dispatch('init')
  }
  return store
}
