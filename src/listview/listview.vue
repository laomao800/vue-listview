<template>
  <div
    :style="{
      height: fixedHeight,
      minHeight: fixedHeight && 'inherit'
    }"
    class="listview"
  >
    <listview-header
      :title="headerTitle"
      :nav="headerNav"
    />

    <div
      ref="main"
      class="listview__main"
    >
      <filterbar
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filter-fields="filterFields"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        :show-filter-search="showFilterSearch"
        :show-filter-reset="showFilterReset"
        @filter-submit="handleFilterSubmit"
        @filter-reset="handleFilterReset"
      >
        <template slot="prepend-filterbar-submit">
          <slot name="prepend-filterbar-submit" />
        </template>
        <template slot="append-filterbar-submit">
          <slot name="append-filterbar-submit" />
        </template>
      </filterbar>

      <div v-loading="contentLoading">
        <div
          ref="content"
          :style="{ height: `${contentHeight}px` }"
          class="listview__content"
        >
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
                slot="empty"
              >
                <span
                  :class="[
                    'content-message',
                    { [`content-message--${internalContentMessage.type}`]: internalContentMessage.type }
                  ]"
                >
                  <span
                    v-if="internalContentMessage.icon"
                    class="content-message--icon"
                  >
                    <i :class="internalContentMessage.icon" />
                  </span>
                  <span class="content-message--message">{{ internalContentMessage.message }}</span>
                </span>
              </template>

              <el-table-column
                v-if="tableSelectEnable === 'single'"
                :fixed="tableColumns.some(col => col.fixed)"
                :resizable="false"
                width="50"
                align="center"
                class-name="table-column--single-selection"
              >
                <template slot-scope="{ row }">
                  <el-radio
                    :value="tableSelection.indexOf(row) > -1 ? '' : false"
                    label=""
                    @click.native.stop.prevent="($event) => handleRowClick(row, $event)"
                  />
                </template>
              </el-table-column>

              <el-table-column
                v-else-if="!!tableSelectEnable"
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
          class="listview__page"
        >
          <el-pagination
            :total="contentData.total"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            background
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import get from 'get-value'
import VNode from '@/components/v-node'
import ListviewHeader from '@/components/listview-header.vue'
import Filterbar from '@/listview/components/filterbar.vue'
import {
  camelCaseObjectKey,
  snakeCaseObjectKey,
  pascalCaseObjectKey
} from '@/utils/utils'

const axiosService = axios.create()

function transformContentData(data = {}, dataMap = {}) {
  const result = {}
  const keysMap = Object.keys(dataMap)

  keysMap.forEach(key => {
    try {
      const dataKey = key.toString()
      const dataValue = get(data, dataMap[key])
      result[dataKey] = dataValue
    } catch (e) {}
  })

  return result
}

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
    autoload: { type: Boolean, default: true },
    requestUrl: { type: String, default: '' },
    requestMethod: { type: String, default: 'get' },
    requestConfig: { type: Object, default: () => ({}) },
    requestDataKeyCase: {
      type: String,
      default: null,
      validator: value =>
        ['camelCase', 'snakeCase', 'pascalCase'].indexOf(value) > -1
    },

    // Adv request
    requestHandler: { type: Function, default: null },
    transformRequestData: { type: Function, default: null },

    // Adv response
    transformResponseData: { type: Function, default: null },
    contentDataMap: {
      type: Object,
      default: () => ({
        items: 'result.items',
        total: 'result.total'
      })
    },

    // Request error handler
    contentMessage: { type: [Object, String], default: null },
    validateResponse: {
      type: Function,
      default: /* istanbul ignore next */ function(response) {
        try {
          return response.data.is_success
        } catch (e) {
          return false
        }
      }
    },
    resolveResponseErrorMessage: {
      type: Function,
      default: /* istanbul ignore next */ function(response) {
        try {
          return response.data.error_info.msg
        } catch (e) {
          return '未知错误'
        }
      }
    },

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
    tableSelectEnable: { type: [Boolean, String], default: true },
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
      contentLoading: false,
      contentData: {
        items: [],
        total: 0
      },
      internalContentMessage: null,
      internalListSelection: [],
      currentPage: 1,
      currentPageSize: this.pageSize
    }
  },

  computed: {
    /**
     * 内容区域垂直铺满屏幕后需要减去的距离，包括了可能的装饰性留白的内外边距尺寸
     */
    contentBottomOffset() {
      const mainEl = this.$refs.main
      const bottomOffset =
        (parseInt(getComputedStyle(mainEl)['padding-bottom'], 10) || 0) +
        (parseInt(getComputedStyle(mainEl)['margin-bottom'], 10) || 0) +
        (parseInt(getComputedStyle(mainEl)['border-bottom-width'], 10) || 0)
      return bottomOffset
    },

    /**
     * 如果为固定高度布局，则会返回能直接用于 css height 的值
     */
    fixedHeight() {
      if (this.height) {
        const isPercent = /\d+%/.test(this.height)
        const height = parseInt(this.height, 10)
        return height ? (isPercent ? `${height}%` : `${height}px`) : false
      }
      return false
    },

    /**
     * 对传入的 tableEvents 的 key 统一转换为横线分隔格式
     */
    validTableEvents() {
      /* istanbul ignore next */
      return _.mapKeys(this.tableEvents, (value, key) => _.kebabCase(key))
    },

    /**
     * 直接 v-bind 到 <el-table> 上与默认配置重名的属性会失效，
     * 因此通过 computed 合并所需的 props
     */
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
    height: /* istanbul ignore next */ function() {
      this.initLayout()
    },
    fullHeight: /* istanbul ignore next */ function() {
      this.initLayout()
    },
    showFilterSearch: /* istanbul ignore next */ function() {
      this.initLayout()
    },
    showFilterReset: /* istanbul ignore next */ function() {
      this.initLayout()
    },
    filterbarFold: /* istanbul ignore next */ function() {
      this.updateLayout()
    }
  },

  created() {
    // 初始化提示信息
    if (this.contentMessage) {
      if (typeof this.contentMessage === 'string') {
        this.setContentMessage(this.contentMessage)
      } else if (_.isPlainObject(this.contentMessage)) {
        const { type, message } = this.contentMessage
        this.setContentMessage(message, type)
      }
    }
  },

  mounted() {
    this.initLayout()
    if (this.autoload) {
      this.requestData()
    }
  },

  beforeDestroy: /* istanbul ignore next */ function() {
    window.removeEventListener('resize', this.updateContentHeight)
    window.removeEventListener('resize', this.updateFilterbarLayout)
  },

  methods: {
    async initLayout() {
      // 需要 nextTick 等待 filterbar 渲染后再开始更新布局
      await this.$nextTick()
      this.updateLayout()

      /* istanbul ignore next */
      if (this.fullHeight) {
        window.addEventListener('resize', this.updateContentHeight)
      } else {
        window.removeEventListener('resize', this.updateContentHeight)
      }

      const validFilterFields = this.$refs.filterbar.validFilterFields

      if (validFilterFields.length > 0) {
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
      if (this._inactive) {
        // 在 listview-container 中，不是当前视图不触发重算
        return
      }
      if (this.fixedHeight) {
        this.maxHeight = this.$el.getBoundingClientRect().height
      } else if (this.fullHeight) {
        this.maxHeight = window.innerHeight
      } else {
        this.maxHeight = null
        this.contentHeight = parseInt(this.contentMinHeight, 10)
      }

      if (this.maxHeight !== null) {
        // 有可能是 filterbar 的展开与缩起，引发的 update ，
        // 需要 nextTick 等待界面变化后再计算布局
        await this.$nextTick()
        const contentEl = this.$refs.content
        /* istanbul ignore next */
        const contentTop = contentEl ? contentEl.getBoundingClientRect().top : 0
        const paginationHeight = this.getPaginationHeight()
        const restHeight =
          this.maxHeight -
          contentTop -
          this.contentBottomOffset -
          paginationHeight
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
      // 点击搜索栏搜索按钮时复位至第一页
      this.currentPage = 1
      this.requestData()
      this.$emit('filter-submit')
    },

    handleFilterReset() {
      this.$emit('filter-reset')
    },

    // 供外部使用的短别名
    search(keepInPage = false) {
      if (!keepInPage) {
        // 复位至第一页
        this.currentPage = 1
      }
      this.requestData()
    },

    async requestData() {
      if (!this.requestHandler && !this.requestUrl) {
        // eslint-disable-next-line no-console
        console.warn('未配置 requestUrl 或 requestHandler ，无法发起数据请求。')
        return
      }
      // 请求参数合并转换
      let payloadData = _.cloneDeep(this.filterModel)
      // 删除搜索条件中的无效数据
      payloadData = _.omitBy(payloadData, val => {
        return (
          val === null ||
          val === undefined ||
          val === '' ||
          ((Array.isArray(val) || _.isPlainObject(val)) && _.isEmpty(val))
        )
      })
      if (this.usePage) {
        payloadData.page_index = this.currentPage
        payloadData.page_size = this.currentPageSize
      }

      // 请求参数 key 拼写方法转换
      if (this.requestDataKeyCase) {
        switch (this.requestDataKeyCase) {
          case 'camelCase':
            payloadData = camelCaseObjectKey(payloadData)
            break
          case 'snakeCase':
            payloadData = snakeCaseObjectKey(payloadData)
            break
          case 'pascalCase':
            payloadData = pascalCaseObjectKey(payloadData)
            break
        }
      }

      // 自定义请求参数转换方法
      const requestData = this.transformRequestData
        ? this.transformRequestData(payloadData)
        : payloadData

      // transformRequestData 返回 false 阻止提交动作，可用于提交前验证等
      if (requestData === false) {
        this.contentLoading = false
        return
      }

      this.contentLoading = true

      let response
      if (this.requestHandler) {
        // 自定义请求方法
        response = await this.requestHandler(requestData)
      } else if (this.requestUrl) {
        // 多次点击“搜索”会取消前面的请求，以最后一次的请求为准
        this._requestCancelToken && this._requestCancelToken()

        // 构造 Axios 请求 requestConfig
        const _requestConfig = {
          url: this.requestUrl,
          method: this.requestConfig.method || this.requestMethod,
          withCredentials: true
        }
        // 提前合并以获取 method 用于判断附加请求参数
        if (_requestConfig.method === 'get') {
          _requestConfig.params = requestData
        } else {
          _requestConfig.data = requestData
        }

        const requestConfig = _.merge(_requestConfig, this.requestConfig)
        // cancelToken 内部使用于取消前面的重复请求，因此不支持外部传入自定义
        requestConfig.cancelToken = new axios.CancelToken(cancel => {
          this._requestCancelToken = cancel
        })

        try {
          response = await axiosService(requestConfig)
        } catch (error) {
          if (!axios.isCancel(error)) {
            this.setContentMessage(error.message, 'error')
            this.contentLoading = false
          }
        }
      }

      this.contentLoading = false

      // change: 自定义 requestHandler 与内置请求响应都通过验证流程
      if (this.validateResponse(response)) {
        this.setContentMessage(null) // 清空错误信息
        const responseData = response.data
        const contentResponse = this.transformResponseData
          ? this.transformResponseData(responseData)
          : responseData
        const contentData = this.contentDataMap
          ? transformContentData(contentResponse, this.contentDataMap)
          : contentResponse
        this.contentData = contentData
      } else {
        this.setContentMessage(
          this.resolveResponseErrorMessage(response),
          'error'
        )
      }
    },

    /**
     * Table
     */
    handleRowClick(row, event) {
      // 如果使用单选效果，每次选择前清空 el-table 内部的存储值
      if (this.tableSelectEnable === 'single') {
        this.$refs.contentTable.store.states.selection = []
      }
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
        const { render, children, ...props } = column

        const VNodeData = { props }
        if (render) {
          VNodeData.scopedSlots = {
            default: render
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
    setContentMessage(message = '', type = null) {
      if (message === null) {
        this.internalContentMessage = null
        return
      }
      const iconMap = {
        success: 'el-icon-success',
        warning: 'el-icon-warning',
        info: 'el-icon-info',
        error: 'el-icon-error'
      }
      const icon = type ? iconMap[type] || null : null

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
    },

    /**
     * 获取页码区域所占高度，用于计算内容高度
     */
    getPaginationHeight() {
      const paginationEl = this.$refs.pagination
      const paginationHeight = paginationEl
        ? paginationEl.getBoundingClientRect().height
        : 0
      return paginationHeight
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

  .el-table th {
    background: #f5f7fa;
  }

  &__main {
    padding: 10px;
    padding-bottom: 5px;
    background-color: #fff;
    border: 5px solid #f0f2f5;
  }

  &__content {
    overflow: auto;

    .el-table__empty-text {
      width: auto;
      max-width: 50%;
    }
  }

  .content-message {
    display: flex;
    padding: 15px 20px;
    line-height: 30px;
    border-radius: 5px;
    box-shadow: 0 0 15px #ddd;

    &--icon {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-right: 10px;
      font-size: 24px;
    }

    &--message {
      font-size: 14px;
      text-align: left;
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

  .table-column--single-selection .el-radio__label {
    display: none;
  }

  &__page {
    padding-top: 5px;
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
