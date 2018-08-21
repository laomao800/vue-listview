import { storiesOf } from '@storybook/vue'
import { withKnobs } from '@storybook/addon-knobs/vue'
import { withReadme } from 'storybook-readme'
import {
  filterButtons,
  filterButtonsFull,
  filterFields,
  filterFieldsFull,
  tableColumns
} from './props.js'
import Readme from '../docs/layout.md'

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
stories.addDecorator(withKnobs)
stories.addDecorator(withReadme(Readme))

stories.add('1. 默认铺满屏幕高度', createWrapper(), {
  notes: '默认垂直铺满屏幕高度'
})

stories.add(
  '2. 指定高度',
  createWrapper({
    height: 500
  }),
  {
    notes:
      '指定组件垂直高度，尺寸包括顶部搜索栏，底部页码，页面外圈留白装饰区域。'
  }
)

stories.add(
  '3. 自动高度',
  createWrapper({
    fullHeight: false
  }),
  {
    notes: 'fullHeight 为 false 则会根据内容尺寸自动往下方撑开高度'
  }
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
    headerTitle: '演示列表',
    headerNav: [{ text: '菜单1' }, { text: '菜单2' }],
    filterButtons: filterButtonsFull,
    filterFields: filterFieldsFull
  })
)
