<template>
  <el-form-item :style="{width: `${filter.width}px`}">
    <div v-if="filter.label" :class="[
      'form-item__label',
      {'form-item__label-active': hasValues(model[filter.model])}
    ]">{{ filter.label }}</div>
    <el-input
      v-if="filter.type === 'input'"
      v-model="model[filter.model]"
      v-bind="filter.componentProps"
      :placeholder="filter.label"
      clearable
    />
    <el-select
      v-if="filter.type === 'select' || filter.type === 'multipleSelect'"
      v-model="model[filter.model]"
      v-bind="filter.componentProps"
      :placeholder="filter.label"
      filterable
      clearable>
      <el-option
        v-for="(option, index) in filter.options"
        :key="index"
        :label="option.label"
        :value="option.value"></el-option>
    </el-select>
    <el-date-picker
      v-if="filter.type === 'date'"
      v-model="model[filter.model]"
      v-bind="filter.componentProps"
      :placeholder="filter.label"
    />
    <el-date-picker
      v-if="filter.type === 'dateRange'"
      v-model="model[filter.model]"
      v-bind="filter.componentProps"
    />
  </el-form-item>
</template>

<script>
import hasValues from 'has-values'

export default {
  name: 'ListViewFilterbarItem',
  props: {
    model: { type: Object, default: () => ({}) },
    filter: { type: Object, default: () => ({}) }
  },
  methods: {
    hasValues
  }
}
</script>

<style lang="less" scoped>
.filterbar__items {
  display: block;
}
.form-item {
  &__label {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%) scale(.9);
    z-index: 0;
    font-size: 12px;
    background-color: #fff;
    padding: 0 .2em;
    line-height: 12px;
    color: #999;
    opacity: 0;
    transition: top .2s, opacity .2s;

    &-active {
      top: -2px;
      opacity: 1;
      z-index: 1;
    }
  }
  .el-form-item__content {
    display: block;
  }
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: auto;
  }
}
</style>
