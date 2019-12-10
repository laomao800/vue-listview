<template>
  <div
    v-if="showFilterButtons || showFilterSubmit || showFilterFields"
    :class="[
      'listview__filterbar',
      { 'listview__filterbar--fold': internalFilterbarFold }
    ]"
  >
    <el-form
      :inline="true"
      size="small"
      @submit.native.prevent
      @keydown.native.enter="handleFilterSearch"
    >
      <!-- 提交、重置按钮区域 -->
      <div
        v-if="showFilterSubmit"
        ref="submit"
        :class="[
          'filterbar__submit',
          {
            'filterbar__submit--nomore': !filterbarHasMore,
            'filterbar__submit--onleft': isNoneFields
          }
        ]"
      >
        <div
          :style="{ transform: `translateX(${searchBtnOffset}px)` }"
          class="filterbar__submit-btn"
        >
          <el-form-item>
            <slot name="prepend-filterbar-submit" />
            <el-button
              v-if="showFilterSearch"
              type="primary"
              icon="el-icon-search"
              @click="handleFilterSearch"
            >
              搜索
            </el-button>
            <el-button v-if="showFilterReset" @click="handleFilterReset">
              重置
            </el-button>
            <slot name="append-filterbar-submit" />
          </el-form-item>
        </div>
        <el-button
          :icon="
            internalFilterbarFold ? 'el-icon-caret-bottom' : 'el-icon-caret-top'
          "
          type="primary"
          class="filterbar__submit-more"
          @click="toggleFilterbar"
        />
      </div>

      <!-- 操作按钮区域 -->
      <div v-if="showFilterButtons" class="filterbar__buttons">
        <el-form-item>
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
      </div>

      <!-- 搜索栏控件区域 -->
      <filterbar-form
        v-if="showFilterFields"
        ref="filterForm"
        :fields="validFilterFields"
        :model="filterModel"
        class="filterbar__form"
      />
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import VNode from '@/components/v-node.js'
import { isVNode, isValidFieldConfig, hasOwn } from '@/utils/utils.js'
import FilterbarForm from './filterbar-form.vue'

export default {
  name: 'FilterBar',

  components: {
    VNode,
    FilterbarForm
  },

  props: {
    // TODO: validator
    filterButtons: { type: Array, default: () => [] },
    filterFields: { type: Array, default: () => [] },
    filterModel: { type: Object, default: () => ({}) },
    filterbarFold: { type: Boolean, default: true },
    showFilterSearch: { type: Boolean, default: true },
    showFilterReset: { type: Boolean, default: true }
  },

  data() {
    return {
      internalFilterbarFold: true,
      topRightFilterIndex: -1,
      searchBtnOffset: 0
    }
  },

  computed: {
    validFilterFields() {
      return this.filterFields.filter(
        field => isValidFieldConfig(field) || Array.isArray(field)
      )
    },
    isNoneFields() {
      return this.validFilterFields.length === 0
    },
    showFilterButtons() {
      return this.filterButtons.length > 0
    },
    showFilterFields() {
      return this.validFilterFields.length > 0
    },
    showFilterSubmit() {
      return (
        this.showFilterSearch ||
        this.showFilterReset ||
        this.$slots['prepend-filterbar-submit'] ||
        this.$slots['append-filterbar-submit']
      )
    },
    filterbarHasMore() {
      return (
        this.topRightFilterIndex >= 0 &&
        this.topRightFilterIndex < this.validFilterFields.length - 1
      )
    }
  },

  watch: {
    showFilterSearch() {
      this.updateLayout()
    },
    showFilterReset() {
      this.updateLayout()
    },
    filterbarFold() {
      this.internalFilterbarFold = this.filterbarFold
      this.updateLayout()
    }
  },

  mounted() {
    this.internalFilterbarFold = this.filterbarFold
    this.updateLayout()
  },

  methods: {
    isVNode,
    isFunction: _.isFunction,

    getAllFieldsDom() {
      const filterForm = this.$refs['filterForm']
      return filterForm ? filterForm.$refs.field || [] : []
    },

    applyButtonClick(item, $event) {
      if (item && _.isFunction(item.click)) {
        return item.click($event)
      }
    },

    handleFilterSearch() {
      this.$emit('filter-submit', this.filterModel)
    },

    handleFilterReset() {
      const model = this.filterModel
      const _resetField = field => {
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
      this.filterFields.forEach(field => {
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
      const allFields = this.getAllFieldsDom()
      if (allFields.length > 0) {
        let lastFilterTop = allFields[0].getBoundingClientRect().top
        let lastFilterIndex = -1
        for (let i = 0; i < allFields.length; i++) {
          // debugger
          const formItemTop = allFields[i].getBoundingClientRect().top
          if (lastFilterTop !== formItemTop) {
            break
          }
          lastFilterTop = formItemTop
          lastFilterIndex = i
        }
        this.topRightFilterIndex = lastFilterIndex
        this.updateSubmitOffset()
      }
    },

    updateSubmitOffset() {
      const allFields = this.getAllFieldsDom()
      let offset = 0
      if (this.topRightFilterIndex >= 0) {
        const originOffset = this.$refs.submit.getBoundingClientRect().left
        const lastItem = allFields[this.topRightFilterIndex]
        const { left, width } = lastItem.getBoundingClientRect()
        offset = left + width - originOffset + 10
        offset = Math.min(0, offset)
      }
      this.searchBtnOffset = Math.floor(offset)
    }
  }
}
</script>

<style lang="less">
@filter-gap-size: 10px;

.listview__filterbar {
  padding-top: @filter-gap-size;
  margin-top: -@filter-gap-size;
  margin-bottom: @filter-gap-size;

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  &--fold {
    box-sizing: content-box;
    height: 32px;
    overflow: hidden;
  }

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

  .filterbar__buttons,
  .filterbar__submit,
  .filterbar__form {
    .el-form-item,
    > * {
      margin: 0;
    }
  }

  .filterbar__submit-btn .el-button {
    float: left;
  }

  .filterbar__buttons,
  .filterbar__field {
    position: relative;
    display: inline-block;
    margin: 0 @filter-gap-size @filter-gap-size 0;
    vertical-align: top;

    .el-form-item__content {
      > *,
      > .el-input .el-input__inner,
      > .el-select .el-input__inner,
      > .el-cascader .el-input__inner {
        vertical-align: top;
      }
    }
  }

  .filterbar__field--group {
    margin: 0;
  }

  .filterbar__buttons {
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

  .filterbar__form {
    margin-bottom: -@filter-gap-size;
  }

  .filterbar__submit {
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &-btn {
      display: inline-block;

      // stylelint-disable-next-line
      .el-form-item__content > * {
        display: inline-block;
        transition: inherit;
      }
      .el-form-item__content > *:not(:nth-child(1)) {
        margin-left: 10px;
      }
    }

    &-more {
      width: 40px;
      padding: 0;
      margin-left: 10px;
      line-height: 30px;
    }

    &--nomore {
      padding-right: 50px;

      .filterbar__submit-more {
        display: none;
      }
    }

    &--onleft {
      float: inherit;
    }
  }
}
</style>
