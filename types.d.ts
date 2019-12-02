import Vue, { VueConstructor, VNode } from 'vue'
import { AxiosRequestConfig } from 'axios'

// vue-router Location
type Dictionary<T> = { [key: string]: T }
interface Location {
  name?: string
  path?: string
  hash?: string
  query?: Dictionary<string>
  params?: Dictionary<string>
  append?: boolean
  replace?: boolean
}

type MessageType = 'success' | 'warning' | 'info' | 'error'

type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'

type FieldType =
  | 'label'
  | 'text'
  | 'number'
  | 'select'
  | 'multipleSelect'
  | 'date'
  | 'dateRange'
  | 'timeSelect'
  | 'timePicker'
  | 'timePickerRange'
  | 'dateTime'
  | 'dateTimeRange'
  | 'cascader'

interface HeaderNavObjectType {
  text: string
  to?: Location
}

interface SelectOption {
  label: string
  value: any
  children?: SelectOption[]
}

interface FilterButton {
  /** 按钮样式类型 */
  type?: ButtonType

  /** 按钮图标 */
  icon?: string

  /** 是否显示为线框按钮 */
  plain?: boolean

  /** 按钮文本 */
  text?: string

  /** 按钮点击事件 */
  click?: () => void

  /** 是否展示为分裂按钮 */
  splitButton?: boolean

  /** 子按钮 */
  children?: {
    icon?: FilterButton['icon']
    text?: FilterButton['text']
    click?: FilterButton['click']
  }

  /** 自定义渲染方法 */
  render?: () => VNode
}

interface FilterField {
  /** 字段控件类型 */
  type?: FieldType

  /** 字段提交参数名 */
  model?: string

  /** 字段文本说明 */
  label?: string

  /** 是否显示为禁用状态 */
  disabled?: boolean

  /** 类型为 select 或 multipleSelect 时的选项配置 */
  options?:
    | SelectOption[]
    | Promise<SelectOption[]>
    | ((done: (options: SelectOption[]) => void) => void)

  /** 可传入对应控件原始的 props */
  componentProps?: { [k: string]: any }

  /** 可传入对应控件原始的 events */
  componentEvents?: { [k: string]: () => void }

  /** 可传入对应控件原始的 slots */
  componentSlots?: { [k: string]: any }
}

interface TableColumn {
  /* 显示于列头文本 */
  label?: string

  /** 对应列内容的字段名 */
  prop?: string

  /** 列宽 */
  width?: string | number

  /** 列对齐方式 */
  align?: 'left' | 'center' | 'right'

  /** 列是否固定在左侧或者右侧，true 表示固定在左侧 */
  fixed?: boolean | 'left' | 'right'

  /** 内容格式化方法，可简单进行字符串格式化 */
  formatter?: (row: any) => string

  /** 单元格渲染方法，可使用 JSX */
  render?: ({
    row,
    column,
    $index
  }: {
    row: any
    column: any
    $index: number
  }) => VNode

  /** 子列 */
  children?: TableColumn
}

declare class ListviewProps {
  /** 设置页面顶部通栏内的页面标题文本。 default: '' */
  headerTitle: string

  /** 设置页面顶部通栏内的面包屑。 default: [] */
  headerNav: Array<string | HeaderNavObjectType>

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
  filterModel: { [k: string]: any }

  /** 是否显示搜索栏的“提交”按钮。 default: true */
  showFilterSearch: boolean

  /** 是否显示搜索栏的“重置”按钮。 default: true */
  showFilterReset: boolean

  /** 表格列配置。 default: [] */
  tableColumns: TableColumn[]

  /** 可传入 <el-table> 的所有支持属性。 default: {} */
  tableProps: { [k: string]: any }

  /** 可传入 <el-table> 的所有支持事件。 default: {} */
  tableEvents: { [k: string]: () => void }

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

declare class ListviewContainerProps extends Vue {
  headerTitle: ListviewProps['headerTitle']
  headerNav: ListviewProps['headerNav']
}

declare class Listview extends ListviewProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

declare class ListviewContainer extends ListviewContainerProps {
  static install(Vue: VueConstructor<Vue>, options: any): void
}

export default Listview
export {
  Listview,
  ListviewContainer,
  ListviewProps,
  ListviewContainerProps,
  FilterButton,
  FilterField,
  TableColumn
}
