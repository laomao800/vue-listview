<template>
  <el-date-picker v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldDateTimeRange',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '360px' },
        type: 'datetimerange',
        startPlaceholder: '开始日期',
        endPlaceholder: '结束日期',
        expandTrigger: 'hover',
      },
    }
  },
}
</script>
