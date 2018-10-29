<template>
  <div class="listview-container">
    <listview-header
      :title="headerTitle"
      :nav="headerNav"
    />

    <div class="listview-container__tabs">
      <span
        v-for="(title, index) in childListviewTitles"
        :key="index"
        :class="[
          'listview-container__tab',
          { 'listview-container__tab--active': index === activeTab }
        ]"
        @click="activeTab = index"
      >
        {{ title || '未命名' }}
      </span>
    </div>

    <div class="listview-container__content">
      <keep-alive>
        <template v-for="(item, index) in childListviews">
          <v-node-cmp
            v-if="index === activeTab"
            ref="listviewChild"
            :key="index"
            :node="item"
          />
        </template>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import VNodeCmp from '../components/v-node-cmp.js'
import ListviewHeader from '../components/listview-header.vue'

export default {
  name: 'ListviewContainer',

  components: {
    VNodeCmp,
    ListviewHeader
  },

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] }
  },

  data() {
    return {
      activeTab: 0
    }
  },

  computed: {
    childListviews() {
      return this.$slots.default.filter(
        slot =>
          slot.componentOptions &&
          slot.componentOptions.Ctor.extendOptions.name === 'Listview'
      )
    },
    childListviewTitles() {
      return this.childListviews.map(
        child => child.componentOptions.propsData.headerTitle || ''
      )
    }
  },

  watch: {
    async activeTab(index) {
      await this.$nextTick()
      this.childListviews[index].componentInstance.updateLayout()
    }
  }
}
</script>

<style lang="less">
.listview-container {
  display: flex;
  flex-direction: column;

  &__tabs {
    padding: 5px 5px 0;
    background: #f4f7fa;
    border-bottom: 1px solid #e2e6ec;
  }
  &__tab {
    display: inline-block;
    padding: 0 16px;
    margin-bottom: -1px;
    margin-left: -1px;
    font-size: 14px;
    line-height: 36px;
    color: #333;
    cursor: pointer;
    border: solid #0000;
    border-width: 1px 1px 0;
    border-radius: 3px 3px 0 0;
    transition: color 0.2s;

    &:hover {
      color: #409eff;
    }

    &--active {
      color: #409eff;
      cursor: default;
      background: #fff;
      border-color: #dadee5;
    }
  }

  &__content {
    flex: 1;
    overflow: hidden;

    .listview__header {
      display: none;
    }
    .listview__main {
      border-top: none;
    }
  }
}
</style>
