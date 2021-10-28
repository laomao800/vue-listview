<template>
  <el-input
    v-model="value"
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
import fieldMixin from '@/mixins/fieldMixin'
import VNode from '../VNode'
import { isVNode, hasOwn } from '@/utils'

export default {
  name: 'FieldText',

  components: {
    VNode,
  },

  mixins: [fieldMixin],

  data() {
    return {
      defaultProps: {
        placeholder: this.field.label,
        clearable: true,
        style: { width: '180px' },
      },
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
    },
  },
}
</script>
