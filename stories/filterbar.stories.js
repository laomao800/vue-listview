import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import {
  filterButtons,
  filterButtonsFull,
  filterFields,
  filterFieldsFull
} from './props.js'
import Filterbar from '@/listview/components/filterbar'

function createWrapper(props = {}) {
  return () => ({
    components: { Filterbar },
    template: `
      <div style="padding:10px">
        <filterbar
          ref="filterbar"
          v-bind="props"
          @filter-submit="filterSubmit"
          @filter-reset="filterReset"
        />
      </div>
    `,
    data: () => ({
      props
    }),
    methods: {
      filterSubmit(model) {
        action('filter-submit')(model)
      },
      filterReset(model) {
        action('filter-reset')(model)
      }
    },
    mounted() {
      window.addEventListener('resize', this.$refs.filterbar.updateLayout)
    }
  })
}

const stories = storiesOf('Filterbar', module).addDecorator(withKnobs)

stories.add(
  '1. 常规布局',
  createWrapper({
    filterButtons,
    filterFields
  })
)

stories.add(
  '2. 无操作按钮',
  createWrapper({
    filterButtons: [],
    filterFields
  })
)

stories.add(
  '3. 搜索字段较多会自动折叠',
  createWrapper({
    filterButtons,
    filterFields: filterFieldsFull
  })
)

stories.add(
  '4. 所有按钮、字段类型',
  createWrapper({
    filterButtons: filterButtonsFull,
    filterFields: filterFieldsFull
  }),
  {
    notes: '点击“搜索”在下方“ACTION LOGGER”面板会返回搜索栏数据（model）'
  }
)

stories.add('5. 所有按钮、字段类型', () => {
  const showFilterSearch = boolean('showFilterSearch', true)
  const showFilterReset = boolean('showFilterReset', true)
  return createWrapper({
    filterButtons: filterButtonsFull,
    filterFields: filterFieldsFull,
    showFilterSearch,
    showFilterReset
  })()
})
