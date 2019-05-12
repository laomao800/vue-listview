import _ from 'lodash'

const requireFiles = require.context('./fields', true, /\.vue$/)

const allComponents = {}
requireFiles.keys().forEach(fileName => {
  // 以驼峰命名作为 key 名存储
  const componentName = _.camelCase(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )
  allComponents[componentName] = requireFiles(fileName).default
})

const componentNames = Object.keys(allComponents)
const fieldKeys = componentNames.map(key =>
  _.camelCase(key.replace(/^field/, ''))
)
const fieldKeysMap = _.zipObject(fieldKeys, componentNames)

function getFieldComponentName(key) {
  if (key) {
    const fieldKey = _.camelCase(key)
    return fieldKeysMap[fieldKey] || null
  }
  /* istanbul ignore next */
  return null
}

export { allComponents, getFieldComponentName }
