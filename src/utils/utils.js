import Vue from 'vue'
import get from '@/utils/get-value'

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
  const isPercent = /\d+%/.test(value)
  const num = parseInt(value, 10)
  return num ? (isPercent ? `${num}%` : `${num}px`) : null
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
