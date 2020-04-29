<template>
  <div
    :style="{
      height: fixedHeight,
      minHeight: fixedHeight && 'inherit'
    }"
    class="listview"
  >
    <listview-header :title="headerTitle" :nav="headerNav" />

    <div ref="main" class="listview__main">
      <filterbar
        ref="filterbar"
        :filter-buttons="filterButtons"
        :filter-fields="filterFields"
        :filter-model="filterModel"
        :filterbar-fold.sync="filterbarFold"
        :show-filter-search="showFilterSearch"
        :show-filter-reset="showFilterReset"
        @filter-submit="onFilterSubmit"
        @filter-reset="onFilterReset"
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
          :style="{
            height: contentHeight ? `${contentHeight}px` : null
          }"
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
              v-bind="normalizeTableProps"
              @selection-change="handleTableSelectionChange"
              @row-click="handleRowClick"
              v-on="normalizeTableEvents"
            >
              <template v-if="internalContentMessage" slot="empty">
                <span
                  :class="[
                    'content-message',
                    {
                      [`content-message--${internalContentMessage.type}`]: internalContentMessage.type
                    }
                  ]"
                >
                  <span
                    v-if="internalContentMessage.icon"
                    class="content-message--icon"
                  >
                    <i :class="internalContentMessage.icon" />
                  </span>
                  <span class="content-message--message">{{
                    internalContentMessage.message
                  }}</span>
                </span>
              </template>

              <template v-if="!!selectionColumn">
                <el-table-column
                  v-if="selectionColumn.type === 'single'"
                  :fixed="tableColumns.some(col => col.fixed)"
                  :resizable="false"
                  width="50"
                  align="center"
                  class-name="el-table-column--selection el-table-column--single-selection"
                >
                  <template slot-scope="{ row, $index }">
                    <el-radio
                      :value="
                        internalListSelection.indexOf(row) > -1 ? '' : null
                      "
                      :disabled="
                        selectionColumn.selectable
                          ? !selectionColumn.selectable.call(null, row, $index)
                          : false
                      "
                      label
                      @click.native.stop.prevent="
                        $event => handleRowClick(row, null, $event)
                      "
                    />
                  </template>
                </el-table-column>

                <el-table-column
                  v-else
                  v-bind="selectionColumn"
                  type="selection"
                  width="50"
                  align="center"
                />
              </template>

              <template v-for="(column, index) in tableColumns">
                <v-node :key="index" :node="renderTableColumn(column)" />
              </template>
            </el-table>
          </slot>
        </div>

        <div v-if="!!usePage" ref="pagination" class="listview__page">
          <el-pagination
            v-bind="mergedPageProps"
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
import parseSize from '@laomao800/parse-size-with-unit'
import VNode from '@/components/v-node'
import ListviewHeader from '@/components/listview-header.vue'
import Filterbar from '@/components/filterbar.vue'
import { warn, error } from '@/utils/debug'
import {
  dataMapping,
  isValidFieldValue,
  nodeParents,
  hasOwn
} from '@/utils/utils'
import './style.less'

/**
 * 验证 fields 内是否有重复的 model 属性
 */
const validateFilterFields = fields => {
  /* istanbul ignore next */
  if (Array.isArray(fields)) {
    const hasModelKey = fields.filter(field => {
      return (
        _.isPlainObject(field) &&
        hasOwn(field, 'model') &&
        typeof field.model === 'string'
      )
    })
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
const applyFieldGetter = (payloadData, getters) => {
  /* istanbul ignore next */
  Object.keys(getters).forEach(key => {
    try {
      payloadData[key] = getters[key](payloadData[key], payloadData)
    } catch (e) {
      error(
        [
          `FilterFields '${key}' getter error:`,
          `  - Value: ${JSON.stringify(payloadData[key])}`,
          `  - Getter: ${getters[key].toString()}`,
          `  - Error: ${e}`
        ].join('\n')
      )
    }
  })
}

const resolvefilterModelGetters = (fields, getters = {}) =>
  fields.reduce((result, field) => {
    if (Array.isArray(field)) {
      resolvefilterModelGetters(field, getters)
    } else {
      if (_.isFunction(field.get) && field.model) {
        result[field.model] = field.get
      }
    }
    return result
  }, getters)

const DEFAULT_PROPS = {
  validateResponse: response => {
    try {
      return response.is_success
    } catch (e) {
      return false
    }
  },
  resolveResponseErrorMessage: response => {
    try {
      return response.error_info.msg
    } catch (e) {
      return '未知错误'
    }
  },
  transformRequestData: null,
  transformResponseData: null,
  contentDataMap: {
    items: 'result.items',
    total: 'result.total_count'
  }
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

    // Data request
    autoload: { type: Boolean, default: true },
    requestUrl: { type: String, default: '' },
    requestMethod: { type: String, default: 'post' },
    requestConfig: { type: Object, default: () => ({}) },

    // Adv request
    requestHandler: { type: Function, default: null },
    transformRequestData: { type: Function, default: null },

    // Adv response
    transformResponseData: { type: Function, default: null },
    contentDataMap: { type: Object, default: null },

    // Request error handler
    contentMessage: { type: [Object, String], default: null },
    validateResponse: { type: Function, default: null },
    resolveResponseErrorMessage: { type: Function, default: null },

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
    tableSelectionColumn: { type: [Boolean, String, Object], default: true },
    tableSelection: { type: Array, default: () => [] },

    // Pager
    usePage: { type: [Boolean, Object], default: true },
    pageSizes: { type: Array, default: () => [20, 50, 100] },
    pageSize: { type: Number, default: 20 },
    pageProps: { type: Object, default: () => ({}) }
  },

  data() {
    return {
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
     * 规范化表格选择列配置
     */
    selectionColumn() {
      const column = this.tableSelectionColumn
      if (column === false) {
        return false
      }
      let finalColumn = {}
      if (column === 'single') {
        finalColumn.type = 'single'
      } else if (_.isPlainObject(column)) {
        finalColumn.type = column.type === 'single' ? 'single' : 'selection'
      }
      finalColumn.selectable = _.isFunction(column.selectable)
        ? column.selectable
        : null
      return finalColumn
    },

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
      return parseSize(this.height)
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
      const mergedPros = _.mapKeys(
        _.merge(defaultProps, this.tableProps),
        (value, key) => _.kebabCase(key)
      )
      const rowClassName = mergedPros['row-class-name']
      if (rowClassName) {
        if (_.isFunction(rowClassName)) {
          mergedPros['row-class-name'] = (...args) =>
            [this.selectionRowClassName(...args), rowClassName(...args)].join(
              ' '
            )
        } else {
          mergedPros['row-class-name'] = (...args) =>
            [this.selectionRowClassName(...args), rowClassName].join(' ')
        }
      } else {
        mergedPros['row-class-name'] = this.selectionRowClassName
      }

      return mergedPros
    },

    /**
     * 从 filterFields 内提取数据 getter ，并以 model 值作为新 key 名返回一个 object
     * [{ model: 'text', get: val => val.toUpperCase() }]
     * -> { text: val => val.toUpperCase() }
     */
    filterModelGetters() {
      return resolvefilterModelGetters(this.filterFields)
    },

    overrideProps() {
      // 非 .use 引入的 Listview 未注册 $LISTVIEW
      const globalConfig = this.$LISTVIEW || {}
      const overrides = {}
      Object.keys(DEFAULT_PROPS).forEach(prop => {
        overrides[prop] =
          this[prop] || globalConfig[prop] || DEFAULT_PROPS[prop]
      })
      overrides['usePage'] =
        this.usePage === true && hasOwn(globalConfig, 'usePage')
          ? globalConfig['usePage']
          : this.usePage
      return overrides
    },

    mergedPageProps() {
      return {
        pageSizes: this.pageSizes,
        pageSize: this.pageSize,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        ...this.pageProps,
        total: this.contentData.total,
        currentPage: this.currentPage
      }
    }
  },

  watch: {
    height: 'updateLayout',
    fullHeight() {
      this.initContentEvent()
      this.updateLayout()
    },
    showFilterSearch: 'updateLayout',
    showFilterReset: 'updateLayout',
    filterbarFold: 'updateLayout',
    filterButtons: 'updateLayout',
    filterFields(val) {
      this.updateLayout()
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
    window.removeEventListener('resize', this.updateContentLayout)
    window.removeEventListener('resize', this.updateFilterbarLayout)
  },

  methods: {
    async initLayout() {
      // 需要 nextTick 等待 filterbar 渲染后再开始更新布局
      await this.$nextTick()
      this.updateLayout()

      this.initContentEvent()
      this.initFilterEvent()
    },

    initContentEvent() {
      /* istanbul ignore next */
      if (this.fullHeight) {
        window.addEventListener('resize', this.updateContentLayout)
      } else {
        window.removeEventListener('resize', this.updateContentLayout)
      }
    },

    initFilterEvent() {
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
    updateLayout: _.debounce(
      function() {
        this.updateContentLayout()
        this.updateFilterbarLayout()
      },
      0,
      {
        leading: true
      }
    ),

    /**
     * 更新主要内容区域高度尺寸
     */
    async updateContentLayout() {
      if (this._inactive) {
        // 在 listview-container 中，不是当前视图不触发重算
        return
      }

      let maxHeight = 0
      if (this.fixedHeight) {
        maxHeight = this.$el.getBoundingClientRect().height
      } else if (this.fullHeight) {
        maxHeight = window.innerHeight
      } else {
        // 自动高度
        return
      }

      // 有可能是 filterbar 的展开与缩起，引发的 update ，
      // 需要 nextTick 等待界面变化后再计算布局
      await this.$nextTick()

      // 指定高度时，需要从 $el 位置开始计算 top 高度，
      // 确保处于 listview-container 容器内的高度能铺满
      const wrapOffsetTop = this.fixedHeight
        ? this.$el.getBoundingClientRect().top
        : 0

      const contentOffsetTop = this.$refs.content.getBoundingClientRect().top
      const paginationHeight = this.getPaginationHeight()
      const restHeight =
        maxHeight +
        wrapOffsetTop -
        contentOffsetTop -
        paginationHeight -
        this.contentBottomOffset
      this.contentHeight = restHeight
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

    onFilterSubmit() {
      this.search()
      this.$emit('filter-submit', { filterModel: this.filterModel })
    },

    onFilterReset() {
      this.$emit('filter-reset')
    },

    resetFilter() {
      this.$refs.filterbar.handleFilterReset()
    },

    /**
     * 供外部使用的短别名
     */
    search(keepInPage = false) {
      if (!keepInPage) {
        // 复位至第一页
        this.currentPage = 1
      }
      return this.requestData()
    },

    async requestData() {
      if (!this.requestHandler && !this.requestUrl) {
        return warn('未配置 requestUrl 或 requestHandler ，无法发起数据请求。')
      }

      this.$emit('before-request', this)

      // 请求参数合并转换
      let payloadData = _.cloneDeep(this.filterModel)

      // 应用 filter 设置内的 getter
      applyFieldGetter(payloadData, this.filterModelGetters)

      // 删除搜索条件中的无效数据
      payloadData = _.omitBy(payloadData, val => {
        return !isValidFieldValue(val)
      })

      // 附加分页参数
      let indexKey = 'page_index'
      let sizeKey = 'page_size'
      const usePage = this.overrideProps['usePage']
      if (usePage) {
        if (_.isPlainObject(usePage)) {
          indexKey = usePage['pageIndex'] || indexKey
          sizeKey = usePage['pageSize'] || sizeKey
        }
        payloadData[indexKey] = this.currentPage
        payloadData[sizeKey] = this.currentPageSize
      } else {
        delete payloadData[indexKey]
        delete payloadData[sizeKey]
      }

      // 自定义请求参数转换方法
      const transformRequestFn = this.overrideProps['transformRequestData']
      const requestData = transformRequestFn
        ? transformRequestFn(payloadData)
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
        const validateFunc = this.overrideProps.validateResponse
        if (validateFunc(response)) {
          // 清空错误信息
          this.setContentMessage(null)
          const transformResponseFn = this.overrideProps[
            'transformResponseData'
          ]
          contentResponse = transformResponseFn
            ? transformResponseFn(response)
            : response
        } else {
          const resolveErrorMessageFn = this.overrideProps[
            'resolveResponseErrorMessage'
          ]
          this.setContentMessage(resolveErrorMessageFn(response), 'error')
        }
      }

      // 未通过验证的数据也统一通过 contentDataMap 再回传 contentData 确保格式统一
      const finalContentDataMap = this.overrideProps['contentDataMap']
      const contentData = finalContentDataMap
        ? dataMapping(contentResponse, finalContentDataMap)
        : contentResponse

      this.contentData = contentData

      try {
        // 重置表格垂直滚动距离
        if (this.$refs.contentTable) {
          this.$refs.contentTable.bodyWrapper.scrollTop = 0
        }
      } catch (e) {}

      // 若非全屏布局，有可能由于数据增加出现垂直滚动条，需要刷新搜索栏“搜索”按钮位置
      if (!this.fullHeight) {
        this.updateFilterbarLayout()
      }

      this.$emit('requested', this)
    },

    /**
     * el-table 开启表格数据选择功能时表格行点击切换已选选项
     */
    handleRowClick(row, column, event) {
      if (this.selectionColumn) {
        if (this.selectionColumn.selectable && event) {
          // 选择列中若有禁用选项则当行数据禁止选中
          const $rowNode = nodeParents(event.target, '.el-table__row')
          const $selectNode = $rowNode.querySelector(
            '.el-table-column--selection input'
          )
          if (!$selectNode || $selectNode.disabled) return
        }
        // 如果使用单选效果，每次选择前清空 el-table 内部的存储值
        if (this.selectionColumn.type === 'single') {
          this.$refs.contentTable.store.states.selection = []
        }
        this.$refs.contentTable.toggleRowSelection(row)
      }
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
    selectionRowClassName(row) {
      return this.internalListSelection.indexOf(row.row) > -1
        ? 'row--selected'
        : ''
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
