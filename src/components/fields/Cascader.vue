<template>
  <el-cascader
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    :options="internalOptions"
    v-bind="mergedProps"
    v-on="mergedEvents"
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
      internalOptions: [],
      loading: false,
    }
  },

  mounted() {
    const setOptions = (options) => {
      if (Array.isArray(options)) {
        this.internalOptions = options
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
}
</script>
