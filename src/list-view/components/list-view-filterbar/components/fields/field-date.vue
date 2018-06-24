<template>
  <el-date-picker
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '180px' }"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldDate',

  mixins: [fieldMixin]
}
</script>
