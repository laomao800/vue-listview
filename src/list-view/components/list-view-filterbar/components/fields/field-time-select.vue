<template>
  <el-time-select
    :placeholder="field.label"
    :clearable="true"
    :disabled="field.disabled"
    :style="{ width: '120px' }"
    v-model="value"
    v-bind="field.componentProps"
  />
</template>

<script>
import fieldMixin from '../field-mixin'

export default {
  name: 'FieldTimeSelect',

  mixins: [fieldMixin]
}
</script>
