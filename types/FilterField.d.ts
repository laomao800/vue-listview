import { VNode } from 'vue'

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

interface SelectOption {
  label: string
  value: any
  children?: SelectOption[]
}

export interface FilterFieldBase {
  /** 字段提交参数名 */
  model: string

  /** 字段文本说明 */
  label: string

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

export interface FilterFieldObjectDefinition extends FilterFieldBase {
  type: FieldType
}

export interface FilterFieldRenderDefinition extends FilterFieldBase {
  render: () => VNode
}

type FilterField = FilterFieldObjectDefinition | FilterFieldRenderDefinition
