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
              v-bind="normalizeTableProps"
              @selection-change="handleTableSelectionChange"
              @row-click="handleRowClick"
              v-on="normalizeTableEvents"
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
          v-if="!!usePage"
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
import VNode from '../components/v-node'
import ListviewHeader from '../components/listview-header.vue'
import Filterbar from './components/filterbar.vue'
import { warn, error } from '@/utils/debug'
import {
  dataMapping,
  parseSizeWithUnit,
  isValidFieldValue,
  isValidFieldConfig
} from '@/utils/utils'
import {
  camelCaseObjectKey,
  snakeCaseObjectKey,
  pascalCaseObjectKey
} from '@/utils/objectKey'
import './listview.less'

const defaultPageParamKeys = { pageIndex: 'page_index', pageSize: 'page_size' }

/**
 * 验证 fields 内是否有重复的 model 属性
 */
function validateFilterFields(fields) {
  /* istanbul ignore next */
  if (Array.isArray(fields)) {
    const hasModelKey = fields.filter(field => isValidFieldConfig(field))
    const duplicateFields = _.pickBy(
      _.countBy(hasModelKey, 'model'),
      count => count > 1
    )
    if (!_.isEmpty(duplicateFields)) {
      error(
        "FilterFields 配置内有重复的 'model' : " +
          Object.keys(duplicateFields).join(', ')
      )
    }
  }
}

/**
 * 应用 filterField 内设置的字段 getter ，
 * 如果 getter 执行有错误则依然使用原始值
 */
function applyFieldGetter(payloadData, getters) {
  /* istanbul ignore next */
  Object.keys(getters).forEach(key => {
    try {
      payloadData[key] = getters[key](payloadData[key], payloadData)
    } catch (e) {
      if (isValidFieldValue(payloadData[key])) {
        error(
          [
            `FilterFields '${key}' getter error:`,
            `  - Value: ${JSON.stringify(payloadData[key])}`,
            `  - Getter: ${getters[key].toString()}`,
            `  - Error: ${e}`
          ].join('\n')
        )
      }
    }
  })
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
        total: 'result.total_count'
      })
    },

    // Request error handler
    contentMessage: { type: [Object, String], default: null },
    validateResponse: {
      type: Function,
      default: /* istanbul ignore next */ function(response) {
        try {
          return response.is_success
        } catch (e) {
          return false
        }
      }
    },
    resolveResponseErrorMessage: {
      type: Function,
      default: /* istanbul ignore next */ function(response) {
        try {
          return response.error_info.msg
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
    usePage: { type: [Boolean, Object], default: true },
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
      return parseSizeWithUnit(this.height)
    },

    /**
     * 对传入的 tableEvents 的 key 统一转换为横线分隔格式
     */
    normalizeTableEvents() {
      /* istanbul ignore next */
      return _.mapKeys(this.tableEvents, (value, key) => _.kebabCase(key))
    },

    /**
     * 写在 $attrs 上的 prop 优先级会比 v-bind 内的高，以下 3 个属性需要可配置，
     * 既 <el-table size="small" v-bind="tableProps" /> 无法修改 size 的值，
     * 因此先通过 computed 合并所需的 props ，再统一绑定最后的合并结果
     */
    normalizeTableProps() {
      const defaultProps = {
        size: 'small',
        border: true,
        stripe: true
      }
      return _.merge(defaultProps, this.tableProps)
    },

    /**
     * 从 filterFields 内提取数据 getter ，并以 model 值作为新 key 名返回一个 object
     * [{ model: 'text', get: val => val.toUpperCase() }]
     * -> { text: val => val.toUpperCase() }
     */
    filterModelGetters() {
      const fields = _.keyBy(this.filterFields, 'model')
      const getters = {}
      _.transform(
        fields,
        function(result, field, key) {
          if (_.isFunction(field.get)) {
            result[field.model] = field.get
          }
        },
        getters
      )
      return getters
    }
  },

  watch: {
    height: 'initLayout',
    fullHeight: 'initLayout',
    showFilterSearch: 'initLayout',
    showFilterReset: 'initLayout',
    filterbarFold: 'initLayout',
    filterFields: /* istanbul ignore next */ function(val) {
      this.initLayout()
      validateFilterFields(val)
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
    validateFilterFields(this.filterFields)
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
      this.search()
      this.$emit('filter-submit')
    },

    handleFilterReset() {
      this.$emit('filter-reset')
    },

    /**
     * 供外部使用的短别名
     */
    search(keepInPage = false) {
      if (!keepInPage) {
        // 复位至第一页
        this.currentPage = 1
      }
      this.requestData()
    },

    async requestData() {
      if (!this.requestHandler && !this.requestUrl) {
        return warn('未配置 requestUrl 或 requestHandler ，无法发起数据请求。')
      }
      // 请求参数合并转换
      let payloadData = _.cloneDeep(this.filterModel)

      // 应用 filter 设置内的 getter
      applyFieldGetter(payloadData, this.filterModelGetters)

      // 删除搜索条件中的无效数据
      payloadData = _.omitBy(payloadData, val => {
        return !isValidFieldValue(val)
      })

      // 附加分页参数
      let indexKey = defaultPageParamKeys.pageIndex
      let sizeKey = defaultPageParamKeys.pageSize
      if (this.usePage) {
        if (_.isPlainObject(this.usePage)) {
          indexKey = this.usePage.pageIndex || indexKey
          sizeKey = this.usePage.pageSize || sizeKey
        }
        payloadData[indexKey] = this.currentPage
        payloadData[sizeKey] = this.currentPageSize
      } else {
        try {
          delete payloadData[indexKey]
          delete payloadData[sizeKey]
        } catch (e) {}
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
      // prettier-ignore
      const transformRequestFunc = this.$LISTVIEW && _.isFunction(this.$LISTVIEW.transformRequestData)
        ? this.$LISTVIEW.transformRequestData
        : this.transformRequestData
      const requestData = transformRequestFunc
        ? transformRequestFunc(payloadData)
        : payloadData

      // transformRequestData 返回 false 阻止提交动作，可用于提交前验证等
      if (requestData === false) {
        /* istanbul ignore next */
        this.contentLoading = false
        return
      }

      this.contentLoading = true

      let response = null
      let _responseError = false
      if (this.requestHandler) {
        // 自定义请求方法
        response = await this.requestHandler(requestData)
      } else if (this.requestUrl) {
        // 多次点击“搜索”会取消前面的请求，以最后一次的请求为准
        /* istanbul ignore next */
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
          const axiosService = axios.create()
          const res = await axiosService(requestConfig)
          response = res.data
        } catch (error) {
          _responseError = true
          if (axios.isCancel(error)) {
            // 如果为 axios 的取消则跳过后续解析步骤，保持界面 loading 状态
            return false
          } else {
            // 非内部取消的异常才解析错误信息
            this.setContentMessage(error.message, 'error')
          }
        }
      }

      this.contentLoading = false

      let contentResponse = null
      if (!_responseError) {
        // 自定义 requestHandler 与内置请求响应都通过验证流程
        const validateFunc =
          this.$LISTVIEW && _.isFunction(this.$LISTVIEW.validateResponse)
            ? this.$LISTVIEW.validateResponse
            : this.validateResponse
        if (validateFunc(response)) {
          // 清空错误信息
          this.setContentMessage(null)
          // prettier-ignore
          const transformResponseFunc = this.$LISTVIEW && _.isFunction(this.$LISTVIEW.transformResponseData)
            ? this.$LISTVIEW.transformResponseData
            : this.transformResponseData
          contentResponse = transformResponseFunc
            ? transformResponseFunc(response)
            : response
        } else {
          // prettier-ignore
          const resolveErrorMessageFunc = this.$LISTVIEW && _.isFunction(this.$LISTVIEW.resolveResponseErrorMessage)
            ? this.$LISTVIEW.resolveResponseErrorMessage
            : this.resolveResponseErrorMessage
          this.setContentMessage(resolveErrorMessageFunc(response), 'error')
        }
      }

      // 未通过验证的数据也统一通过 contentDataMap 再回传 contentData 确保格式统一
      const finalContentDataMap =
        this.$LISTVIEW && _.isPlainObject(this.$LISTVIEW.contentDataMap)
          ? this.$LISTVIEW.contentDataMap
          : this.contentDataMap
      const contentData = finalContentDataMap
        ? dataMapping(contentResponse, finalContentDataMap)
        : contentResponse

      this.contentData = contentData
    },

    /**
     * el-table 开启表格数据选择功能时表格行点击切换已选选项
     */
    handleRowClick(row, event) {
      // 如果使用单选效果，每次选择前清空 el-table 内部的存储值
      if (this.tableSelectEnable === 'single') {
        this.$refs.contentTable.store.states.selection = []
      }
      this.$refs.contentTable.toggleRowSelection(row)
    },

    /**
     * el-table 表格选中数据同步至父组件
     */
    handleTableSelectionChange(val) {
      this.internalListSelection = val
      this.$emit('update:tableSelection', this.internalListSelection)
    },

    /**
     * el-table 自定义选中行高亮
     */
    contentTableRowClassName(row) {
      return this.tableSelection.indexOf(row.row) > -1 ? 'row--selected' : ''
    },

    /**
     * tableColumns 转换为 el-table-column ，支持 children 属性多级列配置
     */
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
