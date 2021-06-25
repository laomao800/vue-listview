<template>
  <StoreProvider ref="storeProvider" v-bind="mergedAttrs" v-on="$listeners">
    <ListviewLayout
      ref="layout"
      v-bind="mergedAttrs"
      @update-layout="updateLayout"
    >
      <template #filterbar>
        <Filterbar
          ref="filterbar"
          v-bind="mergedAttrs"
          @fold-change="filterbarUpdateLayout"
          @submit="handleFilterSubmit"
        >
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
        <ListviewContent v-bind="mergedAttrs" :height="props.contentHeight">
          <slot v-bind="props" />
        </ListviewContent>
      </template>
      <template #footer>
        <ListviewContentFooter />
      </template>
    </ListviewLayout>
  </StoreProvider>
</template>

<script lang="tsx">
import Vue from 'vue'
import StoreProvider from '@/components/StoreProvider.vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import Filterbar from '@/components/Filterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'

export default Vue.extend({
  name: 'Listview',

  inheritAttrs: false,

  components: {
    StoreProvider,
    ListviewLayout,
    Filterbar,
    ListviewContent,
    ListviewContentFooter,
  },

  computed: {
    mergedAttrs() {
      return {
        // presetProps 由 create 时提供
        ...((this as any).presetProps || {}),
        ...this.$attrs,
      }
    },
  },

  methods: {
    updateLayout() {
      setTimeout(() => {
        // 搜索栏展开完成后再执行重算布局
        ;(this.$refs.filterbar as any).updateLayout()
      })
    },
    filterbarUpdateLayout() {
      this.$nextTick().then(() => {
        ;(this.$refs.layout as any).updateLayout()
      })
    },
    handleFilterSubmit() {
      ;(this.$refs.storeProvider as any).startRequest()
    },
  },
})
</script>
