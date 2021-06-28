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
import isFunction from 'lodash/isFunction'
import fieldMixin from '../../mixins/fieldMixin'
import { ensurePromise, isPromise } from '@/utils'

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

  async mounted() {
    const setOptions = (options) => {
      if (Array.isArray(options)) {
        this.internalOptions = options
      }
    }

    let optionsPromise
    const options = this.field.options
    if (isPromise(options)) {
      optionsPromise = options
    } else if (Array.isArray(options)) {
      optionsPromise = ensurePromise(options)
    } else if (isFunction(options)) {
      optionsPromise = ensurePromise(options(setOptions))
    }

    this.loading = true
    optionsPromise.then(setOptions).finally(() => {
      this.loading = false
    })
  },
}
</script>
