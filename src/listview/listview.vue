<template>
  <div
    :style="{
      height: fixedHeight,
      minHeight: fixedHeight && 'inherit'
    }"
    class="listview">

    <listview-header
      :title="headerTitle"
      :nav="headerNav"
    />

    <div
      ref="main"
      class="listview__main">
      <filterbar
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filter-fields="validFilterFields"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        :show-filter-submit="showFilterSearch"
        :show-filter-reset="showFilterReset"
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
            :content-message="internalContentMessage"
          >
            <el-table
              ref="contentTable"
              :data="contentData.items"
              :height="contentHeight"
              :style="{ width: '100%' }"
              :row-class-name="contentTableRowClassName"
              v-bind="validTableProps"
              @selection-change="handleTableSelectionChange"
              @row-click="handleRowClick"
              v-on="validTableEvents"
            >

              <template
                v-if="internalContentMessage"
                slot="empty">
                <div
                  :class="[
                    'content-message',
                    { [`content-message--${internalContentMessage.type}`]: internalContentMessage.type }
                  ]"
                >
                  <div
                    v-if="internalContentMessage.icon"
                    class="content-message--icon">
                    <i :class="internalContentMessage.icon"/>
                  </div>
                  <div class="content-message--message">{{ internalContentMessage.message }}</div>
                </div>
              </template>

              <el-table-column
                v-if="tableSelectEnable"
                type="selection"
                width="50"
                align="center"
              />

              <template v-for="(column, index) in tableColumns">
                <v-node
                  :key="index"
                  :node="renderTableColumn(column)"
                />
              </template>

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
import _ from 'lodash'
import axios from 'axios'
import get from 'get-value'
import { isVNode } from '@/utils/utils.js'
import { getFieldComponentName } from '@/components/fields'
import VNode from '@/components/v-node'
import Filterbar from '@/listview/components/filterbar'
import ListviewHeader from '@/listview/components/listview-header.vue'

const axiosService = axios.create()

export default {
  name: 'Listview',

  components: {
    VNode,
    Filterbar,
    ListviewHeader
  },

  inheritAttrs: false,

  props: {
    // Header
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },

    // Layout
    height: { type: [String, Number], default: null },
    fullHeight: { type: Boolean, default: true },
    contentMinHeight: {
      type: [String, Number],
      default: 160,
      validator: value => parseInt(value, 10) >= 0
    },

    // Data request
    autoLoad: { type: Boolean, default: true },
    requestUrl: { type: String, default: '' },
    requestType: { type: String, default: 'get' },
    requestConfig: { type: Object, default: () => ({}) },
    requestHandler: { type: Function, default: null },
    transformRequestData: { type: Function, default: null },
    transformResponseData: { type: Function, default: null },
    transformContentData: {
      type: Function,
      default(responseData) {
        let items
        let itemsKey = 'result.items'
        try {
          itemsKey = this.contentDataMap.items.toString()
        } catch (e) {}
        items = get(responseData, itemsKey) || []

        let total
        let totalKey = 'result.total'
        try {
          totalKey = this.contentDataMap.total.toString()
        } catch (e) {}
        total = get(responseData, totalKey) || 0

        return { items, total }
      }
    },
    contentDataMap: {
      type: Object,
      default: () => ({
        items: 'result.items',
        total: 'result.total'
      })
    },
    validateResponse: {
      type: Function,
      default(response) {
        try {
          return response.data.is_success
        } catch (e) {
          return false
        }
      }
    },
    resolveRequestErrorMessage: {
      type: Function,
      default(response) {
        try {
          return response.data.error_info.msg
        } catch (e) {
          return '未知错误'
        }
      }
    },
    contentMessage: { type: Object, default: () => ({}) },

    // Filterbar
    // TODO: validator
    filterButtons: { type: Array, default: () => [] },
    filterFields: { type: Array, default: () => [] },
    filterModel: { type: Object, default: () => ({}) },
    showFilterSearch: { type: Boolean, default: true },
    showFilterReset: { type: Boolean, default: true },

    // Table
    tableColumns: { type: Array, default: () => [] },
    tableProps: { type: Object, default: () => ({}) },
    tableEvents: { type: Object, default: () => ({}) },
    tableSelectEnable: { type: Boolean, default: true },
    tableSelection: { type: Array, default: () => [] },

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
      validFilterFields: [],
      contentLoading: false,
      contentData: {
        items: [],
        total: 1
      },
      internalContentMessage: null,
      internalListSelection: [],
      currentPage: 1,
      currentPageSize: this.pageSize
    }
  },

  computed: {
    contentBottomOffset() {
      const mainEl = this.$refs.main
      const bottomOffset =
        parseInt(getComputedStyle(mainEl)['padding-bottom'], 10) +
        parseInt(getComputedStyle(mainEl)['margin-bottom'], 10) +
        parseInt(getComputedStyle(mainEl)['border-bottom-width'], 10)
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
      if (this.height) {
        const isPercent = /\d+%/.test(this.height)
        const height = parseInt(this.height, 10)
        return height ? (isPercent ? `${height}%` : `${height}px`) : false
      }
      return false
    },
    validTableEvents() {
      // 对传入的 tableEvents 的 key 统一转换为横线分隔格式
      return _.mapKeys(this.tableEvents, (value, key) => _.kebabCase(key))
    },
    validTableProps() {
      const defaultProps = {
        size: 'small',
        border: true,
        stripe: true
      }
      return _.merge(defaultProps, this.tableProps)
    }
  },

  watch: {
    height() {
      this.initLayout()
    },
    fullHeight() {
      this.initLayout()
    },
    filterbarFold() {
      this.updateLayout()
    }
  },

  created() {
    this.validFilterFields = this.filterFields.filter(field => {
      return isVNode(field) || getFieldComponentName(field.type)
    })
  },

  mounted() {
    this.initLayout()
    if (this.autoLoad) {
      this.requestData()
    }
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.updateContentHeight)
    window.removeEventListener('resize', this.updateFilterbarLayout)
  },

  methods: {
    async initLayout() {
      console.log('initLayout')
      // 需要 nextTick 等待 filterbar 渲染后再开始更新布局
      await this.$nextTick()
      this.updateLayout()

      if (this.fullHeight) {
        window.addEventListener('resize', this.updateContentHeight)
      } else {
        window.removeEventListener('resize', this.updateContentHeight)
      }
      if (this.validFilterFields.length > 0) {
        window.addEventListener('resize', this.updateFilterbarLayout)
      } else {
        window.removeEventListener('resize', this.updateFilterbarLayout)
      }
    },

    /**
     * 更新所有布局数据，包括内容高度和 filterbar
     */
    updateLayout() {
      this.updateContentHeight()
      this.updateFilterbarLayout()
    },

    /**
     * 更新主要内容区域高度尺寸
     */
    async updateContentHeight() {
      if (this.fixedHeight) {
        this.maxHeight = this.$el.getBoundingClientRect().height
      } else if (this.fullHeight) {
        this.maxHeight = window.innerHeight
      } else {
        this.maxHeight = null
        this.contentHeight = parseInt(this.contentMinHeight, 10)
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

    /**
     * 更新 filterbar “搜索” 按钮位置信息
     */
    async updateFilterbarLayout() {
      // 在 filterbar 展开一瞬间会出现滚动条，
      // 直接 updateLayout 会出现滚动条宽度尺寸的偏差，
      // 需要 nextTick 等待界面变化后再计算布局
      await this.$nextTick()
      this.$refs.filterbar.updateLayout()
    },

    handleFilterSubmit() {
      this.requestData()
    },

    async requestData() {
      this.contentLoading = true

      let responseData = null
      if (this.requestHandler) {
        responseData = await this.requestHandler()
      } else if (this.requestUrl) {
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
          const response = await axiosService(requestConfig)
          if (this.validateResponse(response)) {
            responseData = response.data
          } else {
            this.setContentMessage(
              this.resolveRequestErrorMessage(response),
              'error'
            )
          }
        } catch (e) {
          this.setContentMessage(e.message, 'error')
        }
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

    /**
     * Table
     */
    handleRowClick(row, event) {
      this.$refs.contentTable.toggleRowSelection(row)
    },
    handleTableSelectionChange(val) {
      this.internalListSelection = val
      this.$emit('update:tableSelection', this.internalListSelection)
    },
    contentTableRowClassName(row) {
      return this.tableSelection.indexOf(row.row) > -1 ? 'row--selected' : ''
    },
    renderTableColumn(tableColumn) {
      const _createColumn = column => {
        const { defaultSlot, children, ...props } = column

        const VNodeData = { props }
        if (defaultSlot) {
          VNodeData.scopedSlots = {
            default: defaultSlot
          }
        }

        const VNodeChildren = Array.isArray(children)
          ? children.map(child => _createColumn(child))
          : null

        return this.$createElement('el-table-column', VNodeData, VNodeChildren)
      }

      // TODO: tableColumn validator
      return _.isPlainObject(tableColumn) ? _createColumn(tableColumn) : null
    },
    setContentMessage(message = '', type) {
      const iconMap = {
        success: 'el-icon-success',
        warning: 'el-icon-warning',
        info: 'el-icon-info',
        error: 'el-icon-error'
      }
      const icon = iconMap[type] || null

      this.internalContentMessage = {
        type,
        icon,
        message
      }
    },

    /**
     * Pagination
     */
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

  .el-table .el-table__body tr.el-table__row.row--selected td {
    background-color: #ffd;
  }

  &__main {
    padding: 10px;
    background-color: #fff;
    border: 5px solid #f0f2f5;
  }

  &__content {
    overflow: auto;
  }

  .content-message {
    display: flex;
    padding: 15px 20px;
    line-height: 30px;
    border-radius: 5px;
    box-shadow: 0 0 15px #ddd;

    &--icon {
      margin-right: 10px;
      font-size: 24px;
    }

    &--message {
      font-size: 14px;
    }

    &--success .content-message--icon {
      color: #6ac243;
    }

    &--warning .content-message--icon {
      color: #f90;
    }

    &--info .content-message--icon {
      color: #459ffc;
    }

    &--error .content-message--icon {
      color: #f56c6c;
    }
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
