<template>
  <el-cascader
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    :options="field.options"
    v-bind="mergedProps"
    v-on="mergedEvents"
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
