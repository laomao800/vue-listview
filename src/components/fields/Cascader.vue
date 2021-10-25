<template>
  <el-cascader
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
    :options="internalOptions"
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
        placeholder: this.field.label,
        disabled: this.field.disabled,
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
