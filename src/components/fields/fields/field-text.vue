<template>
  <el-input
    v-model="value"
    :placeholder="field.label"
    :disabled="field.disabled"
    v-bind="mergedProps"
    v-on="mergedEvents"
    @blur="onBlur"
  >
    <template v-for="(slot, key) in componentSlots" :slot="key">
      <v-node v-if="isVNode(slot)" :key="key" :node="slot" />
      <template v-else>{{ slot }}</template>
    </template>
  </el-input>
</template>

<script>
import fieldMixin from './field-mixin'
import VNode from '@/components/v-node.js'
import { isVNode, hasOwn } from '@/utils/utils.js'

export default {
  name: 'FieldText',

  components: {
    VNode
  },

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        clearable: true,
        style: { width: '180px' }
      }
    }
  },

  methods: {
    isVNode,
    onBlur() {
      const isTrim = !hasOwn(this.field, 'trim') || !!this.field.trim
      if (isTrim) {
        try {
          this.value = this.value.trim()
        } catch (error) {}
      }
    }
  }
}
</script>
