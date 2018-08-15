<template>
  <div
    :class="[
      'list-view__filterbar',
      { 'list-view__filterbar--fold': filterbarFold }
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
              :trigger="button.trigger || 'click'">
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
                  @click="button.click || null"
                >{{ button.content }}</el-button>
              </template>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(child, index) in button.children"
                  :key="index"
                  @click.native="child.click || null">
                  {{ child.content }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              v-else
              :key="index"
              :type="button.type"
              :icon="button.icon"
              @click="button.click || null"
            >{{ button.content }}</el-button>
          </template>
        </el-form-item>
      </div>

      <!-- 提交、重置按钮区域 -->
      <div
        ref="submit"
        :class="[
          'filterbar__submit',
          { 'filterbar__submit--nomore': !filterbarHasMore }
        ]"
      >
        <div
          :style="{ transform: `translateX(${submitOffset}px)` }"
          class="filterbar__submit-btn">
          <el-form-item>
            <slot name="prepend-filterbar-submit" />
            <el-button
              type="primary"
              @click="handleFilterSubmit">搜索</el-button>
            <el-button @click="handleFilterReset">重置</el-button>
            <slot name="append-filterbar-submit" />
          </el-form-item>
        </div>
        <el-button
          :icon="filterbarFold ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
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
import VNode from '@/components/v-node.js'
import FilterForm from './filter-form.vue'
import { isVNode } from '@/utils/utils.js'

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
    filterbarFold: { type: Boolean, default: false }
  },

  data() {
    return {
      topRightFilterIndex: -1,
      submitOffset: 0
    }
  },

  computed: {
    filterbarHasMore() {
      const allFields = this.getAllFields()
      return (
        this.topRightFilterIndex &&
        this.topRightFilterIndex < allFields.length - 1
      )
    }
  },

  methods: {
    isVNode,

    handleFilterSubmit() {
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
    },

    togglerFilterbar() {
      this.$emit('update:filterbarFold', !this.filterbarFold)
    },

    getAllFields() {
      const filterForm = this.$refs['filterForm']
      return filterForm ? filterForm.$refs.field || [] : []
    },

    async updateLayout(from) {
      const allFields = this.getAllFields()
      if (allFields.length > 1) {
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
      const allFields = this.getAllFields()
      let offset = 0
      if (this.topRightFilterIndex >= 0) {
        // debugger
        const lastItem = allFields[this.topRightFilterIndex]
        const { x, width } = lastItem.getBoundingClientRect()
        offset = x + width - this.$refs.submit.getBoundingClientRect().x
        offset = Math.min(0, offset + 10)
      }
      this.submitOffset = offset
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

    .el-button + .el-dropdown {
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

    &-btn {
      display: inline-block;
    }
    &-more {
      // position: absolute;
      // top: 0;
      // right: 0;
      // display: inline-block;
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
  }
}
</style>
