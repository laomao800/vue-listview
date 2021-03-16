import camelCase from 'lodash/camelCase'
import fieldCascader from './fields/field-cascader.vue'
import fieldDateTime from './fields/field-date-time.vue'
import fieldSelect from './fields/field-select.vue'
import fieldTimePickerRange from './fields/field-time-picker-range.vue'
import fieldDate from './fields/field-date.vue'
import fieldDateTimeRange from './fields/field-date-time-range.vue'
import fieldMultipleSelect from './fields/field-multiple-select.vue'
import fieldText from './fields/field-text.vue'
import fieldTimeSelect from './fields/field-time-select.vue'
import fieldDateRange from './fields/field-date-range.vue'
import fieldLabel from './fields/field-label.vue'
import fieldNumber from './fields/field-number.vue'
import fieldTimePicker from './fields/field-time-picker.vue'

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
function getFieldComponentName(key) {
  if (key) {
    const fieldKey = camelCase(`field-${key}`)
    return allComponents[fieldKey] || null
  }
  /* istanbul ignore next */
  return null
}

export { allComponents, getFieldComponentName }
