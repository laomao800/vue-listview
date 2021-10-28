import { VNode } from 'vue'

interface SelectOption {
  label: string
  value: any
  disabled?: boolean
  children?: SelectOption[]
}

export type FieldType =
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

interface FieldEffectPayload {
  vm: Vue
  filterModel: Record<string, any>
}

export interface FilterField {
  type: FieldType

  /** 字段参数名 */
  model: string

  /** 字段文本说明 */
  label?: string

  key?: string

  width?: string | number

  trim?: boolean

  /** 显示为禁用状态 */
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

  effect?: (effectPayload: FieldEffectPayload) => void

  render?: () => VNode
}

export interface FilterFieldHasRender extends FilterField {
  render: () => VNode
}
