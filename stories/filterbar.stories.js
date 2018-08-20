import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import {
  filterButtons,
  filterButtonsFull,
  filterFields,
  filterFieldsFull
} from './props.js'
import Filterbar from '@/listview/components/filterbar'

function createWrapper(options = {}) {
  return () => ({
    components: { Filterbar },
    template: `
      <div style="padding:10px">
        <filterbar
          :filter-buttons="filterButtons"
          :filter-fields="filterFields"
          @filter-submit="filterSubmit"
          @filter-reset="filterReset"
        />
      </div>
    `,
    data: () => ({
      filterButtons,
      filterFields
    }),
    methods: {
      filterSubmit(model) {
        action('filter-submit')(model)
      },
      filterReset(model) {
        action('filter-reset')(model)
      }
    },
    ...options
  })
}

const stories = storiesOf('Filterbar', module)

stories.add('1. 常规布局', createWrapper())

stories.add(
  '2. 无操作按钮',
  createWrapper({
    data: () => ({
      filterButtons: [],
      filterFields
    })
  })
)

stories.add(
  '3. 搜索字段较多会自动折叠',
  createWrapper({
    data: () => ({
      filterButtons,
      filterFields: filterFieldsFull
    })
  })
)

stories.add(
  '4. 所有按钮、字段类型',
  createWrapper({
    data: () => ({
      filterButtons: filterButtonsFull,
      filterFields: filterFieldsFull
    })
  })
)
