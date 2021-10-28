<template>
  <el-date-picker v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldDateTime',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        placeholder: this.field.label,
        clearable: true,
        style: { width: '200px' },
        type: 'datetime',
      },
    }
  },
}
</script>
