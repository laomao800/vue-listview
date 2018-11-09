import Vue from 'vue'
import get from 'get-value'

export function isVNode(node) {
  const vm = new Vue()
  const emptyVNode = vm.$createElement()
  return node instanceof emptyVNode.constructor
}

export function parseSizeWithUnit(value) {
  const isPercent = /\d+%/.test(value)
  const num = parseInt(value, 10)
  return num ? (isPercent ? `${num}%` : `${num}px`) : null
}

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
