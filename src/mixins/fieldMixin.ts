import Vue, { PropType } from 'vue'
import merge from 'lodash/merge'
import isPlainObject from 'lodash/isPlainObject'
import { getValue, error } from '@/utils'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { FilterField } from '~/types'

export default Vue.extend({
  mixins: [storeProviderMixin],

  props: {
    field: { type: Object as PropType<FilterField> },
    default: () => ({}),
  },

  computed: {
    value: {
      get(): any {
        const modelProperty = this.field.model
        let value = null
        if (modelProperty) {
          value = getValue(this.lvStore.requestData, modelProperty)
        }
        if (this.field.type === 'multipleSelect') {
          // fix: Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错
          value = Array.isArray(value) ? value : []
        }
        return value
      },
      set(newVal: any) {
        const modelProperty = this.field.model
        if (modelProperty) {
          this.$set(this.lvStore.requestData, modelProperty, newVal)
        } else {
          if (process.env.NODE_ENV !== 'production') {
            error(
              `${JSON.stringify(this.field)}\n 未配置 model 属性，无法写入值。`
            )
          }
        }
      },
    },
    mergedProps(): FilterField['componentProps'] {
      let defaultProps = (this as any).defaultProps
      defaultProps = isPlainObject(defaultProps) ? defaultProps : {}
      const componentProps = isPlainObject(this.field.componentProps)
        ? this.field.componentProps
        : {}
      return merge(defaultProps, componentProps)
    },
    mergedEvents(): FilterField['componentEvents'] {
      return isPlainObject(this.field.componentEvents)
        ? this.field.componentEvents
        : {}
    },
    componentSlots(): FilterField['componentSlots'] {
      return this.field.componentSlots || {}
    },
  },
})
