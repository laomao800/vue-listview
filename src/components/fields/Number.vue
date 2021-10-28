<template>
  <el-input-number v-model="value" v-bind="mergedProps" v-on="mergedEvents" />
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldNumber',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        controlsPosition: 'right',
        style: { width: '100px' },
      },
    }
  },
}
</script>
