<template>
  <div :class="['listview__filterbar', {
    'listview__filterbar--fold': filterbarFold
  }]">
    <el-form
      ref="filterForm"
      :model="filterModel"
      :inline="true"
      size="small"
      submit.native.prevent>
      <div class="filterbar__buttons">
        <el-form-item>
          <render-vnode v-for="(button, index) in filterButtons" :key="index" :vnode="button" />
        </el-form-item>
      </div>
      <div :class="['filterbar__form-submit', {
        'filterbar__form-submit--hasmore': filterbarHasMore
      }]" ref="submit">
        <div :style="{ transform: `translateX(${submitOffset}px)` }">
          <el-form-item>
            <el-button type="primary" @click="handleFilterSubmit">搜索</el-button>
            <el-button @click="filterReset">重置</el-button>
          </el-form-item>
        </div>
        <el-button
          type="primary"
          :icon="filterbarFold ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          class="filterbar__form-more-btn"
          @click="togglerFilterbar"
        />
      </div>
      <div class="filterbar__items">
        <list-view-filterbar-item class="form-item"
          v-for="(filter, index) in showingFilters"
          ref="form-item"
          :key="index"
          :model="filterModel"
          :filter="filter"
        />
      </div>
    </el-form>
  </div>
</template>

<script>
import throttle from 'throttle-debounce/throttle'
import deepmerge from 'deepmerge'
import RenderVnode from './render-vnode.js'
import ListViewFilterbarItem from './list-view-filterbar-item.vue'

const FILTER_PRESET = {
  input: {},
  select: {},
  multipleSelect: {
    componentProps: {
      multiple: true,
      collapseTags: true
    }
  },
  date: {
    width: 150,
    componentProps: {
      type: 'date'
    }
  },
  dateRange: {
    width: 250,
    componentProps: {
      type: 'daterange'
    }
  }
}

export default {
  name: 'ListViewFilterbar',

  components: {
    RenderVnode,
    ListViewFilterbarItem
  },

  props: {
    filterModel: { type: Object, default: () => ({}) },
    filterButtons: { type: Array, default: () => [] },
    filters: { type: Array, default: () => [] },
    filterbarFold: { type: Boolean, default: false }
  },

  data () {
    return {
      test: true,
      topRightFilterIndex: null,
      submitOffset: 0
    }
  },

  computed: {
    // 获取在预设中存在的控件，并配置了 model 属性的合法 filter 配置
    showingFilters () {
      const result = []
      this.filters.forEach((filter) => {
        const filterConfig = FILTER_PRESET[filter.type]
        if (filterConfig && filter.model) {
          result.push({
            ...filterConfig,
            ...filter,
            componentProps: deepmerge(
              filterConfig.componentProps || {},
              filter.componentProps || {}
            ),
            tag: filterConfig.tag
          })
        }
      })
      return result
    },
    filterbarHasMore () {
      return this.topRightFilterIndex && this.topRightFilterIndex < this.showingFilters.length - 1
    }
  },

  watch: {
    async filterbarHasMore (val) {
      await this.$nextTick()
      this.updateLayout()
    }
  },

  mounted () {
    this.updateLayout()
    window.addEventListener('resize', this.updateLayout)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateLayout)
  },

  methods: {
    handleFilterSubmit () {
      this.$emit('submit', this.filterModel)
    },

    filterReset () {},

    togglerFilterbar () {
      this.$emit('update:filterbarFold', !this.filterbarFold)
    },

    updateLayout: throttle(100, function () {
      // update submit button offset
      const formItems = this.$refs['form-item']
      if (formItems) {
        let lastFilterTop = this.$el.getBoundingClientRect().top
        let lastFilterIndex = -1
        for (const index in formItems) {
          const formItemTop = formItems[index].$el.getBoundingClientRect().top
          if (lastFilterTop !== formItemTop) {
            break
          }
          lastFilterTop = formItemTop
          lastFilterIndex = index
        }
        if (lastFilterIndex >= 0) {
          const { x, width } = formItems[lastFilterIndex].$el.getBoundingClientRect()
          const offset = (x + width) - this.$refs.submit.getBoundingClientRect().x
          this.submitOffset = offset + 10
        }
        this.topRightFilterIndex = lastFilterIndex
      }
    })
  }
}
</script>

<style lang="less">
.listview__filterbar {
  margin-bottom: 16px;

  &::after {
    content: '';
    display: table;
    clear: both;
  }

  &--fold {
    height: 32px;
    overflow: hidden;
  }

  .el-button {
    [class*=" el-icon-"],
    [class^=el-icon-] {
      width: 1em;
    }
  }

  .filterbar__buttons,
  .filterbar__form-submit,
  .form-item {
    .el-form-item,
    > * {
      margin: 0;
    }
    display: inline-block;
    margin: 0 10px 16px 0;
    position: relative;
  }
  .filterbar__buttons {
    float: left;
  }
  .filterbar__form-submit {
    float: right;
    margin: 0;
    position: relative;
  }
  .filterbar__buttons,
  .filterbar__form-submit {
    button {
      line-height: 30px;
      padding-top: 0;
      padding-bottom: 0;
      vertical-align: top;
    }
  }
  .filterbar__form-submit {
    .filterbar__form-more-btn {
      display: none;
      padding: 0;
      line-height: 30px;
      width: 40px;
      position: absolute;
      top: 0;
      right: 0;
    }
    &--hasmore {
      padding-right: 50px;
      .filterbar__form-more-btn {
        display: inline-block;
      }
    }
  }
  .filterbar__items {
    margin-bottom: -16px;
    &::after {
      content: '';
      display: table;
      clear: both;
    }
  }
}
</style>
