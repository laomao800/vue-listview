<script lang="tsx">
import Vue, { Component, PropType } from 'vue'
import hasValues from 'has-values'
import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'

import { getValue, isVNode } from '@/utils'
import { FilterField, FieldType, FilterFieldRenderDefinition } from '~/types'

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

const allFieldComponents = {
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

const fieldComponentsMap: Record<FieldType, Component> = {
  cascader: fieldCascader,
  dateTime: fieldDateTime,
  select: fieldSelect,
  timePickerRange: fieldTimePickerRange,
  date: fieldDate,
  dateTimeRange: fieldDateTimeRange,
  multipleSelect: fieldMultipleSelect,
  text: fieldText,
  timeSelect: fieldTimeSelect,
  dateRange: fieldDateRange,
  label: fieldLabel,
  number: fieldNumber,
  timePicker: fieldTimePicker,
}

function getFieldComponent(key: FieldType) {
  return fieldComponentsMap[key] || null
}

function isRenderDefField(input: any): input is FilterFieldRenderDefinition {
  return isPlainObject(input) && isFunction(input.render)
}

export default Vue.extend({
  name: 'FilterbarField',

  inject: {
    filterModel: {
      default: () => ({}),
    },
  },

  components: { ...allFieldComponents },

  props: {
    field: {
      type: Object as PropType<FilterField>,
    },
  },

  computed: {
    showLabel(): boolean {
      const value = getValue((this as any).filterModel, this.field.model)
      // hasValues(null) -> true
      return value !== null && hasValues(value)
    },
  },

  render() {
    const field = this.field
    const label = field.label ? (
      <transition name="label-trans">
        {this.showLabel && (
          <div class="filterbar__field-label">{field.label}</div>
        )}
      </transition>
    ) : null
    let content = null

    if (isFunction(field)) {
      const fieldVm = field()
      content = <v-node node={fieldVm} />
    } else if (isRenderDefField(field)) {
      const fieldVm = field.render()
      content = <v-node node={fieldVm} />
    } else if (isVNode(field)) {
      content = <v-node node={field} />
    } else {
      const FieldComponent = getFieldComponent(field.type) as any
      if (FieldComponent) {
        content = (
          <el-form-item>
            <FieldComponent
              {...{
                props: {
                  field: field,
                  style: field.width ? { width: `${field.width}px` } : null,
                },
              }}
            />
          </el-form-item>
        )
      }
    }
    return (
      <div class="filterbar__field">
        {label}
        {content}
      </div>
    )
  },
})
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
