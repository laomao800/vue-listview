<template>
  <el-select
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '180px' }"
    :multiple="true"
    :collapse-tags="true"
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
  name: 'FieldMultipleSelect',

  mixins: [fieldMixin]
}
</script>
