<template>
  <ListviewLayout ref="layout" v-bind="$attrs" @update-layout="updateLayout">
    <template #filterbar>
      <Filterbar ref="filterbar" v-bind="$attrs" @fold-change="updateLayout">
        <slot slot="filterbar-top" name="filterbar-top" />
        <slot slot="filterbar-bottom" name="filterbar-bottom" />
        <slot slot="filterbar-left" name="filterbar-left" />
        <slot slot="filterbar-right" name="filterbar-right" />
        <slot slot="prepend-more" name="prepend-more" />
        <slot slot="append-more" name="append-more" />
        <slot slot="prepend-submit" name="prepend-submit" />
        <slot slot="append-submit" name="append-submit" />
      </Filterbar>
    </template>
    <template #content="props">
      <div :style="{ height: props.contentHeight + 'px' }">MainContent</div>
    </template>
  </ListviewLayout>
</template>

<script lang="tsx">
import Vue from 'vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import Filterbar from '@/components/Filterbar.vue'

export default Vue.extend({
  name: 'Listview',

  inheritAttrs: false,

  components: {
    ListviewLayout,
    Filterbar,
  },

  methods: {
    updateLayout() {
      this.$nextTick().then(() => {
        // 搜索栏展开完成后再执行重算布局
        ;(this.$refs.filterbar as any).updateLayout()
      })
    },
  },
})
</script>
