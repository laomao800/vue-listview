<script lang="tsx">
import type { FilterField } from '~/types'
import type { VNode, PropType } from 'vue'
import Vue from 'vue'
import isFunction from 'lodash/isFunction'
import { hasOwn, isVNode, error } from '@/utils'
import { getFieldComponent } from './fields/index'
import FilterbarField from './FilterbarField.vue'

function isValidFieldConfig(field: any) {
  if (!field) return false

  if (hasOwn(field, 'type')) {
    if (getFieldComponent(field.type)) {
      return true
    } else {
      error(`Invalid filter field type '${field.type}'`, field)
      return false
    }
  }

  return (
    (hasOwn(field, 'render') && isFunction(field.render)) ||
    isFunction(field) ||
    isVNode(field) ||
    Array.isArray(field)
  )
}

let uid = 0

export default Vue.extend({
  name: 'FilterbarFields',

  props: {
    fields: {
      type: Array as PropType<FilterField[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  methods: {
    renderFieldsGroup(group: FilterField[] = []) {
      const subFieldsVm: VNode[] = []
      group.forEach((subField) => {
        const vm = this.renderField(subField)
        vm && subFieldsVm.push(vm)
      })
      return subFieldsVm.length > 0 ? (
        <div class="lv__field-group">{subFieldsVm}</div>
      ) : null
    },
    renderField(field = {} as FilterField) {
      if (!isValidFieldConfig(field)) return null

      const key = field.key || field.model || `unnamed-field-${uid++}`
      return (
        <FilterbarField
          {...{
            ref: 'field',
            key,
            refInFor: true,
            props: { field: field as any },
          }}
        />
      )
    },
  },

  render() {
    return (
      <div class="lv__fields-wrapper">
        {this.fields.map((item) =>
          // 仅对第一层嵌套的 array 作组合
          Array.isArray(item)
            ? this.renderFieldsGroup(item)
            : this.renderField(item)
        )}
      </div>
    )
  },
})
</script>

<style lang="less">
.lv__field-group {
  display: inline-block;
  margin: 0;
  vertical-align: top;
}
</style>
