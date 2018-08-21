<template>
  <div
    :class="[
      'list-view__filterbar',
      { 'list-view__filterbar--fold': internalFilterbarFold }
    ]"
  >
    <el-form
      :inline="true"
      size="small"
      submit.native.prevent>
      <!-- 操作按钮区域 -->
      <div
        v-if="filterButtons.length > 0"
        class="filterbar__buttons">
        <el-form-item>
          <template v-for="(button, index) in filterButtons">
            <v-node
              v-if="isVNode(button)"
              :key="index"
              :node="button" />
            <el-dropdown
              v-else-if="button.children"
              :key="index"
              :type="button.type"
              :split-button="button.splitButton"
              :trigger="button.trigger || 'click'"
              placement="bottom"
              @click="resolveClickEvent(button, $event)"
            >
              <template v-if="button.splitButton">
                <i
                  v-if="button.icon"
                  :class="button.icon"/>
                {{ button.content }}
              </template>
              <template v-else>
                <el-button
                  :type="button.type"
                  :icon="button.icon"
                  @click="resolveClickEvent(button, $event)"
                >{{ button.content }}<i class="el-icon-arrow-down el-icon--right"/></el-button>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(child, index) in button.children"
                  :key="index"
                  @click.native="resolveClickEvent(child, $event)">
                  {{ child.content }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              v-else
              :key="index"
              :type="button.type"
              :icon="button.icon"
              @click="resolveClickEvent(button, $event)"
            >{{ button.content }}</el-button>
          </template>
        </el-form-item>
      </div>

      <!-- 提交、重置按钮区域 -->
      <div
        v-if="showFilterbarSubmit"
        ref="submit"
        :class="[
          'filterbar__submit',
          {
            'filterbar__submit--nomore': !filterbarHasMore,
            'filterbar__submit--onleft': noneFields
          }
        ]"
      >
        <div
          :style="{ transform: `translateX(${searchBtnOffset}px)` }"
          class="filterbar__submit-btn">
          <el-form-item>
            <slot name="prepend-filterbar-submit" />
            <el-button
              v-if="showFilterSearch"
              type="primary"
              @click="handleFilterSearch">搜索</el-button>
            <el-button
              v-if="showFilterReset"
              @click="handleFilterReset">重置</el-button>
            <slot name="append-filterbar-submit" />
          </el-form-item>
        </div>
        <el-button
          :icon="internalFilterbarFold ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          type="primary"
          class="filterbar__submit-more"
          @click="togglerFilterbar"
        />
      </div>

      <!-- 搜索栏控件区域 -->
      <filter-form
        ref="filterForm"
        :fields="filterFields"
        :model="filterModel"
        class="filterbar__form"
      />
    </el-form>
  </div>
</template>

<script>
import _ from 'lodash'
import VNode from '@/components/v-node.js'
import { isVNode } from '@/utils/utils.js'
import FilterForm from './filter-form.vue'

export default {
  name: 'FilterBar',

  components: {
    VNode,
    FilterForm
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
    filterbarHasMore() {
      return (
        this.topRightFilterIndex >= 0 &&
        this.topRightFilterIndex < this.filterFields.length - 1
      )
    },
    showFilterbarSubmit() {
      return (
        this.showFilterSearch ||
        this.showFilterReset ||
        this.$slots['prepend-filterbar-submit'] ||
        this.$slots['append-filterbar-submit']
      )
    },
    noneFields() {
      return this.filterFields.length === 0
    }
  },

  mounted() {
    this.internalFilterbarFold = this.filterbarFold
    this.updateLayout()
  },

  methods: {
    isVNode,

    getAllFieldsDom() {
      const filterForm = this.$refs['filterForm']
      return filterForm ? filterForm.$refs.field || [] : []
    },

    resolveClickEvent(item, $event) {
      if (item && item.click && _.isFunction(item.click)) {
        return item.click($event)
      }
    },

    handleFilterSearch() {
      this.$emit('filter-submit', this.filterModel)
    },

    handleFilterReset() {
      const model = this.filterModel
      this.filterFields.forEach(field => {
        const name = field.model
        if (name && model.hasOwnProperty(name)) {
          const value = model[name]
          if (Array.isArray(value)) {
            this.$set(model, name, [])
          } else {
            this.$set(model, name, undefined)
          }
        }
      })
      this.$emit('filter-reset', this.filterModel)
    },

    togglerFilterbar() {
      this.internalFilterbarFold = !this.internalFilterbarFold
      this.$emit('update:filterbarFold', this.internalFilterbarFold)
    },

    async updateLayout(from) {
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
        await this.$nextTick()
        this.updateSubmitOffset()
      }
    },

    updateSubmitOffset() {
      const allFields = this.getAllFieldsDom()
      let offset = 0
      if (this.topRightFilterIndex >= 0) {
        // debugger
        const lastItem = allFields[this.topRightFilterIndex]
        const { x, width } = lastItem.getBoundingClientRect()
        offset = x + width - this.$refs.submit.getBoundingClientRect().x
        offset = Math.min(0, offset + 10)
      }
      this.searchBtnOffset = offset
    }
  }
}
</script>

<style lang="less">
@filter-gap-size: 10px;

.list-view__filterbar {
  padding-top: @filter-gap-size;
  margin-top: -@filter-gap-size;
  margin-bottom: @filter-gap-size;

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  &--fold {
    height: 32px;
    overflow: hidden;
  }

  .el-button {
    [class*=' el-icon-'],
    [class^='el-icon-'] {
      width: 1em;
    }

    padding-top: 0;
    padding-bottom: 0;
    line-height: 30px;
    vertical-align: top;
  }

  .filterbar__buttons,
  .filterbar__submit,
  .filterbar__form {
    .el-form-item,
    > * {
      margin: 0;
    }
  }

  .filterbar__buttons {
    float: left;

    .el-button + .el-dropdown,
    .el-dropdown + .el-button,
    .el-dropdown + .el-dropdown,
    .el-form-item__content > *:not(:nth-child(1)) {
      margin-left: @filter-gap-size;
    }
  }

  .filterbar__buttons,
  .filterbar__field {
    position: relative;
    display: inline-block;
    margin: 0 10px @filter-gap-size 0;
    vertical-align: top;
  }

  .filterbar__field {
    .el-input__inner {
      vertical-align: top;
    }
  }

  .filterbar__form {
    margin-bottom: -@filter-gap-size;
  }

  .filterbar__submit {
    position: relative;
    float: right;
    margin: 0;
    margin-bottom: 10px;

    &-btn {
      display: inline-block;

      .el-form-item__content > *:not(:nth-child(1)) {
        display: inline-block;
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
