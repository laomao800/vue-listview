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
import _ from 'lodash'
import fieldMixin from './field-mixin'
import { isPromise } from '@/utils/utils'

export default {
  name: 'FieldSelect',

  mixins: [fieldMixin],

  data() {
    const defaultProps = {
      clearable: true,
      filterable: true,
      style: { width: '180px' }
    }
    if (_.camelCase(this.field.type) === 'multipleSelect') {
      defaultProps.multiple = true
      defaultProps.collapseTags = true
    }
    return {
      defaultProps,
      internalOptions: [],
      loading: false
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
