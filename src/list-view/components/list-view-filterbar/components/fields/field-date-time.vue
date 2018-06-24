<template>
  <el-date-picker
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '200px' }"
    :type="'datetime'"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldDateTime',

  mixins: [fieldMixin]
}
</script>
