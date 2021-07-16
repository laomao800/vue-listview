<template>
  <StoreProvider
    ref="storeProvider"
    v-bind="mergedAttrs"
    v-on="$listeners"
    @root-emit="(...args) => $emit.bind(this)(...args)"
  >
    <ListviewLayout
      ref="layout"
      v-bind="mergedAttrs"
      @update-layout="_handleUpdateLayout"
    >
      <template #header>
        <component :is="_header" v-bind="mergedAttrs" />
      </template>
      <template #filterbar>
        <component
          :is="_filterbar"
          ref="filterbar"
          v-bind="mergedAttrs"
          @fold-change="_handleFilterFold"
        >
          <slot slot="filterbar-top" name="filterbar-top" />
          <slot slot="filterbar-bottom" name="filterbar-bottom" />
          <slot slot="filterbar-left" name="filterbar-left" />
          <slot slot="filterbar-right" name="filterbar-right" />
          <slot slot="prepend-more" name="prepend-more" />
          <slot slot="append-more" name="append-more" />
          <slot slot="prepend-submit" name="prepend-submit" />
          <slot slot="append-submit" name="append-submit" />
        </component>
      </template>
      <template #content="props">
        <slot v-bind="props">
          <component :is="_content" v-bind="mergedAttrs" />
        </slot>
      </template>
      <template #footer>
        <component :is="_footer" v-bind="mergedAttrs">
          <slot slot="footer-left" name="footer-left" />
          <slot slot="footer-center" name="footer-center" />
          <slot slot="footer-right" name="footer-right" />
        </component>
      </template>
    </ListviewLayout>
  </StoreProvider>
</template>

<script lang="tsx">
import Vue, { Component } from 'vue'
import debounce from 'lodash/debounce'
import get from 'lodash/get'
import isPlainObject from 'lodash/isPlainObject'
import StoreProvider from '@/components/StoreProvider.vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import Filterbar from '@/components/Filterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'
import ListviewContentFooter from '@/components/ListviewContentFooter.vue'

export default Vue.extend({
  name: 'Listview',

  inheritAttrs: false,

  components: {
    StoreProvider,
    ListviewLayout,
  },

  computed: {
    mergedAttrs(): Record<string, any> {
      const preset = (this as any).presetProps__
      return isPlainObject(preset) ? { ...preset, ...this.$attrs } : this.$attrs
    },
    _header(): Component {
      return this._getReplaceComponent('header', ListviewHeader)
    },
    _filterbar(): Component {
      return this._getReplaceComponent('filterbar', Filterbar)
    },
    _content(): Component {
      return this._getReplaceComponent('content', ListviewContent)
    },
    _footer(): Component {
      return this._getReplaceComponent('footer', ListviewContentFooter)
    },
  },

  methods: {
    search(keepInPage: boolean) {
      return (this.$refs.storeProvider as any).search(keepInPage)
    },
    resetFilter() {
      ;(this.$refs.filterbar as any).handleFilterReset()
    },
    setContentMessage(text: string, type: string, cleanData = false) {
      ;(this.$refs.storeProvider as any).setContentMessage(
        text,
        type,
        cleanData
      )
    },
    updateLayout: debounce(
      function () {
        // @ts-ignore
        this._updateWrapperLayout()
      },
      0,
      { leading: true }
    ),
    _updateWrapperLayout() {
      try {
        ;(this.$refs.layout as any).updateLayout()
      } catch (e) {}
    },
    _updateFilterLayout() {
      try {
        ;(this.$refs.filterbar as any).updateLayout()
      } catch (e) {}
    },
    _handleUpdateLayout() {
      this.$nextTick().then(() => this._updateFilterLayout())
    },
    _handleFilterFold() {
      this.$nextTick().then(() => this._updateWrapperLayout())
    },
    _getReplaceComponent(name: string, defaultComp: Component): Component {
      return get((this as any).replaceComponents__, name, defaultComp)
    },
  },
})
</script>
