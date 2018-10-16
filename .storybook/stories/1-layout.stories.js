import { storiesOf } from '@storybook/vue'
import {
  filterButtons,
  filterButtonsFull,
  filterFields,
  filterFieldsFull,
  tableColumns
} from './props.js'

function createWrapper(props = {}) {
  return () => ({
    template: '<listview v-bind="props" />',
    data: () => ({
      props: {
        filterButtons,
        filterFields,
        tableColumns,
        ...props
      }
    })
  })
}

const stories = storiesOf('整体布局', module)

stories.add('1. 默认铺满屏幕高度', createWrapper())

stories.add(
  '2. 指定高度',
  createWrapper({
    height: 500
  })
)

stories.add(
  '3. 自动高度',
  createWrapper({
    fullHeight: false
  })
)

stories.add(
  '4. 带面包屑',
  createWrapper({
    headerTitle: '演示列表',
    headerNav: [{ text: '菜单1' }, { text: '菜单2' }]
  })
)

stories.add(
  '5. 所有按钮、字段类型',
  createWrapper({
    filterButtons: filterButtonsFull,
    filterFields: filterFieldsFull
  })
)
