<template>
  <div v-if="title || nav.length > 0" class="listview__header">
    <h1 v-if="title" class="listview__title">{{ title }}</h1>
    <el-breadcrumb separator="/" class="listview__breadcrumb">
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
import _ from 'lodash'

export default {
  name: 'ListviewHeader',

  props: {
    title: { type: String, default: '' },
    nav: { type: Array, default: () => [] }
  },

  computed: {
    internalNav() {
      const validNav = []
      this.nav.forEach(nav => {
        let text, to
        if (typeof nav === 'string' && !!nav) {
          text = nav
        } else if (_.isPlainObject(nav)) {
          text = nav.text
          to = nav.to
        }
        if (text) {
          validNav.push({
            text,
            to
          })
        }
      })
      return validNav
    }
  }
}
</script>

<style lang="less">
.listview__header {
  padding: 10px 20px;
  line-height: 1.5;
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;

  .listview__title {
    display: inline-block;
    padding: 0 1em 0 0;
    margin: 0 1em 0 0;
    font-size: 16px;
    border-right: 1px solid #dcdfe6;
  }
  .listview__breadcrumb {
    display: inline-block;
  }
}
</style>
