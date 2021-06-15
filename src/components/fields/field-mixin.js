import Vue from 'vue'
import merge from 'lodash/merge'
import camelCase from 'lodash/camelCase'
import isPlainObject from 'lodash/isPlainObject'
import { getValue, error } from '@/utils'

export default Vue.extend({
  inject: {
    filterModel: {
      default: () => ({}),
    },
  },

  props: {
    field: { type: Object, default: () => ({}) },
  },

  computed: {
    value: {
      get() {
        const modelProperty = this.field.model
        let value = null
        if (modelProperty) {
          value = getValue(this.filterModel, modelProperty)
        }
        if (camelCase(this.field.type) === 'multipleSelect') {
          // fix: Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错
          value = Array.isArray(value) ? value : []
        }
        return value
      },
      set(newVal) {
        const modelProperty = this.field.model
        if (modelProperty) {
          this.$set(this.filterModel, modelProperty, newVal)
        } else {
          if (process.env.NODE_ENV !== 'production') {
            error(
              `${JSON.stringify(this.field)}\n 未配置 model 属性，无法写入值。`
            )
          }
        }
      },
    },
    mergedProps() {
      const defaultProps = isPlainObject(this.defaultProps)
        ? this.defaultProps
        : {}
      const componentProps = isPlainObject(this.field.componentProps)
        ? this.field.componentProps
        : {}
      return merge(defaultProps, componentProps)
    },
    mergedEvents() {
      return isPlainObject(this.field.componentEvents)
        ? this.field.componentEvents
        : {}
    },
    componentSlots() {
      return this.field.componentSlots || {}
    },
  },
})
