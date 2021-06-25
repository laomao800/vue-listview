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
import fieldMixin from '../../mixins/fieldMixin'

export default {
  name: 'FieldTimePicker',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '120px' },
      },
    }
  },
}
</script>
