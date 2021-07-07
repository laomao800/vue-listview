<template>
  <div class="lv__header">
    <h1 v-if="headerTitle" class="lv__header-title">{{ headerTitle }}</h1>
    <el-breadcrumb
      v-if="internalNav.length > 0"
      separator="/"
      class="lv__header-breadcrumb"
    >
      <el-breadcrumb-item
        v-for="(item, index) in internalNav"
        :key="index"
        :to="item.to"
      >
        {{ item.text }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
import isPlainObject from 'lodash/isPlainObject'

export default {
  name: 'ListviewHeader',

  inheritAttrs: false,

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },
  },

  computed: {
    internalNav() {
      const validNav = []
      this.headerNav.forEach((nav) => {
        let text, to
        if (typeof nav === 'string' && !!nav) {
          text = nav
        } else if (isPlainObject(nav)) {
          text = nav.text
          to = nav.to
        }
        if (text) {
          validNav.push({ text, to })
        }
      })
      return validNav
    },
  },
}
</script>

<style lang="less">
.lv__header {
  margin: -10px -10px 10px;
  padding: 8px 12px;
  line-height: 1.5;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;

  &:empty {
    display: none;
  }

  .lv__header-title {
    display: inline-block;
    padding: 0 1em 0 0;
    margin: 0 1em 0 0;
    font-size: 16px;
    border-right: 1px solid #dcdfe6;
  }
  .lv__header-breadcrumb {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
