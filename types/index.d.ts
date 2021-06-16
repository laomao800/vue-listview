import Vue, { VueConstructor, VNode } from 'vue'
import { AxiosRequestConfig } from 'axios'

type MessageType = 'success' | 'warning' | 'info' | 'error'

declare class ListviewProps {
  /** 设置页面顶部通栏内的页面标题文本。 default: '' */
  headerTitle: string

  /** 优先级最高，设置整体布局高度，包含顶部标题栏、搜索栏、正文区域、页码区域所有内容的高度，支持百分比。 default: null */
  height: string | number

  /** 垂直高度是否铺满屏幕高度。 default: true */
  fullHeight: boolean

  /** 初始化后是否自动加载第一页内容。 default: true */
  autoload: boolean

  /** 数据请求接口地址。 default: '' */
  requestUrl: string

  /** 支持 Axios 所有支持的请求方法。 default: 'get' */
  requestMethod:
    | 'get'
    | 'delete'
    | 'head'
    | 'options'
    | 'post'
    | 'put'
    | 'patch'

  /** 兼容 Axios 的所有除了 cancelToken 之外的 requestConfig 配置。 default: {} */
  requestConfig: AxiosRequestConfig

  /** 自定义请求方法，需要返回 Promise ，以返回的内容交由 `validateResponse` 进行验证 */
  requestHandler: (requestData?: object) => Promise<any>

  /** 对接口发起请求参数在发送前作最后的更改 */
  transformRequestData: (requestData?: object) => object | boolean

  /** 对原始响应数据的加工方法 default: null */
  transformResponseData: (requestData?: object) => void

  /** 数据接口响应内容属性映射。 default: { items: 'result.items', total: 'result.total_count' } */
  contentDataMap: { [k: string]: string }

  /** 可用在 autoload 为 false 时候，初始显示的提示信息。 default: null */
  contentMessage:
    | null
    | string
    | {
        type: MessageType
        message: string
      }

  /** 验证接口响应是否成功 */
  validateResponse: (response?: any) => boolean

  /** 解析错误提示信息 */
  resolveResponseErrorMessage: (response?: any) => any

  /** 搜索栏左侧按钮配置。 default: [] */
  filterButtons: FilterButton[] | (() => VNode) | VNode

  /** 搜索栏搜索字段配置。 default: [] */
  filterFields: FilterField[] | (() => VNode) | VNode

  /** 可选，存储搜索栏的搜索条件值。 default: {} */
  filterModel: Record<string, any>

  /** 是否显示搜索栏的“提交”按钮。 default: true */
  showFilterSearch: boolean

  /** 是否显示搜索栏的“重置”按钮。 default: true */
  showFilterReset: boolean

  /** 表格列配置。 default: [] */
  tableColumns: TableColumn[]

  /** 可传入 <el-table> 的所有支持属性。 default: {} */
  tableProps: Record<string, any>

  /** 可传入 <el-table> 的所有支持事件。 default: {} */
  tableEvents: Record<string, (...args: any[]) => void>

  /** 是否开启表格行选择功能，传入 'single' 为表格单选效果。 default: true */
  tableSelectionColumn:
    | boolean
    | string
    | {
        type: string
        selectable: (row: any, index: number) => boolean
      }

  /** 表格行选择的选中数据，可通过 .sync 修饰符获取更新。 default: [] */
  tableSelection: any[]

  /** 是否开启底部分页功能，或配置请求时分页参数的键名。 default: true */
  usePage:
    | boolean
    | {
        pageIndex: string
        pageSize: string
      }

  /** 分页“每页数量”可选值。 default: [20, 50, 100] */
  pageSizes: number[]

  /** 默认每页分页数量。 default: 20 */
  pageSize: number
}

declare class ListviewContainerProps extends Vue {}

declare class Listview extends ListviewProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

declare class ListviewContainer extends ListviewContainerProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

export default Listview
export { Listview, ListviewContainer, ListviewProps, ListviewContainerProps }
export * from './FilterButton'
export * from './FilterField'
export * from './TableColumn'