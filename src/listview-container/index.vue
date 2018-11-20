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
      <template v-for="(item, index) in childListviews">
        <keep-alive :key="index">
          <v-node
            v-if="index === activeTab"
            ref="listviewChild"
            :node="item"
          />
        </keep-alive>
      </template>
    </div>
  </div>
</template>

<script>
import VNode from '../components/v-node.js'
import ListviewHeader from '../components/listview-header.vue'
import './listview-container.less'

export default {
  name: 'ListviewContainer',

  components: {
    VNode,
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
