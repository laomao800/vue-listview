<template>
  <el-cascader
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
    :options="options"
    :loading="loading"
  />
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'
import { resolveOptions } from '@/utils'

export default {
  name: 'FieldCascader',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' },
        props: { expandTrigger: 'hover' },
      },
      options: [],
      loading: false,
    }
  },

  watch: {
    'field.options': {
      immediate: true,
      handler() {
        const setOptions = (options) => {
          if (Array.isArray(options)) {
            this.options = options
          }
        }

        const optionsPromise = resolveOptions(this.field.options, setOptions)
        if (optionsPromise) {
          this.loading = true
          optionsPromise.then(setOptions).finally(() => {
            this.loading = false
          })
        }
      },
    },
  },
}
</script>
