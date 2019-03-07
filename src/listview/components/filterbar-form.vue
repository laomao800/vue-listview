<template>
  <div v-if="fields.length > 0">
    <div v-for="(field, index) in fields" ref="field" :key="index" class="filterbar__field">
      <transition v-if="field.label" name="label-trans">
        <div v-if="showFieldLabel(field)" class="filterbar__field-label">{{ field.label }}</div>
      </transition>
      <v-node v-if="isFunction(field)" :node="field()"/>
      <v-node v-else-if="isFunction(field.render)" :node="field.render(field)"/>
      <v-node v-else-if="isVNode(field)" :node="field"/>
      <el-form-item v-else>
        <component
          :is="getFieldComponentName(field.type)"
          :model="model"
          :field="field"
          v-bind="{
            // field.width 判断如果放在 {} 内，会导致 field 内的 style 属性的 width 失效
            style: field.width ? { width: `${field.width}px` } : null
          }"
        />
      </el-form-item>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import hasValues from 'has-values'
import fieldComponents, { getFieldComponentName } from '../../components/fields'
import VNode from '../../components/v-node.js'
import { isVNode } from '../../utils/utils.js'

export default {
  name: 'FilterbarForm',

  components: {
    ...fieldComponents,
    VNode
  },

  props: {
    model: {
      type: Object,
      default: /* istanbul ignore next */ () => ({})
    },
    fields: {
      type: Array,
      default: /* istanbul ignore next */ () => []
    }
  },

  methods: {
    isVNode,

    isFunction: _.isFunction,

    getFieldComponentName,

    getFieldValue(field) {
      return this.model[field.model]
    },

    showFieldLabel(field) {
      const value = this.getFieldValue(field)
      // hasValues(null) -> true ，所以需要和 value 同时判断
      return value !== null && hasValues(value)
    }
  }
}
</script>

<style lang="less">
.filterbar__field-label {
  position: absolute;
  top: 0;
  left: 10px;
  z-index: 1;
  padding: 0 0.2em;
  font-size: 12px;
  line-height: 12px;
  color: #999;
  white-space: nowrap;
  background-color: #fff;
  opacity: 1;
  transform: translateY(-50%) scale(0.9);
  transform-origin: center bottom;
}
.label-trans-enter-active,
.label-trans-leave-active {
  top: 0;
  opacity: 1;
  transition: 0.2s;
}
.label-trans-enter,
.label-trans-leave-active {
  top: 50%;
  opacity: 0;
}
</style>
