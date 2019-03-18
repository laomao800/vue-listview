<template>
  <el-time-picker
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
  name: 'FieldTimeRange',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '200px' },
        isRange: true,
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  }
}
</script>
