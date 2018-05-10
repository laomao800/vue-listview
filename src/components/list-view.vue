<template>
  <div class="listview" :style="{
    height,
    minHeight: height && 'inherit'
  }">
    <div class="listview__header" v-if="title || breadcrumb.length > 0">
      <h1 class="listview__title">{{ title }}</h1>
      <el-breadcrumb separator="/" class="listview__breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index" :to="item.to">{{ item.text }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="listview__main" ref="main">
      <list-view-filterbar
        v-if="filterButtons.length > 0 || filters.length > 0"
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filters="filters"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        @submit="handleFilterSubmit"
      />

      <div class="listview__content" ref="content" v-loading="loading" :style="{ height: `${contentHeight}px` }">
        <slot
          :filter="filterModel"
          :data="data"
          :height="contentHeight"
          :total="total"
          :currentPage="currentPage"
        />
      </div>

      <div class="listview__page" ref="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import get from 'get-value'
import ListViewFilterbar from './list-view-filterbar.vue'

const service = axios.create()
const filterModel = {}

export default {
  name: 'ListView',

  inheritAttrs: false,

  components: {
    ListViewFilterbar
  },

  props: {
    title: { type: String },
    breadcrumb: { type: Array, default: () => [] },

    filterButtons: { type: Array, default: () => [] },
    filters: { type: Array, default: () => [] },

    height: { type: [String, Number] },
    fitToWindowHeight: { type: Boolean, default: true },
    contentMinHeight: { type: Number, default: 200, validator: value => value > 0 },

    pageSizes: { type: Array, default: () => [20, 50, 100] },
    pageSize: { type: Number, default: 20 },

    // Data request
    requestUrl: { type: String, default: '' },
    requestType: { type: String, default: 'get' },
    requestConfig: { type: Object, defulat: () => ({}) },
    requestHandler: { type: Function },
    requestDataMap: { type: Object, default: () => ({}) },
    responseDataMap: { type: Object, default: () => ({}) },
    autoload: { type: Boolean, default: true }
  },

  data () {
    return {
      maxHeight: null,
      contentHeight: null,
      filterModel,
      filterbarFold: true,
      loading: false,
      data: [],
      total: 1,
      currentPage: 1
    }
  },

  computed: {
    contentBottomOffset () {
      const mainEl = this.$refs.main
      const bottomOffset = parseInt(getComputedStyle(mainEl)['padding-bottom'], 10) + parseInt(getComputedStyle(mainEl)['margin-bottom'], 10)
      return bottomOffset
    },
    paginationHeight () {
      const paginationEl = this.$refs.pagination
      const paginationHeight = paginationEl ? paginationEl.getBoundingClientRect().height : 0
      return paginationHeight
    }
  },

  watch: {
    height () {
      this.initLayout()
    },
    fitToWindowHeight () {
      this.initLayout()
    },
    filterbarFold () {
      this.updateLayout()
    }
  },

  beforeCreate () {
    const invalidFilters = []
    this.$options.propsData.filters.forEach((filter) => {
      if (filter.model) {
        filterModel[filter.model] = filter.value
      } else {
        invalidFilters.push(filter)
      }
    })
    if (invalidFilters.length > 0) {
      console.group('[Filter Error] 以下数据项缺少 "model" 属性')
      invalidFilters.forEach((item) => {
        console.warn(JSON.stringify(item))
      })
      console.groupEnd()
    }
  },

  mounted () {
    this.initLayout()
    if (this.autoload) {
      this.requestData()
    }
  },

  beforeDestroy () {
    this.removeResizeHandler()
  },

  methods: {
    // Layout
    async initLayout () {
      await this.updateLayout()
      if (this.maxHeight) {
        this.addResizeHandler()
      } else {
        this.removeResizeHandler()
      }
    },
    async updateLayout () {
      // filterbar
      if (this.$refs.filterbar) {
        this.$refs.filterbar.updateLayout()
      }

      // 主要内容区域高度尺寸更新
      await this.$nextTick()
      if (this.height) {
        this.maxHeight = this.$el.getBoundingClientRect().height
      } else if (this.fitToWindowHeight) {
        this.maxHeight = window.innerHeight
      } else {
        this.maxHeight = null
      }
      this.updateContentHeight()
    },
    updateContentHeight () {
      if (this.maxHeight) {
        const contentEl = this.$refs.content
        const contentTop = contentEl ? contentEl.getBoundingClientRect().top : 0
        const restHeight = this.maxHeight - contentTop - this.contentBottomOffset - this.paginationHeight
        this.contentHeight = Math.max(restHeight, this.contentMinHeight)
      }
    },
    addResizeHandler () {
      window.addEventListener('resize', this.updateLayout)
    },
    removeResizeHandler () {
      window.removeEventListener('resize', this.updateLayout)
    },

    // Pagination
    handleSizeChange () {},
    handleCurrentChange () {},

    // Filter
    handleFilterSubmit (model) {
      this.$emit('filter-submit', JSON.stringify(model))
    },

    async requestData () {
      this.loading = true
      let dataRes
      if (this.requestHandler) {
        dataRes = await this.requestHandler()
      } else {
        const response = await service({
          ...this.requestConfig,
          url: this.requestUrl,
          type: this.requestType
        })
        dataRes = response.data
      }
      this.loading = false
      this.data = get(dataRes, this.responseDataMap.data || 'data')
      this.total = get(dataRes, this.responseDataMap.total || 'total')
    }
  }
}
</script>

<style lang="less">
.listview {
  background-color: #f0f2f5;
  min-height: 100vh;
  // min-width: 600px;
  overflow: auto;

  &__header {
    padding: 16px;
    background-color: #fff;
    border-bottom: 1px solid #DCDFE6;

    .listview__title {
      margin: 0 1em 0 0;
      padding: 0 1em 0 0;
      font-size: 16px;
      border-right: 1px solid #DCDFE6;
      display: inline-block;
    }
    .listview__breadcrumb {
      display: inline-block;
    }
  }

  &__main {
    margin: 16px 16px 0;
    padding: 16px 16px 10px;
    background-color: #fff;
  }

  &__page {
    padding-top: 10px;
  }

  // Element-ui overwrite
  .el-pagination {
    &.is-background {
      .btn-next,
      .btn-prev,
      .el-pager li {
        margin: 0 8px 0 0;
      }
      .el-select .el-input {
        margin: 0;
      }
    }
  }
  .el-table--border .el-table-column--selection .cell {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
