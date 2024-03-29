<template>
  <el-form
    :inline="true"
    size="small"
    :class="['lv__filterbar', { 'lv__filterbar--fold': isFold }]"
    @submit.native.prevent
    @keydown.native.enter="handleSubmit"
  >
    <div v-if="$slots['filterbar-top']" class="lv__filterbar-top">
      <slot name="filterbar-top" />
    </div>

    <div class="lv__filterbar-main">
      <div v-if="$slots['filterbar-left']" class="lv__filterbar-left">
        <slot name="filterbar-left" />
      </div>

      <div
        v-if="isShowFilterButtons || isShowFilterSubmit || isShowFilterFields"
        class="lv__filterbar-inner"
      >
        <!-- 提交、重置按钮区域 -->
        <div
          v-if="isShowFilterSubmit"
          ref="action"
          :class="[
            'lv__filterbar-action',
            {
              'lv__filterbar-action--nomore': isNoMore,
              'lv__filterbar-action--onleft': isNoneFields,
            },
          ]"
        >
          <el-form-item
            :style="{ transform: `translateX(${searchBtnOffset}px)` }"
            class="lv__filterbar-action-submit"
          >
            <slot name="prepend-submit" />
            <el-button
              v-if="isShowSearchButton"
              v-bind="searchButton"
              @click="handleFilterSearch"
            >
              {{ searchButton.text }}
            </el-button>
            <el-button
              v-if="isShowResetButton"
              v-bind="resetButton"
              @click="handleFilterReset"
            >
              {{ resetButton.text }}
            </el-button>
            <slot name="append-submit" />
          </el-form-item>
          <div class="lv__filterbar-action-ext">
            <slot name="prepend-more" />
            <el-button
              v-if="filterbarFoldable"
              icon="el-icon-caret-top"
              type="primary"
              class="lv__filterbar-action-more"
              @click="toggleFilterbar"
            />
            <slot name="append-more" />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <FilterbarButtons
          v-if="isShowFilterButtons"
          :buttons="filterButtons"
          class="lv__filterbar-buttons"
        />

        <!-- 搜索栏控件区域 -->
        <FilterbarFields
          v-if="isShowFilterFields"
          ref="FilterbarFields"
          :fields="filterFields"
          class="lv__filterbar-fields"
        />
      </div>

      <div v-if="$slots['filterbar-right']" class="lv__filterbar-right">
        <slot name="filterbar-right" />
      </div>
    </div>

    <div v-if="$slots['filterbar-bottom']" class="lv__filterbar-bottom">
      <slot name="filterbar-bottom" />
    </div>
  </el-form>
</template>

<script lang="tsx">
import type { PropType } from 'vue'
import Vue from 'vue'
import { FilterButton, FilterField } from '~/types'
import { hasOwn } from '@/utils'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import FilterbarButtons from './FilterbarButtons.vue'
import FilterbarFields from './FilterbarFields.vue'

export default Vue.extend({
  name: 'Filterbar',

  mixins: [storeProviderMixin],

  inheritAttrs: false,

  components: {
    FilterbarButtons,
    FilterbarFields,
  },

  props: {
    filterbarFoldable: {
      type: Boolean,
      default: true,
    },
    filterbarFold: {
      type: Boolean,
      default: true,
    },
    filterButtons: {
      type: Array as PropType<FilterButton[]>,
      default: /* istanbul ignore next */ () => [],
    },
    filterFields: {
      type: Array as PropType<FilterField[]>,
      default: /* istanbul ignore next */ () => [],
    },
    searchButton: {
      type: [Object, Boolean],
      default: () => ({
        text: '搜索',
        icon: 'el-icon-search',
        type: 'primary',
      }),
    },
    resetButton: {
      type: [Object, Boolean],
      default: () => ({
        text: '重置',
        icon: '',
        type: 'default',
      }),
    },
  },

  data() {
    return {
      isFold: this.filterbarFold,
      topRightItemIndex: -1,
      actionOffsetLeft: 0,
      searchBtnOffset: 0,
    }
  },

  computed: {
    isNoneFields(): boolean {
      return this.filterFields.length === 0
    },
    isShowFilterButtons(): boolean {
      return this.filterButtons.length > 0
    },
    isShowFilterFields(): boolean {
      return this.filterFields.length > 0
    },
    isShowSearchButton(): boolean {
      return !!this.searchButton
    },
    isShowResetButton(): boolean {
      return !!this.resetButton
    },
    isShowFilterSubmit(): boolean {
      return !!(
        this.isShowSearchButton ||
        this.isShowResetButton ||
        this.$slots['prepend-filterbar-submit'] ||
        this.$slots['append-filterbar-submit']
      )
    },
    allFieldsVm(): Vue[] {
      try {
        return (this as any).$refs['FilterbarFields'].$refs['field'] || []
      } catch (error) {
        return []
      }
    },
    isNoMore(): boolean {
      return this.topRightItemIndex === this.filterFields.length - 1
    },
  },

  watch: {
    filterButtons() {
      this.$nextTick(this.updateLayout)
    },
    filterFields() {
      this.$nextTick(this.updateLayout)
    },
    isShowSearchButton: 'updateLayout',
    isShowResetButton: 'updateLayout',
  },

  created() {
    if (!this.filterbarFoldable) {
      this.isFold = false
    }
  },

  methods: {
    handleSubmit() {
      this.lvStore.pressEnterSearch && this.handleFilterSearch()
    },

    handleFilterSearch() {
      this.$rootEmitProxy('filter-submit')
      this.lvStore.search()
    },

    handleFilterReset() {
      const filterModel = this.lvStore.filterModel
      const _resetField = (field: FilterField) => {
        const name = field.model
        if (name && hasOwn(filterModel, name)) {
          const value = filterModel[name]
          if (Array.isArray(value)) {
            this.$set(filterModel, name, [])
          } else {
            this.$set(filterModel, name, undefined)
          }
        }
      }
      this.filterFields.forEach((field) => {
        if (Array.isArray(field)) {
          field.forEach(_resetField)
        } else {
          _resetField(field)
        }
      })
      this.$rootEmitProxy('filter-reset')
    },

    toggleFilterbar() {
      this.isFold = !this.isFold
      this.$emit('fold-change', this.isFold)
    },

    updateLayout() {
      // TODO: updateTopRightItemIndex 计算流程待优化
      // updateTopRightItemIndex 影响 isNoMore 按钮显示，需计算后再执行按钮偏移量计算
      this.updateTopRightItemIndex()
      this.$nextTick().then(() => {
        // updateTopRightItemIndex 可能受 more 按钮影响而产生变化，此处先直接重新计算作二次确认
        this.updateTopRightItemIndex()
        this.updateActionOffset()
        this.updateBtnOffset()
      })
    },

    getAllFieldsDom() {
      try {
        return (this as any).$refs['FilterbarFields'].$refs['field'] || []
      } catch (error) {
        return []
      }
    },

    updateTopRightItemIndex() {
      let lastFilterIndex = -1
      const allFields = this.allFieldsVm
      if (allFields.length > 0) {
        const $action = this.$refs.action as Element
        let lastFilterTop = $action.getBoundingClientRect().top
        for (let i = 0; i < allFields.length; i++) {
          const curItemTop = allFields[i].$el.getBoundingClientRect().top
          if (curItemTop > lastFilterTop) {
            break
          }
          lastFilterIndex = i
        }
      }
      this.topRightItemIndex = lastFilterIndex
    },

    updateBtnOffset() {
      let offset = 0
      if (this.topRightItemIndex >= 0) {
        const lastItem = this.allFieldsVm[this.topRightItemIndex].$el
        const { left, width } = lastItem.getBoundingClientRect()
        offset = left + width - this.actionOffsetLeft + 10
        offset = Math.min(0, offset)
      }
      this.searchBtnOffset = Math.floor(offset)
    },

    updateActionOffset() {
      const $action = this.$refs.action as Element
      if ($action) {
        this.actionOffsetLeft = $action.getBoundingClientRect().left
      }
    },
  },
})
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv__filterbar-top {
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-bottom {
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-left {
  margin-right: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-right {
  margin-left: @filter-gap-size;
  margin-bottom: @filter-gap-size;
}
.lv__filterbar-main {
  display: flex;
}

.lv__filterbar {
  .el-button {
    [class*=' el-icon-'],
    [class^='el-icon-'] {
      width: 1em;
    }

    height: 32px;
    padding-top: 0;
    padding-bottom: 0;
    line-height: 1;
    vertical-align: top;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    padding: 0 10px;
  }
  .el-form-item__label {
    padding: 0 0 0 2px;
    margin-right: -4px;
  }
  .el-form-item {
    margin: 0 !important;
  }
}

.lv__filterbar {
  &-buttons {
    float: left;
    margin-right: 0;

    > div.el-form-item__content {
      .el-button + .el-dropdown,
      .el-dropdown + .el-button,
      .el-dropdown + .el-dropdown,
      > * {
        display: inline-block;
        margin-right: @filter-gap-size;
        margin-left: 0;
      }
    }
  }

  &-action {
    display: flex;
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &--nomore {
      .lv__filterbar-action-more {
        display: none;
      }
    }

    &--onleft {
      float: none;
      display: inline-block;
    }
  }

  &-action-submit .el-form-item__content,
  &-action-ext {
    display: flex;
    & > * {
      display: inline-block;
      transition: inherit;
    }
    & > *:not(:nth-child(1)) {
      margin-left: 10px;
    }
  }

  &-action-ext {
    float: right;
    margin-left: 10px;
  }

  & &-action-more {
    width: 40px;
    padding: 0;
    transition: none;
  }
}

.lv__filterbar-inner {
  flex: 1;
  padding-top: @filter-gap-size;
  margin-top: -@filter-gap-size;

  &::after {
    display: table;
    clear: both;
    content: '';
  }
}

.lv__filterbar--fold {
  .lv__filterbar-inner {
    box-sizing: content-box;
    height: 32px;
    overflow: hidden;
    margin-bottom: @filter-gap-size;
  }

  .lv__filterbar-action-more {
    transform: rotate(180deg);
  }
}
</style>
