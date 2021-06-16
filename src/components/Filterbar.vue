<template>
  <el-form
    :inline="true"
    size="small"
    class="lv__filterbar"
    @submit.native.prevent
    @keydown.native.enter="handleFilterSearch"
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
        :class="[
          'lv__filterbar-inner',
          { 'lv__filterbar-inner--fold': internalFilterbarFold },
        ]"
      >
        <!-- 提交、重置按钮区域 -->
        <div
          v-if="isShowFilterSubmit"
          ref="submit"
          :class="[
            'lv__filterbar-action',
            {
              'lv__filterbar-action--nomore': !isHasMore,
              'lv__filterbar-action--onleft': isNoneFields,
            },
          ]"
        >
          <div
            :style="{ transform: `translateX(${searchBtnOffset}px)` }"
            class="lv__filterbar-action-submit"
          >
            <el-form-item>
              <slot name="prepend-filterbar-submit" />
              <el-button
                v-if="isShowSearchButton"
                v-bind="searchButton"
                @click="handleFilterSearch"
              >
                {{ searchButton.text }}
              </el-button>
              <el-button
                v-if="isShowFilterButton"
                v-bind="resetButton"
                @click="handleFilterReset"
              >
                {{ resetButton.text }}
              </el-button>
              <slot name="append-filterbar-submit" />
            </el-form-item>
          </div>
          <div class="lv__filterbar-action-ext">
            <slot name="prepend-filterbar-more" />
            <el-button
              icon="el-icon-caret-top"
              type="primary"
              class="lv__filterbar-action-more"
              @click="toggleFilterbar"
            />
            <slot name="append-filterbar-more" />
          </div>
        </div>

        <!-- 操作按钮区域 -->
        <el-form-item v-if="isShowFilterButtons" class="lv__filterbar-buttons">
          <template v-for="(button, index) in filterButtons">
            <v-node
              v-if="isFunction(button)"
              :key="button.key || index"
              :node="button()"
            />
            <v-node
              v-else-if="button.render"
              :key="button.key || index"
              :node="button.render()"
            />
            <v-node
              v-else-if="isVNode(button)"
              :key="button.key || index"
              :node="button"
            />
            <el-dropdown
              v-else-if="Array.isArray(button.children)"
              :key="button.key || index"
              :type="button.type"
              :split-button="button.splitButton"
              :trigger="button.trigger || 'click'"
              placement="bottom"
              @click="applyButtonClick(button, $event)"
            >
              <template v-if="button.splitButton">
                <i v-if="button.icon" :class="button.icon" />
                {{ button.text }}
              </template>
              <template v-else>
                <el-button
                  :type="button.type"
                  :icon="button.icon"
                  @click="applyButtonClick(button, $event)"
                >
                  {{ button.text }}
                  <i class="el-icon-arrow-down el-icon--right" />
                </el-button>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(child, childIndex) in button.children"
                  :key="childIndex"
                  @click.native="applyButtonClick(child, $event)"
                >
                  <i v-if="child.icon" :class="child.icon" />
                  {{ child.text }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              v-else
              :key="button.key || index"
              :type="button.type"
              :plain="button.plain"
              :icon="button.icon"
              @click="applyButtonClick(button, $event)"
            >
              {{ button.text }}
            </el-button>
          </template>
        </el-form-item>

        <!-- 搜索栏控件区域 -->
        <FieldsWrapper
          v-if="isShowFilterFields"
          ref="FieldsWrapper"
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
import Vue, { PropType } from 'vue'
import isFunction from 'lodash/isFunction'
import { isVNode, hasOwn } from '@/utils'
import VNode from './VNode'
import FieldsWrapper from './FieldsWrapper.vue'
import { FilterButton, FilterField } from '~/types'

export default Vue.extend({
  name: 'Filterbar',

  provide(): any {
    return {
      filterModel: (this as any).filterModel,
    }
  },

  components: {
    VNode,
    FieldsWrapper,
  },

  props: {
    filterButtons: {
      type: Array as PropType<FilterButton[]>,
      default: /* istanbul ignore next */ () => [],
    },
    filterFields: {
      type: Array as PropType<FilterField[]>,
      default: /* istanbul ignore next */ () => [],
    },
    filterModel: { type: Object, default: () => ({}) },
    filterbarFold: { type: Boolean, default: true },
    searchButton: { type: [Object, Boolean] },
    resetButton: { type: [Object, Boolean] },
  },

  data() {
    return {
      internalFilterbarFold: true,
      topRightFilterIndex: -1,
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
    isShowFilterButton(): boolean {
      return !!this.resetButton
    },
    isShowFilterSubmit(): boolean {
      return !!(
        this.isShowSearchButton ||
        this.isShowFilterButton ||
        this.$slots['prepend-filterbar-submit'] ||
        this.$slots['append-filterbar-submit']
      )
    },
    isHasMore(): boolean {
      return (
        this.topRightFilterIndex >= 0 &&
        this.topRightFilterIndex < this.filterFields.length - 1
      )
    },
  },

  watch: {
    isShowSearchButton() {
      this.updateLayout()
    },
    isShowFilterButton() {
      this.updateLayout()
    },
    filterbarFold() {
      this.internalFilterbarFold = this.filterbarFold
      this.updateLayout()
    },
  },

  mounted() {
    this.internalFilterbarFold = this.filterbarFold
    this.updateLayout()
  },

  methods: {
    isVNode,
    isFunction,

    getAllFieldsVm(): Vue[] {
      try {
        return (this as any).$refs['FieldsWrapper'].$refs['field'] || []
      } catch (error) {
        return []
      }
    },

    applyButtonClick(item: FilterButton, $event: MouseEvent) {
      if (item && isFunction(item.click)) {
        return item.click($event)
      }
    },

    handleFilterSearch() {
      this.$emit('filter-submit', this.filterModel)
    },

    handleFilterReset() {
      const model = this.filterModel
      const _resetField = (field: FilterField) => {
        const name = field.model
        if (name && hasOwn(model, name)) {
          const value = model[name]
          if (Array.isArray(value)) {
            this.$set(model, name, [])
          } else {
            this.$set(model, name, undefined)
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
      this.$emit('filter-reset', this.filterModel)
    },

    toggleFilterbar() {
      this.internalFilterbarFold = !this.internalFilterbarFold
      this.$emit('update:filterbarFold', this.internalFilterbarFold)
    },

    // 此处不添加 debounce 避免展开时由于父级出现滚动条更新不及时导致界面跳动
    async updateLayout() {
      await this.$nextTick()
      const allFields = this.getAllFieldsVm()
      if (allFields.length > 0) {
        let lastFilterTop = allFields[0].$el.getBoundingClientRect().top
        let lastFilterIndex = -1
        for (let i = 0; i < allFields.length; i++) {
          // debugger
          const formItemTop = allFields[i].$el.getBoundingClientRect().top
          if (lastFilterTop !== formItemTop) {
            break
          }
          lastFilterTop = formItemTop
          lastFilterIndex = i
        }
        this.topRightFilterIndex = lastFilterIndex
        this.updateSubmitOffset(allFields)
      }
    },

    updateSubmitOffset(allFields: Vue[]) {
      if (this.$refs.submit) {
        let offset = 0
        if (this.topRightFilterIndex >= 0) {
          const originOffset = (
            this.$refs.submit as any
          ).getBoundingClientRect().left
          const lastItem = allFields[this.topRightFilterIndex].$el
          const { left, width } = lastItem.getBoundingClientRect()
          offset = left + width - originOffset + 10
          offset = Math.min(0, offset)
        }
        this.searchBtnOffset = Math.floor(offset)
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
    margin: 0;
  }

  &-buttons {
    float: left;
    margin-right: 0;

    .el-button + .el-dropdown,
    .el-dropdown + .el-button,
    .el-dropdown + .el-dropdown,
    .el-form-item__content > * {
      display: inline-block;
      margin-right: @filter-gap-size;
      margin-left: 0;
    }
  }

  &-action {
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &-submit {
      display: inline-block;

      // stylelint-disable-next-line
      .el-form-item__content > * {
        display: inline-block;
        transition: inherit;
      }
      .el-form-item__content > *:not(:nth-child(1)) {
        margin-left: 10px;
      }
      .el-button {
        float: left;
      }
    }

    &-ext {
      float: right;
    }

    &-more {
      width: 40px;
      padding: 0;
      margin-left: 10px;
      line-height: 30px;
      transition: none;
    }

    &--nomore {
      .lv__filterbar-action-more {
        visibility: hidden;
      }
    }

    &--onleft {
      float: none;
      display: inline-block;
    }
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

  &--fold {
    box-sizing: content-box;
    height: 32px;
    overflow: hidden;
    margin-bottom: @filter-gap-size;

    .lv__filterbar-action-more {
      transform: rotate(180deg);
    }
  }
}
</style>
