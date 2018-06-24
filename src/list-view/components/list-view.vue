<template>
  <div
    :style="{
      height: fixedHeight,
      minHeight: fixedHeight && 'inherit'
    }"
    class="list-view">
    <div
      ref="main"
      class="list-view__main">
      <list-view-filterbar
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filter-schema="filterSchema"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        @filter-submit="handleFilterSubmit"
      />

      <div
        v-loading="contentLoading"
        ref="content"
        :style="{ height: `${contentHeight}px` }"
        class="list-view__content">
        <slot
          :filter-model="filterModel"
          :content-height="contentHeight"
          :content-loading="contentLoading"
          :content-response="contentResponse"
          :content-data="contentData"
        />
      </div>

      <div
        v-if="usePage"
        ref="pagination"
        class="list-view__page">
        <el-pagination
          :total="contentData.total"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import get from 'get-value'
import ListViewFilterbar from './list-view-filterbar'

const service = axios.create()

export default {
  name: 'ListView',

  components: {
    ListViewFilterbar
  },

  inheritAttrs: false,

  props: {
    // Layout
    height: { type: [String, Number], default: null },
    fullWindow: { type: Boolean, default: true },
    contentMinHeight: {
      type: Number,
      default: null,
      validator: value => value > 0
    },

    // Data request
    autoload: { type: Boolean, default: true },
    requestUrl: { type: String, default: '' },
    requestType: { type: String, default: 'get' },
    requestConfig: { type: Object, default: () => ({}) },
    requestHandler: { type: Function, default: null },
    requestTransform: { type: Function, default: null },
    requestDataMap: { type: Object, default: () => ({}) },
    responseTransform: { type: Function, default: null },
    responseDataMap: { type: Object, default: () => ({}) },

    // Filterbar
    filterButtons: { type: Array, default: () => [] },
    filterSchema: {
      type: Array,
      default: () => [],
      validator(val) {
        return true
      }
    },
    filterModel: { type: Object, default: () => ({}) },

    // Pager
    usePage: { type: Boolean, default: true },
    pageSizes: { type: Array, default: () => [20, 50, 100] },
    pageSize: { type: Number, default: 20 }
  },

  data() {
    return {
      maxHeight: null,
      contentHeight: null,
      filterbarFold: true,
      contentResponse: null,
      contentLoading: false,
      contentData: {
        data: [],
        total: 1
      },
      currentPage: 1
    }
  },

  computed: {
    contentBottomOffset() {
      const mainEl = this.$refs.main
      const bottomOffset =
        parseInt(getComputedStyle(mainEl)['padding-bottom'], 10) +
        parseInt(getComputedStyle(mainEl)['margin-bottom'], 10)
      return bottomOffset
    },
    paginationHeight() {
      const paginationEl = this.$refs.pagination
      const paginationHeight = paginationEl
        ? paginationEl.getBoundingClientRect().height
        : 0
      return paginationHeight
    },
    fixedHeight() {
      if (!this.fullWindow) {
        const height = parseInt(this.height, 10)
        return height ? `${height}px` : false
      }
      return false
    }
  },

  watch: {
    height() {
      this.initLayout()
    },
    fullWindow() {
      this.initLayout()
    },
    filterbarFold() {
      this.updateLayout()
    }
  },

  mounted() {
    this.initLayout()
    if (this.autoload) {
      this.requestData()
    }
  },

  beforeDestroy() {
    this.removeResizeHandler()
  },

  methods: {
    async initLayout() {
      // 需要 nextTick 等待 filterbar 渲染后再开始更新布局
      await this.$nextTick()
      this.updateLayout()
      this.addResizeHandler()
    },

    addResizeHandler() {
      if (this.fullWindow || this.height) {
        window.addEventListener('resize', this.updateContentHeight)
      }
      window.addEventListener('resize', this.updateFilterbarLayout)
    },

    removeResizeHandler() {
      window.removeEventListener('resize', this.updateContentHeight)
      window.removeEventListener('resize', this.updateFilterbarLayout)
    },

    /**
     * 更新所有布局数据，包括内容高度和 filterbar
     */
    updateLayout() {
      this.updateContentHeight()
      this.updateFilterbarLayout()
    },

    /**
     * 主要内容区域高度尺寸更新
     */
    async updateContentHeight() {
      if (this.fullWindow) {
        this.maxHeight = window.innerHeight
      } else if (this.height) {
        this.maxHeight = this.$el.getBoundingClientRect().height
      } else {
        this.maxHeight = null
        this.contentHeight = this.contentMinHeight
      }

      if (this.maxHeight) {
        // 有可能是 filterbar 的展开与缩起，引发的 update ，
        // 需要 nextTick 等待界面变化后再计算布局
        await this.$nextTick()
        const contentEl = this.$refs.content
        const contentTop = contentEl ? contentEl.getBoundingClientRect().top : 0
        const restHeight =
          this.maxHeight -
          contentTop -
          this.contentBottomOffset -
          this.paginationHeight
        this.contentHeight = Math.max(restHeight, this.contentMinHeight)
      }
    },

    async updateFilterbarLayout() {
      // 在 filterbar 展开一瞬间会出现滚动条，
      // 直接 updateLayout 会出现滚动条宽度尺寸的偏差，
      // 需要 nextTick 等待界面变化后再计算布局
      await this.$nextTick()
      this.$refs.filterbar.updateLayout()
    },

    // Filter
    handleFilterSubmit() {
      this.requestData()
    },

    async requestData() {
      this.contentLoading = true
      let responseData
      if (this.requestHandler) {
        responseData = await this.requestHandler()
      } else {
        // TODO: requestTransform
        const requestPayload =
          this.requestType === 'get'
            ? { params: this.filterModel }
            : { data: this.filterModel }
        // TODO: pagination
        const response = await service({
          ...this.requestConfig,
          url: this.requestUrl,
          method: this.requestType,
          ...requestPayload
        })
        responseData = response.data
      }
      this.contentLoading = false
      this.contentResponse = this.responseTransform
        ? this.responseTransform(responseData)
        : responseData

      // TODO: contentData 和 responseDataMap 的 key 需要 merge
      Object.keys(this.contentData).forEach(key => {
        const mapKey = this.responseDataMap[key] || key
        this.contentData[key] = get(this.contentResponse, mapKey)
      })
    },

    // Pagination
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>

<style lang="less">
.list-view {
  // min-width: 600px;
  overflow: auto;
  background-color: #f0f2f5;
  // max-height: 100vh;

  // &__header {
  //   padding: 16px;
  //   background-color: #fff;
  //   border-bottom: 1px solid #dcdfe6;

  //   .list-view__title {
  //     display: inline-block;
  //     padding: 0 1em 0 0;
  //     margin: 0 1em 0 0;
  //     font-size: 16px;
  //     border-right: 1px solid #dcdfe6;
  //   }
  //   .list-view__breadcrumb {
  //     display: inline-block;
  //   }
  // }

  &__main {
    padding: 10px;
    margin: 10px 10px 0;
    background-color: #fff;
  }

  &__content {
    overflow: auto;
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
    padding-right: 10px;
    padding-left: 10px;
  }
}
</style>
