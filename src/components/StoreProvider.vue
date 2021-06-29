<script lang="tsx">
import Vue from 'vue'
import axios, { AxiosRequestConfig } from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import isFunction from 'lodash/isFunction'
import isPlainObject from 'lodash/isPlainObject'
import isString from 'lodash/isString'
import isError from 'lodash/isError'
import merge from 'lodash/merge'
import omitBy from 'lodash/omitBy'
import { warn, dataMapping, isValidFieldValue, ensurePromise } from '@/utils'

export default Vue.extend({
  name: 'ListviewStoreProvider',

  // @ts-ignore
  // abstract: true,

  inheritAttrs: false,

  provide(): any {
    return {
      lvStore: this,
    }
  },

  props: {
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
    contentDataMap: {
      type: Object,
      default: () => ({
        items: 'result.items',
        total: 'result.total',
      }),
    },

    // Request error handler
    contentMessage: { type: [Object, String], default: null },
    validateResponse: { type: Function, default: null },
    resolveResponseErrorMessage: { type: Function, default: null },

    // Pager
    usePage: { type: [Object, Boolean], default: true },
    pageSize: { type: Number, default: 20 },
    pageSizes: { type: Array, default: () => [20, 50, 100] },
    pageProps: { type: Object },
    pagePosition: { type: String },
  },

  data(): any {
    return {
      contentHeight: null,
      requestData: {},
      contentLoading: false,
      currentPage: 1,
      currentPageSize: this.pageSize,
      contentData: { items: [], total: 0 },
      internalContentMessage: {
        type: null,
        text: null,
      },
      internalSelection: [],
    }
  },

  watch: {
    currentPage: 'startRequest',
    currentPageSize: 'startRequest',
    contentMessage: {
      immediate: true,
      handler() {
        if (isString(this.contentMessage)) {
          this.setContentMessage(this.contentMessage)
        } else if (isPlainObject(this.contentMessage)) {
          const { type, message } = this.contentMessage
          this.setContentMessage(message, type)
        }
      },
    },
    internalSelection() {
      this.$emit('selection-change', this.internalSelection)
      this.$emit('update:tableSelection', this.internalSelection)
    },
  },

  mounted() {
    if (this.autoload) {
      this.startRequest()
    }
  },

  methods: {
    startRequest() {
      this.$emit('before-request')
      if (!this.requestUrl && !this.requestHandler) {
        return warn('未配置 requestUrl 或 requestHandler ，无法发起数据请求。')
      }

      this.$emit('request-start')

      this.contentLoading = true
      this.getRequestData().then((requestData: any) => {
        // transformRequestData 有可能返回 false 以阻止提交动作，可用于提交前验证等
        if (requestData === false) {
          this.$emit('request-error', 'invalid')
          /* istanbul ignore next */
          this.contentLoading = false
          return
        }
        this.handleRequest(requestData)
          // 自定义 requestHandler 与内置请求响应都通过验证流程
          .then(this.validateResponseData)
          .then((data: any) => {
            if (isFunction(this.transformResponseFn)) {
              data = this.transformResponseFn(data)
            }
            this.contentData = this.getContentData(data)
            this.contentLoading = false
            this.$emit('request-success')
          })
          .catch(this.handleResponseError)
      })
    },

    getContentData(data = {}) {
      return dataMapping(data, this.contentDataMap)
    },

    handleRequest(requestData: any) {
      let responseDataPromise: Promise<any>

      if (isFunction(this.requestHandler)) {
        // 自定义请求方法
        responseDataPromise = ensurePromise(this.requestHandler(requestData))
      } else {
        // 多次点击“搜索”会取消前面的请求，以最后一次的请求为准
        /* istanbul ignore next */
        // @ts-ignore
        this._requestCancelToken && this._requestCancelToken()

        const requestConfig = this.getRequestConfig(requestData)
        const axiosService = axios.create()(requestConfig)
        responseDataPromise = axiosService.then((res) => res.data)
      }
      return responseDataPromise
    },

    validateResponseData(data: any): Promise<any> {
      const validateFn = this.validateResponse
      if (!isFunction(validateFn) || validateFn(data)) {
        this.setContentMessage(null)
        return Promise.resolve(data)
      } else {
        return Promise.reject(data)
      }
    },

    handleResponseError(error: any) {
      if (!axios.isCancel(error)) {
        const resolveErrorMessageFn = this.resolveResponseErrorMessage
        let errorMessage = error
        try {
          errorMessage = isFunction(resolveErrorMessageFn)
            ? resolveErrorMessageFn(error)
            : error
        } catch (e) {}
        errorMessage = isError(errorMessage)
          ? errorMessage.toString()
          : errorMessage
        this.setContentMessage(errorMessage, 'error')
        // 清空列表内容
        this.contentData = this.getContentData()
        this.contentLoading = false
        this.$emit('request-error', error)
      }
      return error
    },

    getRequestConfig(
      data: AxiosRequestConfig['data'] | AxiosRequestConfig['params']
    ): AxiosRequestConfig {
      const requestConfig = merge(
        { url: this.requestUrl, withCredentials: true },
        this.requestConfig
      )

      if (/post/i.test(requestConfig.method)) {
        requestConfig.data = data
      } else {
        requestConfig.params = data
      }

      requestConfig.cancelToken = new axios.CancelToken((cancel) => {
        // @ts-ignore
        this._requestCancelToken = cancel
      })

      return requestConfig
    },

    getRequestData(): Promise<any> {
      let data = cloneDeep(this.requestData)

      // 删除提交数据中的无效数据
      data = omitBy(data, (val) => !isValidFieldValue(val))

      let indexKey = 'page_index'
      let sizeKey = 'page_size'
      const usePage = this.usePage
      if (usePage) {
        if (isPlainObject(usePage)) {
          indexKey = usePage['pageIndex'] || indexKey
          sizeKey = usePage['pageSize'] || sizeKey
        }
        data[indexKey] = this.currentPage
        data[sizeKey] = this.currentPageSize
      } else {
        delete data[indexKey]
        delete data[sizeKey]
      }

      if (isFunction(this.transformRequestData)) {
        // transformRequestDataFn 支持返回 promise
        data = this.transformRequestData(data)
      }

      return ensurePromise(data)
    },

    setContentMessage(text = '', type = null) {
      if (text === null) {
        this.internalContentMessage = { text: null, type: null }
      } else {
        this.internalContentMessage = { text, type }
      }
    },
  },

  render() {
    return this.$slots.default as any
  },
})
</script>
