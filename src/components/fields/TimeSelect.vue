<template>
  <el-time-select v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldTimeSelect',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        placeholder: this.field.label,
        disabled: this.field.disabled,
        clearable: true,
        style: { width: '120px' },
      },
    }
  },
}
</script>
