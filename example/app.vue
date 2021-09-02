<script lang="jsx">
import './common.less'
import { create as createListview, ListviewContainer } from '@/'
import CustomFilterbar from './CustomFilterbar.vue'
import CustomContent from './CustomContent.vue'
// import ListPage from './ListPage.vue'

const Listview1 = createListview({
  validateResponse: (res) => res.success,
  resolveResponseErrorMessage: (res) => {
    try {
      return res.error_info.msg
    } catch (e) {
      return '未知错误'
    }
  },
  _replaceComponents: {
    filterbar: CustomFilterbar,
    content: CustomContent,
  },
})

export default {
  name: 'App',

  render() {
    return (
      <el-button size="small" on={{ click: () => console.log(123) }}>
        button
      </el-button>
    )
  },

  components: {
    Listview: Listview1,
    ListviewContainer,
    // ListPage,
  },

  data() {
    return {
      loadingSelection: false,
      filterButtons: [
        {
          type: 'success',
          icon: 'el-icon-circle-plus-outline',
          text: '添加',
          click: () => this.showMessage('添加'),
        },
        () => (
          <el-button
            loading={this.loadingSelection}
            icon="el-icon-remove-outline"
            type="danger"
            on-click={() => {
              if (this.selection.length < 1) {
                this.$message.error('请至少选择一条数据')
              } else {
                this.loadingSelection = true
                setTimeout(() => {
                  this.$message.success(
                    JSON.stringify(this.selection.map((row) => row.id))
                  )
                  this.loadingSelection = false
                }, 500)
              }
            }}
          >
            查看已选
          </el-button>
        ),
        {
          type: 'primary',
          icon: 'el-icon-circle-plus-outline',
          text: '下拉按钮',
          trigger: 'click',
          splitButton: true,
          click: () => {
            this.showMessage('下拉按钮')
          },
          children: [
            {
              icon: 'el-icon-circle-plus-outline',
              text: '菜单1',
              click: () => {
                this.showMessage('菜单1')
              },
            },
            {
              icon: 'el-icon-remove-outline',
              text: '菜单2',
              click: () => {
                this.showMessage('菜单2')
              },
            },
          ],
        },
      ],

      filterModel: {
        hidden: 'hidden',
        multipleSelect: [],
      },
      filterModel2: {},

      filterFields: [
        {
          type: 'select',
          model: 'error',
          label: '特定数据',
          options: [
            { label: '响应成功，内容错误', value: 'apiError' },
            { label: '响应错误', value: 'httpError' },
            { label: '响应空内容', value: 'empty' },
          ],
        },
        {
          type: 'text',
          model: 'name',
          label: '文本字段',
          componentSlots: {
            prepend: '$',
            append: '$',
          },
          componentProps: {
            'suffix-icon': 'el-icon-date',
          },
        },
        [
          {
            type: 'label',
            label: '支持组合',
          },
          {
            type: 'text',
            label: '组合多个字段为整体',
            model: 'group-text-1',
          },
          {
            type: 'text',
            label: '避免被自动收起拆开',
            model: 'group-text-2',
          },
        ],
        [
          {
            type: 'number',
            label: '数字',
            model: 'number',
          },
          {
            type: 'label',
            label: '文本标签',
          },
        ],
        {
          type: 'select',
          model: 'select',
          label: '单选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        {
          type: 'select',
          model: 'promiseOptions',
          label: 'promiseOptions',
          options: new Promise((resolve) => {
            setTimeout(() => {
              resolve([
                { label: '单选项 1', value: 1 },
                { label: '单选项 2', value: 2 },
                { label: '单选项 3', value: 3 },
              ])
            }, 5000)
          }),
        },
        {
          type: 'multipleSelect',
          model: 'asyncOptions',
          label: 'asyncOptions',
          options: (done) => {
            setTimeout(() => {
              done([
                { label: '多选项 1', value: 1 },
                { label: '多选项 2', value: 2 },
                { label: '多选项 3', value: 3 },
              ])
            }, 3000)
          },
        },
        {
          type: 'date',
          model: 'date',
          label: '日期选择',
        },
        {
          type: 'dateRange',
          model: 'dateRange',
          label: '日期范围',
        },
        {
          type: 'timeSelect',
          model: 'timeSelect',
          label: '固定时间',
        },
        {
          type: 'timePicker',
          model: 'timePicker',
          label: '任意时间',
        },
        {
          type: 'timePickerRange',
          model: 'timePickerRange',
          label: '时间范围',
        },
        {
          type: 'dateTime',
          model: 'dateTime',
          label: '日期时间',
        },
        {
          type: 'dateTimeRange',
          model: 'dateTimeRange',
          label: '日期时间范围',
        },
        {
          type: 'cascader',
          model: 'cascader',
          label: '级联选项',
          options: [
            {
              value: '1',
              label: '菜单1',
              children: [
                {
                  value: '2',
                  label: '菜单2',
                  children: [
                    {
                      value: '3',
                      label: '菜单3',
                      children: [
                        {
                          value: '4',
                          label: '菜单4',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      filterFields2: [
        {
          type: 'select',
          model: 'error',
          label: '特定数据',
          options: [
            { label: '响应成功，内容错误', value: 'apiError' },
            { label: '响应错误', value: 'httpError' },
            { label: '响应空内容', value: 'empty' },
          ],
        },
      ],

      selection: [],
      tableColumns: [
        {
          label: 'id',
          prop: 'id',
          width: 100,
          align: 'center',
          fixed: true,
        },
        {
          label: 'name',
          prop: 'name',
          width: 200,
          align: 'center',
          fixed: true,
        },
        {
          label: '操作',
          width: 150,
          align: 'center',
          fixed: true,
          render: () => {
            return (
              <div>
                <el-button
                  on-click={(e) => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="success"
                >
                  审核
                </el-button>
                <el-button
                  on-click={(e) => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="danger"
                >
                  删除
                </el-button>
              </div>
            )
          },
        },
        { label: '销售员', prop: 'seller' },
        { label: '仓库', prop: 'warehouse' },
        { label: '零售价格', prop: 'sale_price' },
        {
          label: '折扣率',
          align: 'center',
          formatter: (row) => row.discount.toFixed(2),
        },
        {
          label: '折后价',
          align: 'center',
          formatter: (row) => (row.discount * row.sale_price).toFixed(2),
        },
        {
          label: '折扣时间',
          align: 'center',
          children: [
            { label: '折扣开始', prop: 'date' },
            { label: '折扣结束', prop: 'date' },
          ],
        },
        { label: '数量', prop: 'quantity' },
        {
          label: '是否启用',
          align: 'center',
          render: (prop) => {
            if (prop.row.enable) {
              return <div style="color:#67c23a">启用</div>
            } else {
              return <div style="color:#f56c6c">禁用</div>
            }
          },
        },
        { label: '创建人', prop: 'seller' },
        { label: '创建时间', prop: 'date' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller' },
            { label: '修改时间', prop: 'date' },
          ],
        },
      ],
    }
  },

  methods: {
    showMessage(msg) {
      this.$message.success(msg)
    },
  },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="less" scoped>
.item-list {
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  list-style: none;

  li {
    box-sizing: border-box;
    float: left;
    width: 12.5%;
    padding: 10px;
    margin: 0 -1px -1px 0;
    border: 1px solid #ddd;

    .thumb img {
      width: 100%;
    }

    .info {
      padding: 5px;

      .id {
        font-size: 12px;
        color: #999;
      }
      .name {
        height: 1.6em;
        overflow: hidden;
        font-size: 14px;
        line-height: 1.6em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .action {
      button {
        padding: 4px 8px;
      }
    }
  }
}

@media (max-width: 1360px) {
  .item-list li {
    width: 20%;
  }
}
</style>
