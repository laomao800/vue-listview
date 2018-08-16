/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import { withKnobs, number } from '@storybook/addon-knobs/vue'

import Listview from '@/'

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

const stories = storiesOf('整体尺寸', module)
stories.addDecorator(withKnobs)

stories.add(
  '默认铺满屏幕高度',
  () => ({
    components: { Listview },
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
      components: { Listview },
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
  { notes: '通过设置 <code>height</code> 属性可指定 Listview 整体高度' }
)

stories.add('自动高度', () => ({
  components: { Listview },
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
}))
