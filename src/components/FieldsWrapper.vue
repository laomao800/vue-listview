<script>
import { isValidFieldDef } from '@/utils'
import VNode from './VNode'
import FilterbarField from './FilterbarField.vue'

export default {
  name: 'FieldsWrapper',

  components: {
    VNode,
  },

  props: {
    model: {
      type: Object,
      default: /* istanbul ignore next */ () => ({}),
    },
    fields: {
      type: Array,
      default: /* istanbul ignore next */ () => [],
    },
  },

  methods: {
    renderFieldsGroup(group = []) {
      const subFieldsVm = []
      group.forEach((subField) => {
        const vm = this.renderField(subField)
        vm && subFieldsVm.push(vm)
      })
      return subFieldsVm.length > 0 ? (
        <div class="filterbar__field filterbar__field--group">
          {subFieldsVm}
        </div>
      ) : null
    },
    renderField(field = {}) {
      return isValidFieldDef(field) ? <FilterbarField field={field} /> : null
    },
  },

  render() {
    return (
      <div class="fields-wrapper">
        {this.fields.map((item) =>
          // 仅对第一层嵌套的 array 作组合
          Array.isArray(item)
            ? this.renderFieldsGroup(item)
            : this.renderField(item)
        )}
      </div>
    )
  },
}
</script>
