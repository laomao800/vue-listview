<template>
  <el-input
    :placeholder="field.label"
    :disabled="field.disabled"
    v-model="value"
    v-bind="mergedProps"
    v-on="mergedEvents"
  >
    <template
      v-for="(slot, key) in componentSlots"
      :slot="key"
    >
      <v-node
        v-if="isVNode(slot)"
        :key="key"
        :node="slot"
      />
      <template v-else>{{ slot }}</template>
    </template>
  </el-input>
</template>

<script>
import fieldMixin from '../field-mixin'
import VNode from '@/components/v-node.js'
import { isVNode } from '@/utils/utils.js'

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
    isVNode
  }
}
</script>
