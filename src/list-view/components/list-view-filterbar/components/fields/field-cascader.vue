<template>
  <el-cascader
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '180px' }"
    :expand-trigger="'hover'"
    :options="field.options"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldCascader',

  mixins: [fieldMixin]
}
</script>
