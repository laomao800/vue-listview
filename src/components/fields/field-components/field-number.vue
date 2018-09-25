<template>
  <el-input-number
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldNumber',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        controlsPosition: 'right',
        style: { width: '100px' }
      }
    }
  }
}
</script>
