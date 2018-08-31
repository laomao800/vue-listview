<template>
  <el-time-picker
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldTimePicker',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '120px' }
      }
    }
  }
}
</script>
