<template>
  <el-cascader
    :placeholder="field.label"
    :disabled="field.disabled"
    :options="field.options"
    v-model="value"
    v-bind="mergedProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldCascader',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' },
        expandTrigger: 'hover'
      }
    }
  }
}
</script>
