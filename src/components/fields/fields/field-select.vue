<template>
  <el-select
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    :loading="loading"
    v-bind="mergedProps"
    v-on="mergedEvents"
  >
    <el-option v-for="(option, index) in internalOptions" :key="index" v-bind="option"/>
  </el-select>
</template>

<script>
import _ from 'lodash'
import fieldMixin from './field-mixin'

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
    if (Array.isArray(optionConfig)) {
      this.internalOptions = optionConfig
    } else if (_.isFunction(optionConfig)) {
      this.loading = true
      const resolver = options => {
        if (Array.isArray(options)) {
          this.internalOptions = options
          this.loading = false
        }
      }
      const result = await optionConfig(resolver)
      resolver(result)
    }
  }
}
</script>
