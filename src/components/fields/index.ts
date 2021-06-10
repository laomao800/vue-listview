import camelCase from 'lodash/camelCase'

import fieldCascader from './cascader.vue'
import fieldDateTime from './date-time.vue'
import fieldSelect from './select.vue'
import fieldTimePickerRange from './time-picker-range.vue'
import fieldDate from './date.vue'
import fieldDateTimeRange from './date-time-range.vue'
import fieldMultipleSelect from './multiple-select.vue'
import fieldText from './text.vue'
import fieldTimeSelect from './time-select.vue'
import fieldDateRange from './date-range.vue'
import fieldLabel from './label.vue'
import fieldNumber from './number.vue'
import fieldTimePicker from './time-picker.vue'

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
function getFieldComponentName(key: string) {
  if (key) {
    const fieldKey = camelCase(`field-${key}`) as keyof typeof allComponents
    return allComponents[fieldKey] || null
  }
  /* istanbul ignore next */
  return null
}

export { allComponents, getFieldComponentName }
