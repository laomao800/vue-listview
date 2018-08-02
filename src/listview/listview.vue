<template>
  <div
    :style="{
      height: fixedHeight,
      minHeight: fixedHeight && 'inherit'
    }"
    class="listview">

    <listview-header
      :title="headerTitle"
      :nav="headerNav" />

    <div
      ref="main"
      class="listview__main">
      <filterbar
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filter-fields="filterFields"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        @filter-submit="handleFilterSubmit"
      >
        <template slot="append-filterbar-submit">
          <slot name="append-filterbar-submit" />
        </template>
        <template slot="prepend-filterbar-submit">
          <slot name="prepend-filterbar-submit" />
        </template>
      </filterbar>

      <div v-loading="contentLoading">
        <div
          ref="content"
          :style="{ height: `${contentHeight}px` }"
          class="listview__content">
          <slot
            :filter-model="filterModel"
            :content-height="contentHeight"
            :content-loading="contentLoading"
            :content-data="contentData"
          >
            <!-- eslint-disable vue/attributes-order vue/max-attributes-per-line -->
            <el-table
              ref="contentTable"
              :data="contentData.items"
              :height="contentHeight"
              :style="{ width: '100%' }"
              :row-class-name="contentTableRowClassName"
              border
              stripe
              size="small"
              class="data-content__table"
              @row-click="handleRowClick"
              @selection-change="handleListSelectionChange">
              <el-table-column type="selection" width="50" align="center" prop="id" />
              <el-table-column label="自定义标签" prop="sku" align="center" width="100" fixed />
              <el-table-column label="产品名称" prop="name" width="200" fixed />
              <el-table-column label="操作" width="150" align="center" fixed>
                <template slot-scope="prop">
                  <el-button style="padding:4px 8px" size="mini" type="success">审核</el-button>
                  <el-button style="padding:4px 8px" size="mini" type="danger">删除</el-button>
                </template>
              </el-table-column>
              <el-table-column label="销售员" prop="seller" align="center" />
              <el-table-column label="仓库" prop="warehouse" align="center" />
              <el-table-column label="零售价格" prop="sale_price" align="center" />
              <el-table-column label="折扣率" prop="discount" align="center" :formatter="(row) => row.discount.toFixed(2)" />
              <el-table-column label="折后价" align="center" :formatter="(row) => (row.discount * row.sale_price).toFixed(2)" />
              <el-table-column label="折扣时间" align="center">
                <el-table-column label="折扣开始" prop="date" align="center" />
                <el-table-column label="折扣结束" prop="date" align="center" />
              </el-table-column>
              <el-table-column label="数量" prop="quantity" align="center" />
              <el-table-column label="是否启用" prop="enable" align="center">
                <template slot-scope="prop">
                  <div v-if="prop.row.enable" size="mini" type="success">启用</div>
                  <div v-else size="mini" type="danger">禁用</div>
                </template>
              </el-table-column>
              <el-table-column label="创建人" prop="seller" align="center" />
              <el-table-column label="创建时间" prop="date" align="center" />
              <el-table-column label="最后修改" align="center">
                <el-table-column label="修改人" prop="seller" align="center" />
                <el-table-column label="修改时间" prop="date" align="center" />
              </el-table-column>
            </el-table>
          </slot>
        </div>

        <div
          v-if="usePage"
          ref="pagination"
          class="listview__page">
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
  </div>
</template>

<script>
import axios from 'axios'
import get from 'get-value'
import Filterbar from './components/filterbar'
import ListviewHeader from './components/listview-header.vue'

const service = axios.create()

export default {
  name: 'Listview',

  components: {
    Filterbar,
    ListviewHeader
  },

  inheritAttrs: false,

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },

    // Layout
    height: { type: [String, Number], default: null },
    fullWindow: { type: Boolean, default: true },
    contentMinHeight: {
      type: Number,
      default: 200,
      validator: value => value > 0
    },

    // Data request
    autoload: { type: Boolean, default: true },
    requestUrl: { type: String, default: '' },
    requestType: { type: String, default: 'get' },
    requestConfig: { type: Object, default: () => ({}) },
    requestHandler: { type: Function, default: null },
    transformRequestData: { type: Function, default: null },
    transformResponseData: { type: Function, default: null },
    transformContentData: {
      type: Function,
      default(responseData) {
        return {
          items: get(responseData, 'result.items') || [],
          total: get(responseData, 'result.total') || 0
        }
      }
    },

    // Filterbar
    filterButtons: { type: Array, default: () => [] },
    filterFields: {
      type: Array,
      default: () => [],
      validator(val) {
        // TODO: filter field validator
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
      contentLoading: false,
      contentData: {
        items: [],
        total: 1
      },
      listSelection: [],
      currentPage: 1,
      currentPageSize: this.pageSize
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
        // 多次点击“搜索”会取消前面的请求，以最后一次的请求为准
        this._requestCancelToken && this._requestCancelToken()

        const payloadData = {
          ...this.filterModel,
          page: this.currentPage,
          pageSize: this.pageSize
        }
        const requestData = this.transformRequestData
          ? this.transformRequestData(payloadData)
          : payloadData

        const requestConfig = {
          ...this.requestConfig,
          url: this.requestUrl,
          method: this.requestType,
          cancelToken: new axios.CancelToken(cancel => {
            this._requestCancelToken = cancel
          })
        }
        if (requestConfig === 'get') {
          requestConfig.params = requestData
        } else {
          requestConfig.data = requestData
        }
        try {
          const response = await service(requestConfig)
          responseData = response.data
        } catch (e) {}
      }

      this.contentLoading = false

      const contentResponse = this.transformResponseData
        ? this.transformResponseData(responseData)
        : responseData
      const contentData = this.transformContentData
        ? this.transformContentData(contentResponse)
        : contentResponse

      this.contentData = contentData
    },

    // Table
    handleRowClick(row) {
      this.$refs.contentTable.toggleRowSelection(row)
    },
    handleListSelectionChange(val) {
      this.listSelection = val
    },
    contentTableRowClassName(row) {
      return this.listSelection.indexOf(row.row) > -1 ? 'row-selected' : ''
    },

    // Pagination
    handleSizeChange(pageSize) {
      this.currentPageSize = pageSize
      this.currentPage = 1
      this.requestData()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.requestData()
    }
  }
}
</script>

<style lang="less">
.listview {
  overflow: auto;
  background-color: #f0f2f5;

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
