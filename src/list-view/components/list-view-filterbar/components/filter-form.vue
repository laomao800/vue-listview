<template>
  <div v-if="schema.length > 0">
    <div
      v-for="(field, index) in schema"
      v-if="getFieldCmpName(field)"
      ref="field"
      :key="index"
      class="filterbar__field">
      <el-form-item>
        <transition
          v-if="field.label"
          name="label-trans">
          <div
            v-if="showFieldLabel(field)"
            class="filterbar__field-label">{{ field.label }}</div>
        </transition>
        <component
          :is="getFieldCmpName(field)"
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
import { camelCase, zipObject } from 'lodash'
import fieldComponents from './fields'
import hasValues from 'has-values'

const componentKeys = Object.keys(fieldComponents)
const fieldKeys = componentKeys.map(key => camelCase(key.replace(/^field/, '')))
const validFields = zipObject(fieldKeys, componentKeys)

export default {
  name: 'FilterForm',

  components: fieldComponents,

  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    schema: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      validFields
    }
  },

  methods: {
    getFieldCmpName(field) {
      return validFields[field.type]
    },
    getFieldValue(field) {
      return this.model[field.model]
    },
    showFieldLabel(field) {
      const value = this.getFieldValue(field)
      // hasValues(null) -> true ，所以需要和 value 同时判断
      return value && hasValues(value)
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
