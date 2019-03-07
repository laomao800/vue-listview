<template>
  <el-select
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    v-bind="mergedProps"
    v-on="mergedEvents"
  >
    <template v-if="Array.isArray(field.options)">
      <el-option v-for="(option, index) in field.options" :key="index" v-bind="option"/>
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
        filterable: true,
        style: { width: '180px' }
      }
    }
  }
}
</script>
