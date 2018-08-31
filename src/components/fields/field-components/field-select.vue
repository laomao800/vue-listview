<template>
  <el-select
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps">
    <template v-if="Array.isArray(field.options)">
      <el-option
        v-for="(option, index) in field.options"
        :key="index"
        v-bind="option"
      />
    </template>
  </el-select>
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldSelect',

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
