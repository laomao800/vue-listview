/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs/vue'
import { withReadme } from 'storybook-readme'

import Readme from '../docs/layout.md'

const filterButtons = [
  {
    type: 'success',
    icon: 'el-icon-circle-plus-outline',
    content: '添加'
  }
]
const filterFields = [
  {
    type: 'text',
    model: 'name',
    label: '文本字段',
    componentProps: { 'suffix-icon': 'el-icon-date' }
  }
]
const tableColumns = [
  {
    label: '自定义标签',
    prop: 'sku',
    width: 100,
    align: 'center'
  },
  {
    label: '产品名称',
    prop: 'name',
    width: 200,
    align: 'center'
  }
]

const stories = storiesOf('布局', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withReadme(Readme))

stories.add(
  '默认铺满屏幕高度',
  () => ({
    template: `
      <Listview
        :filter-buttons="filterButtons"
        :filter-fields="filterFields"
        :table-columns="tableColumns"
      />
    `,
    data: () => ({
      filterButtons,
      filterFields,
      tableColumns
    })
  }),
  { notes: '默认垂直铺满屏幕高度' }
)

stories.add(
  '指定高度',
  () => {
    const height = number('height', 300)
    return {
      template: `
        <Listview
          height="${height}"
          :filter-buttons="filterButtons"
          :filter-fields="filterFields"
          :table-columns="tableColumns"
        />
      `,
      data: () => ({
        filterButtons,
        filterFields,
        tableColumns
      })
    }
  },
  {
    notes:
      '指定组件垂直高度，尺寸包括顶部搜索栏，底部页码，页面外圈留白装饰区域。'
  }
)

stories.add(
  '自动高度',
  () => ({
    template: `
    <Listview
      :fullHeight="false"
      :filter-buttons="filterButtons"
      :filter-fields="filterFields"
      :table-columns="tableColumns"
    />
  `,
    data: () => ({
      filterButtons,
      filterFields,
      tableColumns
    })
  }),
  {
    notes: 'fullHeight 为 false 则会根据内容尺寸自动往下方撑开高度'
  }
)
