<template>
  <el-date-picker
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    v-bind="mergedProps"
    v-on="mergedEvents"
  />
</template>

<script>
import fieldMixin from './field-mixin'

export default {
  name: 'FieldDataRange',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '240px' },
        type: 'daterange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        expandTrigger: 'hover'
      }
    }
  }
}
</script>
