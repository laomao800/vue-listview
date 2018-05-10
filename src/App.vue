<template>
  <div id="app">
    <list-view
      title="折扣管理"
      :breadcrumb="breadcrumb"

      request-url="https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list"
      request-type="get"
      :request-config="{
        withCredencials: true,
        header: {
          foo: 'bar'
        }
      }"
      :request-handler="customDataRequest"
      :request-data-map="{ page: 'new_page_name', pageSize: 'new_pageSize_name' }"
      :response-data-map="{ data: 'result.items', total: 'result.total' }"
      :autoload="true"

      :filter-buttons="filterButtons"
      :filter-model="filterModel"
      :filters="filters"
      @filter-submit="handleFilterSubmit"

      :page-sizes="[20, 50, 100]"
      :page-size="20"
    >
      <template slot-scope="props">
        <!-- <pre :style="{ height: `${props.height}px`, background: '#ddd', overflow: 'auto', margin: 0 }">{{ props }}</pre> -->
        <el-table
          ref="contentTable"
          :data="props.data"
          :height="props.height"
          @row-click="handleRowClick"
          @selection-change="handleListSelectionChange"
          border
          size="small"
          class="data-content__table"
          style="width: 100%">
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
            <el-table-column label="修改人" />
            <el-table-column label="修改时间" />
          </el-table-column>
        </el-table>
      </template>
    </list-view>

    <el-dialog title="提示" :visible.sync="addModalVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addModalVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addModalVisible = false">确 定</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
import ListView from './components/list-view.vue'

export default {
  name: 'App',

  components: {
    ListView
  },

  data () {
    return {
      addModalVisible: false,

      breadcrumb: [
        { text: '首页' },
        { text: '折扣管理1' },
        { text: '折扣管理2' }
      ],

      filterModel: {},
      filterButtons: [
        <el-button type="success" icon="el-icon-circle-plus-outline" onClick={this.showAddModal}>添加</el-button>,
        <el-button type="danger" icon="el-icon-remove-outline" onClick={this.test}>批量删除</el-button>
      ],
      // Input Select Cascader TimePicker DatePicker DateTimePicker
      filters: [
        {
          model: 'hidden',
          value: 'hidden text'
        },
        {
          type: 'input',
          model: 'name',
          label: '文本字段'
        },
        {
          type: 'select',
          model: 'select',
          label: '单选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 }
          ]
        },
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 }
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
          label: '日期范围',
          componentProps: {
            placeholder: '活动时间',
            rangeSeparator: '至',
            startPlaceholder: '开始日期',
            endPlaceholder: '结束日期'
          }
        }
      ]
    }
  },

  methods: {
    showAddModal () {
      this.addModalVisible = true
    },
    test () {
      alert(JSON.stringify(this.breadcrumb))
    },
    // Table
    handleRowClick (row) {
      this.$refs.contentTable.toggleRowSelection(row)
    },
    handleListSelectionChange (val) {
      this.listSelection = val
    },
    handleFilterSubmit (data) {
      console.log('filter', data)
    },
    async customDataRequest () {
      return new Promise((resolve) => {
        setTimeout(() => resolve({
          result: {
            items: [
              { sku: 'sku 1' },
              { sku: 'sku 2' },
              { sku: 'sku 3' }
            ],
            total: 3
          }
        }), 500)
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

<style>
html, body, #app {
  height: 100%;
}
</style>
