<script lang="tsx">
import Vue, { VNode, PropType } from 'vue'
import { FilterField } from '~/types'
import FilterbarField from './FilterbarField.vue'

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
