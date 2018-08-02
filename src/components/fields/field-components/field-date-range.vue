<template>
  <el-date-picker
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '240px' }"
    :type="'daterange'"
    :start-placeholder="'开始日期'"
    :end-placeholder="'结束日期'"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldDataRange',

  mixins: [fieldMixin]
}
</script>
