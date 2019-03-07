import _ from 'lodash'
import Vue from 'vue'
import get from './getValue'

/**
 * 判断 node 是否为 Vue 内部的 VNode 类型
 */
export function isVNode(node) {
  const vm = new Vue()
  const emptyVNode = vm.$createElement()
  return node instanceof emptyVNode.constructor
}

/**
 * 带数值单位字符转换
 * 50 -> '50px'
 * '50px' -> '50px'
 * '50.5px' -> '50px'
 * '50%' -> '50%'
 * '50.5%' -> '50%'
 * 'a' -> null
 */
export function parseSizeWithUnit(value) {
  if (/^-?\d+(.\d+)?(%|(px))$/.test(value)) {
    return value
  } else if (typeof value === 'number') {
    return `${value}px`
  }
  const num = parseInt(value, 10)
  return !isNaN(num) ? `${num}px` : null
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
    _.isPlainObject(field) &&
    field.hasOwnProperty('model') &&
    typeof field.model === 'string'
  )
}
