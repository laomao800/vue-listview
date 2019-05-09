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
import _ from 'lodash'
import fieldMixin from './field-mixin'
import { isPromise } from '@/utils/utils'

export default {
  name: 'FieldCascader',

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' },
        expandTrigger: 'hover'
      },
      internalOptions: []
    }
  },

  async mounted() {
    const optionConfig = this.field.options
    const isPromiseOption = isPromise(optionConfig)
    if (Array.isArray(optionConfig)) {
      this.internalOptions = optionConfig
    } else if (_.isFunction(optionConfig) || isPromiseOption) {
      this.loading = true
      const resolver = options => {
        if (Array.isArray(options)) {
          this.internalOptions = options
          this.loading = false
        }
      }
      const result = isPromiseOption
        ? await optionConfig
        : await optionConfig(resolver)
      resolver(result)
    }
  }
}
</script>
