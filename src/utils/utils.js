import _ from 'lodash'
import Vue from 'vue'
import get from './getValue'
import { getFieldComponentName } from '@/components/fields'

/**
 * 判断 node 是否为 Vue 内部的 VNode 类型
 */
export function isVNode(node) {
  const vm = new Vue()
  const emptyVNode = vm.$createElement()
  return node instanceof emptyVNode.constructor
}

/**
 * 根据映射表设置的结构提取数据并返回一个新对象
 *
 * dataMapping({
 *   result: {
 *     results: [1, 2, 3]
 *   }
 * }, {
 *   items: 'result.results'
 * })
 *
 * -> { items: [1, 2, 3] }
 *
 * @param {Object} data 目标数据
 * @param {Object} dataMap 映射表
 */
export function dataMapping(data = {}, dataMap = {}) {
  const result = {}
  const keysMap = Object.keys(dataMap)

  keysMap.forEach(key => {
    try {
      const dataKey = key.toString()
      const dataValue = get(data, dataMap[key])
      result[dataKey] = dataValue
    } catch (e) {}
  })

  return result
}

/**
 * 判断值是否为搜索栏内合法的值，通过验证的值才可继续作为参数随请求提交
 */
export function isValidFieldValue(val) {
  return !(
    val === null ||
    val === undefined ||
    val === '' ||
    ((Array.isArray(val) || _.isPlainObject(val)) && _.isEmpty(val))
  )
}

/**
 * 判断一个值是否有效的搜索栏 field 配置项
 */
export function isValidFieldConfig(field) {
  return (
    _.isFunction(field) ||
    _.isFunction(field.render) ||
    isVNode(field) ||
    getFieldComponentName(field.type)
  )
}

export function nodeParents(node, selector) {
  const allMatchs = Array.from(document.querySelectorAll(selector))
  if (allMatchs.length === 0) {
    return null
  }
  function find(curNode) {
    const parentNode = curNode.parentNode
    if (allMatchs.includes(parentNode)) {
      return parentNode
    } else {
      if (parentNode.parentNode) {
        return find(parentNode)
      }
    }
    return null
  }
  return find(node)
}

export function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

export function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
