<template>
  <el-input
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldText',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' }
      }
    }
  }
}
</script>
