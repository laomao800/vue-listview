import Vue, { PropType } from 'vue'
import merge from 'lodash/merge'
import get from 'lodash/get'
import isPlainObject from 'lodash/isPlainObject'
import { error } from '@/utils'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { FilterField } from '~/types'

export default Vue.extend({
  mixins: [storeProviderMixin],

  props: {
    field: { type: Object as PropType<FilterField> },
    default: /* istanbul ignore next */ () => ({}),
  },

  computed: {
    value: {
      get(): any {
        const modelProperty = this.field.model
        let value = null
        if (modelProperty) {
          value = get(this.lvStore.filterModel, modelProperty)
        }
        return value
      },
      set(newVal: any) {
        const modelProperty = this.field.model
        if (modelProperty) {
          this.$set(this.lvStore.filterModel, modelProperty, newVal)
        } else {
          /* istanbul ignore next */
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
