<template>
  <el-date-picker
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldDateTime',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '200px' },
        type: 'datetime'
      }
    }
  }
}
</script>
