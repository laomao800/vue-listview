<template>
  <div>
    <div class="main">
      <!-- eslint-disable vue/attributes-order vue/max-attributes-per-line -->
      <list-view
        :autoload="true"
        :request-url="'/mock/listview/list'"
        :request-type="'post'"
        :request-config="{
          'withCredencials': true,
          'headers': {
            'foo': 'bar'
          }
        }"
        :request-transform="(data) => data"
        :request-data-map="{ page: 'new_page_name', pageSize: 'new_pageSize_name' }"
        :response-transform="(data) => {
          return {
            result: {
              items: [{ sku: '123' }],
              total: 1
            }
          }
        }"
        :response-data-map="{ data: 'result.items', total: 'result.total' }"

        :filter-buttons="filterButtons"
        :filter-schema="filterSchema"
        :filter-model="filterModel"

        :use-page="true"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
      >
        <template slot-scope="props">
          <pre
            :style="{
              background: 'ddd',
              overflow: 'auto',
              margin: 0
            }"
          >{{ props }}</pre>
          <el-table
            ref="contentTable"
            :data="props.contentData.data"
            :height="props.contentHeight"
            :style="{ width: '100%' } "
            border
            size="small"
            class="data-content__table"
            @row-click="handleRowClick"
            @selection-change="handleListSelectionChange">
            <el-table-column type="selection" width="50" align="center" prop="id" />
            <el-table-column label="自定义标签" prop="sku" align="center" width="100" />
            <el-table-column label="产品名称" />
            <el-table-column label="操作" align="center" />
            <el-table-column label="品项" />
            <el-table-column label="销售员" />
            <el-table-column label="仓库" />
            <el-table-column label="零售价格" align="center" />
            <el-table-column label="折扣率" align="center" />
            <el-table-column label="折后价" align="center" />
            <el-table-column label="折扣时间" align="center">
              <el-table-column label="折扣开始" />
              <el-table-column label="折扣结束" />
            </el-table-column>
            <el-table-column label="数量" align="center" />
            <el-table-column label="是否启用" align="center" />
            <el-table-column label="创建人" />
            <el-table-column label="创建时间" />
            <el-table-column label="最后修改" align="center">
              <el-table-column label="修改人" align="center" />
              <el-table-column label="修改时间" align="center" />
            </el-table-column>
          </el-table>
        </template>
      </list-view>
    </div>

    <el-dialog
      :visible.sync="modalVisible"
      title="提示"
      width="30%">
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer">
        <el-button
          size="small"
          @click="modalVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="modalVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ListView from '@/list-view'

export default {
  name: 'ListViewPage',

  components: {
    ListView
  },

  data() {
    return {
      modalVisible: false,

      filterButtons: [
        <el-button
          type="success"
          icon="el-icon-circle-plus-outline"
          onClick={this.showAddModal}
        >
          添加
        </el-button>,
        <el-button
          type="danger"
          icon="el-icon-remove-outline"
          onClick={this.test}
        >
          批量删除
        </el-button>
      ],
      filterModel: {
        hidden: 'hidden'
      },
      filterSchema: [
        {
          type: 'text',
          model: 'name',
          label: '文本字段',
          componentProps: {
            'suffix-icon': 'el-icon-date'
          }
        },
        {
          type: 'text',
          model: 'name2',
          label: '禁用文本',
          disabled: true
        },
        {
          type: 'select',
          model: 'select',
          label: '单选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ]
        },
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ]
        },
        {
          type: 'date',
          model: 'date',
          label: '日期选择'
        },
        {
          type: 'dateRange',
          model: 'dateRange',
          label: '日期范围'
        },
        {
          type: 'timeSelect',
          model: 'timeSelect',
          label: '固定时间'
        },
        {
          type: 'timePicker',
          model: 'timePicker',
          label: '任意时间'
        },
        {
          type: 'timeRange',
          model: 'timeRange',
          label: '时间范围'
        },
        {
          type: 'dateTime',
          model: 'dateTime',
          label: '日期时间'
        },
        {
          type: 'dateTimeRange',
          model: 'dateTimeRange',
          label: '日期时间范围'
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
                          label: '菜单4'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  },

  methods: {
    showAddModal() {
      this.modalVisible = true
    },
    test() {
      alert(JSON.stringify(this.breadcrumb))
    },
    // Table
    handleRowClick(row) {
      this.$refs.contentTable.toggleRowSelection(row)
    },
    handleListSelectionChange(val) {
      this.listSelection = val
    },
    handleFilterSubmit(data) {
      console.log('filter', data)
    },
    customDataRequest() {
      return new Promise(resolve => {
        setTimeout(
          () =>
            resolve({
              result: {
                items: [{ sku: 'sku 1' }, { sku: 'sku 2' }, { sku: 'sku 3' }],
                total: 3
              }
            }),
          500
        )
      })
    }
    // contentTableRowClassName (row) {
    //   return this.listSelection.indexOf(row.row) > -1
    //     ? 'row-selected'
    //     : ''
    // },
  }
}
</script>
