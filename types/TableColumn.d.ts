import { VNode } from 'vue'

export interface TableColumn {
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
    $index,
  }: {
    row: any
    column: any
    $index: number
  }) => VNode

  /** 子列 */
  children?: TableColumn
}
