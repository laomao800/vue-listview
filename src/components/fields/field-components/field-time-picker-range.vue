<template>
  <el-time-picker
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '200px' }"
    :is-range="true"
    :start-placeholder="'开始时间'"
    :end-placeholder="'结束时间'"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldTimeRange',

  mixins: [fieldMixin]
}
</script>
