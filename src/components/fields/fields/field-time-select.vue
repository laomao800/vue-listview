<template>
  <el-time-select
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
  name: 'FieldTimeSelect',

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
