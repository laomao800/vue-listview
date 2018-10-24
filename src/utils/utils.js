import Vue from 'vue'
import _ from 'lodash'
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

/**
 * 更改 object key 拼写方案，并返回一个新 object （浅克隆）
 * @param {Object} 待处理 object
 * @param {String} 转换方案
 */
function transformObjectKey(object = {}, transformCase) {
  let transformFunction
  switch (transformCase) {
    case 'camelCase':
      transformFunction = _.camelCase
      break
    case 'snakeCase':
      transformFunction = _.snakeCase
      break
    case 'pascalCase':
      transformFunction = str => _.upperFirst(_.camelCase(str))
      break
  }

  if (!transformFunction) {
    /* istanbul ignore next */
    return object
  } else {
    return _.transform(
      object,
      (result, value, key) => {
        result[transformFunction(key)] = value
        return result
      },
      {}
    )
  }
}

export function camelCaseObjectKey(object = {}) {
  return transformObjectKey(object, 'camelCase')
}

export function snakeCaseObjectKey(object = {}) {
  return transformObjectKey(object, 'snakeCase')
}

export function pascalCaseObjectKey(object = {}) {
  return transformObjectKey(object, 'pascalCase')
}
