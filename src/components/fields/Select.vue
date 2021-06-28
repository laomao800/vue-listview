<template>
  <el-select
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    :loading="loading"
    v-bind="mergedProps"
    v-on="mergedEvents"
  >
    <el-option
      v-for="(option, index) in internalOptions"
      v-bind="option"
      :key="index"
    />
  </el-select>
</template>

<script>
import isFunction from 'lodash/isFunction'
import fieldMixin from '../../mixins/fieldMixin'
import { ensurePromise, isPromise } from '@/utils'

export default {
  name: 'FieldSelect',

  mixins: [fieldMixin],

  data() {
    const defaultProps = {
      clearable: true,
      filterable: true,
      style: { width: '180px' },
    }
    if (this.field.type === 'multipleSelect') {
      defaultProps.multiple = true
      defaultProps.collapseTags = true
    }
    return {
      defaultProps,
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
