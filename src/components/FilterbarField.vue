<script>
import hasValues from 'has-values'
import isFunction from 'lodash/isFunction'
import camelCase from 'lodash/camelCase'

import { error, getValue, isVNode } from '@/utils'

import fieldCascader from './fields/Cascader.vue'
import fieldDateTime from './fields/DateTime.vue'
import fieldSelect from './fields/Select.vue'
import fieldTimePickerRange from './fields/TimePickerRange.vue'
import fieldDate from './fields/Date.vue'
import fieldDateTimeRange from './fields/DateTimeRange.vue'
import fieldMultipleSelect from './fields/MultipleSelect.vue'
import fieldText from './fields/Text.vue'
import fieldTimeSelect from './fields/TimeSelect.vue'
import fieldDateRange from './fields/DateRange.vue'
import fieldLabel from './fields/Label.vue'
import fieldNumber from './fields/Number.vue'
import fieldTimePicker from './fields/TimePicker.vue'

const allComponents = {
  fieldCascader,
  fieldDateTime,
  fieldSelect,
  fieldTimePickerRange,
  fieldDate,
  fieldDateTimeRange,
  fieldMultipleSelect,
  fieldText,
  fieldTimeSelect,
  fieldDateRange,
  fieldLabel,
  fieldNumber,
  fieldTimePicker,
}

function getFieldComponentName(type) {
  if (type) {
    const fieldKey = camelCase(`field-${type}`)
    return allComponents[fieldKey] || null
  }
  /* istanbul ignore next */
  return null
}

export default {
  components: { ...allComponents },

  props: {
    model: { type: Object, default: () => ({}) },
    field: { type: Object, default: () => ({}) },
  },

  computed: {
    showLabel() {
      const value = getValue(this.model, this.field.model)
      // hasValues(null) -> true
      return value !== null && hasValues(value)
    },
  },

  methods: {
    renderField(field) {
      const label = field.label ? (
        <transition name="label-trans">
          {this.showLabel && (
            <div class="filterbar__field-label">{field.label}</div>
          )}
        </transition>
      ) : null

      const key = field.key || field.model || null
      let content = null

      if (isFunction(field)) {
        content = <v-node node={field()} key={key} />
      } else if (isFunction(field.render)) {
        content = <v-node node={field.render(field)} key={key} />
      } else if (isVNode(field)) {
        content = <v-node node={field} key={key} />
      } else {
        const FieldComponent = getFieldComponentName(field.type)
        if (FieldComponent) {
          content = (
            <el-form-item key={key}>
              <FieldComponent
                form-model={this.model}
                field={field}
                style={field.width ? { width: `${field.width}px` } : null}
              />
            </el-form-item>
          )
        }
      }

      return (
        <div ref="field" refInFor={true} class="filterbar__field">
          {label}
          {content}
        </div>
      )
    },
  },

  render() {
    try {
      return this.renderField(this.field)
    } catch (err) {
      error(err, this.field)
    }

    return null
  },
}
</script>

<style>
.filterbar__field-label {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1;
  padding: 0 0.2em;
  font-size: 12px;
  line-height: 12px;
  color: #999;
  white-space: nowrap;
  cursor: default;
  background-color: #fff;
  opacity: 1;
  transform: translateY(-50%) scale(0.9);
  transform-origin: center bottom;
}
.label-trans-enter-active,
.label-trans-leave-active {
  top: 0;
  opacity: 1;
  transition: 0.2s;
}
.label-trans-enter,
.label-trans-leave-active {
  top: 50%;
  opacity: 0;
}
</style>
