import { storiesOf } from '@storybook/vue'
import { withReadme } from 'storybook-readme'
import { filterFields } from './props.js'

// demo docs
import LoadingButton from './demo/loading-button.md'
import FilterbarSlot from './demo/filterbar-slot.md'
import CustomFieldLabel from './demo/custom-field-label.md'

const stories = storiesOf('特殊案例 demo', module)

stories.add(
  '1. 搜索栏操作按钮 loading 状态',
  withReadme(LoadingButton, () => ({
    template: `
      <listview
        :filter-buttons="filterButtons"
        :filter-fields="filterFields"
      />
    `,
    data() {
      return {
        filterFields,
        exportBtnLoading: false,
        filterButtons: [
          {
            type: 'success',
            text: '添加',
            icon: 'el-icon-plus',
            click: this.handleRefund
          },

          () => (
            <el-button
              loading={this.exportBtnLoading}
              icon="el-icon-download"
              on-click={this.handleExport}
            >
              导出Excel
            </el-button>
          )
        ]
      }
    },
    methods: {
      handleExport() {
        this.exportBtnLoading = true
        setTimeout(() => {
          this.exportBtnLoading = false
        }, 1500)
      }
    }
  }))
)

stories.add(
  '2. 自定义右侧附加操作按钮',
  withReadme(FilterbarSlot, () => ({
    template: `
      <listview :filter-fields="filterFields">
        <el-button slot="prepend-filterbar-submit" type="danger" icon="el-icon-edit">一键重算</el-button>
        <el-button slot="append-filterbar-submit" type="success" icon="el-icon-edit">一键重算</el-button>
      </listview>
    `,
    data() {
      return {
        filterFields
      }
    }
  }))
)

stories.add(
  '3. 自定义组件绑定 label',
  withReadme(CustomFieldLabel, () => ({
    template: `<listview :filter-fields="filterFields" :filter-model="filterModel" />`,
    data() {
      return {
        filterModel: {
          select: null
        },
        filterFields: [
          {
            model: 'select',
            label: '选项提示',
            render: () => (
              <select
                style="height:32px;width:100px"
                value={this.filterModel.select}
                on-change={e => {
                  this.$set(this.filterModel, 'select', e.target.value)
                }}
              >
                <option value="" />
                <option value="1">选项1</option>
                <option value="2">选项2</option>
              </select>
            )
          }
        ]
      }
    }
  }))
)
