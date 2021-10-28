import type { FilterField } from '~/types'
import type { PropType } from 'vue'
import Vue from 'vue'
import merge from 'lodash/merge'
import isPlainObject from 'lodash/isPlainObject'
import isFunction from 'lodash/isFunction'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { error, get } from '@/utils'

export default Vue.extend({
  mixins: [storeProviderMixin],

  props: {
    field: { type: Object as PropType<FilterField> },
  },

  data() {
    return {
      disabled: this.field.disabled,
    }
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
      return merge({ disabled: this.disabled }, defaultProps, componentProps)
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

  created() {
    if (isFunction(this.field.effect)) {
      this.field.effect({
        vm: this,
        filterModel: this.lvStore.filterModel,
      })
    }
  },
})
