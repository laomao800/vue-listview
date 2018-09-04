import _ from 'lodash'

// 导入本目录下所有以 `field` 开头的 .vue 文件
const requireFiles = require.context(
  './field-components',
  true,
  /(^\.\/field)(.+)(\.vue$)/
)

const components = {}
requireFiles.keys().forEach(fileName => {
  // 以驼峰命名作为 key 名存储
  const componentName = _.camelCase(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  )
  components[componentName] = requireFiles(fileName).default
})

const componentNames = Object.keys(components)
const fieldKeys = componentNames.map(key =>
  _.camelCase(key.replace(/^field/, ''))
)
const fieldKeysMap = _.zipObject(fieldKeys, componentNames)
function getFieldComponentName(key) {
  if (!key) {
    return false
  }
  const fieldKey = _.camelCase(key)
  return fieldKeysMap[fieldKey]
}

export default components
export { getFieldComponentName }
