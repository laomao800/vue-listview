import _ from 'lodash'
import get from '@/utils/getValue'

export default {
  props: {
    formModel: { type: Object, default: () => ({}) },
    field: { type: Object, default: () => ({}) }
  },

  computed: {
    value: {
      get() {
        const modelProperty = this.field.model
        let value = null
        if (modelProperty) {
          value = get(this.formModel, modelProperty)
        }
        if (_.camelCase(this.field.type) === 'multipleSelect') {
          // fix: Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错
          value = Array.isArray(value) ? value : []
        }
        return value
      },
      set(newVal) {
        const modelProperty = this.field.model
        if (modelProperty) {
          this.$set(this.formModel, modelProperty, newVal)
        } else {
          if (process.env.NODE_ENV !== 'production') {
            console.error(
              `${JSON.stringify(this.field)}\n 未配置 model 属性，无法写入值。`
            )
          }
        }
      }
    },
    mergedProps() {
      const defaultProps = _.isPlainObject(this.defaultProps)
        ? this.defaultProps
        : {}
      const componentProps = _.isPlainObject(this.field.componentProps)
        ? this.field.componentProps
        : {}
      return _.merge(defaultProps, componentProps)
    },
    mergedEvents() {
      return _.isPlainObject(this.field.componentEvents)
        ? this.field.componentEvents
        : {}
    },
    componentSlots() {
      return this.field.componentSlots || {}
    }
  }
}
