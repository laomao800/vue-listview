import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, boolean } from '@storybook/addon-knobs/vue'
import { withReadme } from 'storybook-readme'
import { filterButtons, filterFields, tableColumns } from './props.js'
import Readme from '../docs/layout.md'

const stories = storiesOf('整体布局', module)
stories.addDecorator(withKnobs)
stories.addDecorator(withReadme(Readme))

stories.add(
  '1. 默认铺满屏幕高度',
  () => ({
    template: `
      <listview
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
  '2. 指定高度',
  () => {
    const height = number('height (指定高度)', 300)
    const fullHeight = boolean('fullHeight (垂直满屏)', true)
    const contentMinHeight = number('contentMinHeight (内容区域最小高度)', 100)
    return {
      template: `
        <listview
          height="${height}"
          :fullHeight="${fullHeight}"
          :contentMinHeight="${contentMinHeight}"
          :filter-buttons="filterButtons"
          :filter-fields="filterFields"
          :table-columns="tableColumns"
        />
      `,
      mounted() {
        action('mounted')(this)
      },
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
  '3. 自动高度',
  () => ({
    template: `
    <listview
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
