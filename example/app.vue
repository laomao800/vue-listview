<template>
  <div id="app">
    <listview-container
      :header-title="'演示列表容器'"
      :header-nav="['菜单1', { text: '菜单2' }]"
    >
      <listview1
        header-title="演示列表1"
        :header-nav="['菜单1', { text: '菜单2' }]"
        request-url="/mock/listview"
        request-method="post"
        :filter-buttons="filterButtons"
        :filter-fields="filterFields2"
        :filter-model="filterModel"
        :table-columns="tableColumns"
        :selection.sync="selection"
        :page-props="{ pagerCount: 5 }"
        key="1"
      />
      <ListPage />
      <div headerTitle="123">123</div>
      <listview1 header-title="演示列表2" />
    </listview-container>
  </div>
</template>

<script lang="jsx">
import './common.less'
import { create as createListview, ListviewContainer } from '@/'
import CustomFilterbar from './CustomFilterbar.vue'
import CustomContent from './CustomContent.vue'
import ListPage from './ListPage.vue'

const { component: component1 } = createListview({
  replaceComponents: {
    filterbar: CustomFilterbar,
    content: CustomContent,
  },
})

export default {
  name: 'App',

  components: {
    Listview1: component1,
    // Listview2: component2,
    ListviewContainer,
    ListPage,
  },

  computed: {
    config1() {
      return {
        headerTitle: 'title',
        headerNav: ['nav1', 'nav2'],
        // autoload: false,
        // contentMessage: '请使用查询条件检索',
        requestUrl: '/mock/listview',
        requestMethod: 'post',
        // pageProps: { pagerCount: 5 },
        validateResponse: (res) => res.success,
        resolveResponseErrorMessage: (err) => err.error_info.msg,
        filterButtons: this.filterButtons,
        filterFields: this.filterFields,
        filterModel: this.filterModel,
        tableColumns: this.tableColumns,
        selection: this.selection,
      }
    },
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
                    JSON.stringify(this.selection.map((row) => row.sku))
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
          label: 'name',
          model: 'name1',
          render: () => (
            <input
              on-input={(e) => (this.filterModel.name1 = e.target.value)}
            />
          ),
        },
        {
          type: 'select',
          model: 'error',
          label: '接口错误',
          options: [{ label: '触发500错误', value: 1 }],
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
          get: (val) => val.join(','),
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
          label: '接口错误1',
          options: [{ label: '触发500错误', value: 1 }],
        },
        {
          type: 'select',
          model: 'error2',
          label: '接口错误2',
          options: [{ label: '触发500错误', value: 1 }],
        },
      ],

      selection: [],
      tableColumns: [
        {
          label: '自定义标签',
          prop: 'sku',
          width: 100,
          align: 'center',
          fixed: true,
        },
        {
          label: '产品名称',
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
        { label: '销售员', prop: 'seller', align: 'center' },
        { label: '仓库', prop: 'warehouse', align: 'center' },
        { label: '零售价格', prop: 'sale_price', align: 'center' },
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
            { label: '折扣开始', prop: 'date', align: 'center' },
            { label: '折扣结束', prop: 'date', align: 'center' },
          ],
        },
        { label: '数量', prop: 'quantity', align: 'center' },
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
        { label: '创建人', prop: 'seller', align: 'center' },
        { label: '创建时间', prop: 'date', align: 'center' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller', align: 'center' },
            { label: '修改时间', prop: 'date', align: 'center' },
          ],
        },
      ],
    }
  },

  data1() {
    return {
      selection: [],
      filterButtons: [
        null,
        {},
        {
          type: 'success',
          icon: 'el-icon-circle-plus-outline',
          text: '添加',
          click: () => {
            this.$message('添加')
          },
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
                    JSON.stringify(this.selection.map((row) => row.sku))
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
          splitButton: true,
          click: () => {
            this.$message.success('下拉按钮')
          },
          children: [
            {
              icon: 'el-icon-circle-plus-outline',
              text: '菜单1',
              click: () => {
                this.$message.success('菜单1')
              },
            },
            {
              icon: 'el-icon-remove-outline',
              text: '菜单2',
              click: () => {
                this.$message.success('菜单2')
              },
            },
          ],
        },
      ],
      filterFields1: [
        {
          label: 'label',
          model: 'text',
          render: () => (
            <input
              value={this.filterModel.text}
              on-input={(e) =>
                this.$set(this.filterModel, 'text', e.target.value)
              }
            />
          ),
        },
        () => (
          <input
            value={this.filterModel.text}
            on-input={(e) =>
              this.$set(this.filterModel, 'text', e.target.value)
            }
          />
        ),
        <input
          on-input={(e) => this.$set(this.filterModel, 'text', e.target.value)}
        />,
        null,
        {},
        {
          type: 'select',
          model: 'select1',
          label: 'select1',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
          ],
        },
        {
          type: 'select',
          model: 'select2',
          label: 'select2',
          options: () => [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        {
          type: 'multipleSelect',
          model: 'select3',
          label: 'select3',
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
          type: 'select',
          model: 'select4',
          label: 'select4',
          options: () =>
            new Promise((resolve) => {
              resolve([
                { label: '单选项 1', value: 1 },
                { label: '单选项 2', value: 2 },
                { label: '单选项 3', value: 3 },
              ])
            }),
        },
        {
          type: 'select',
          model: 'select5',
          label: 'select5',
          options: (done) => {
            setTimeout(() => {
              done([
                { label: '单选项 1', value: 1 },
                { label: '单选项 2', value: 2 },
                { label: '单选项 3', value: 3 },
              ])
            }, 5000)
          },
        },
      ],
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
      filterModel: {
        hidden: 'hidden',
        multipleSelect: [],
      },
      tableColumns: [
        {
          label: '自定义标签',
          prop: 'sku',
          width: 100,
          align: 'center',
          fixed: true,
        },
        {
          label: '产品名称',
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
        { label: '销售员', prop: 'seller', align: 'center' },
        { label: '仓库', prop: 'warehouse', align: 'center' },
        { label: '零售价格', prop: 'sale_price', align: 'center' },
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
            { label: '折扣开始', prop: 'date', align: 'center' },
            { label: '折扣结束', prop: 'date', align: 'center' },
          ],
        },
        { label: '数量', prop: 'quantity', align: 'center' },
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
        { label: '创建人', prop: 'seller', align: 'center' },
        { label: '创建时间', prop: 'date', align: 'center' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller', align: 'center' },
            { label: '修改时间', prop: 'date', align: 'center' },
          ],
        },
      ],
    }
  },

  methods: {
    selectionChange(val) {
      // eslint-disable-next-line no-console
      console.log('selectionChange', val)
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
