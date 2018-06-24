<template>
  <el-select
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '180px' }"
    v-model="value"
    v-bind="field.componentProps">
    <el-option
      v-for="(option, index) in field.options"
      :key="index"
      v-bind="option"
    />
  </el-select>
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldSelect',

  mixins: [fieldMixin]
}
</script>
