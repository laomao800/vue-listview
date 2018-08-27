const _ = require('lodash')
const customMatchers = {}

customMatchers.toBeAComponent = function(options) {
  if (isAComponent()) {
    return {
      message: () => `${this.utils.printReceived(options)} 不为 Vue 组件`,
      pass: true
    }
  } else {
    return {
      message: () => `${this.utils.printReceived(options)} 为合法的 Vue 组件`,
      pass: false
    }
  }

  function isAComponent() {
    return _.isPlainObject(options) && typeof options.render === 'function'
  }
}

customMatchers.toBeAViewComponent = function(options, mockInstance) {
  if (definesAPageTitle()) {
    return {
      message: () =>
        `${this.utils.printReceived(
          options
        )} 非视图组件不可定义 metaInfo.title 视图标题`,
      pass: true
    }
  } else {
    return {
      message: () =>
        `${this.utils.printReceived(
          options
        )} 视图组件必须包含 metaInfo.title 作为视图标题`,
      pass: false
    }
  }

  function definesAPageTitle() {
    if (!options.metaInfo) return false
    const pageObject =
      typeof options.metaInfo === 'function'
        ? options.metaInfo.apply(mockInstance || {})
        : options.metaInfo
    if (!pageObject.hasOwnProperty('title')) return false
    return true
  }
}

customMatchers.toBeAVuexModule = function(options) {
  if (isAVuexModule()) {
    return {
      message: () => `${this.utils.printReceived(options)} 不为一个 Vuex 模块`,
      pass: true
    }
  } else {
    return {
      message: () =>
        `${this.utils.printReceived(
          options
        )} 为一个 Vuex 模块，包含 state, getters, mutations, actions`,
      pass: false
    }
  }

  function isAVuexModule() {
    return (
      _.isPlainObject(options) &&
      _.isPlainObject(options.state) &&
      _.isPlainObject(options.getters) &&
      _.isPlainObject(options.mutations) &&
      _.isPlainObject(options.actions)
    )
  }
}

// https://facebook.github.io/jest/docs/zh-Hans/expect.html#expectextendmatchers
global.expect.extend(customMatchers)
