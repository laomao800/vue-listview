import _ from 'lodash'
import get from '@/utils/getValue'
import { isValidFieldConfig } from '@/utils/utils'

export default {
  props: {
    model: { type: Object, default: () => ({}) },
    field: { type: Object, default: () => ({}) }
  },

  computed: {
    value: {
      get() {
        if (isValidFieldConfig(this.field)) {
          let value = get(this.model, this.field.model)
          // fix: Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错
          if (_.camelCase(this.field.type) === 'multipleSelect') {
            value = Array.isArray(value) ? value : []
          }
          return value
        }
      },
      set(newVal) {
        if (isValidFieldConfig(this.field)) {
          const modelData = this.model
          const model = this.field.model
          this.$set(modelData, model, newVal)
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
