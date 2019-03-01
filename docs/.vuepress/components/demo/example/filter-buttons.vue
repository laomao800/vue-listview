<template>
  <div>
    <listview
      :request-url="requestUrl"
      :filter-buttons="filterButtons"
      :filter-fields="filterFields"
      :filter-model="filterModel"
      :table-selection.sync="tableSelection"
      :table-columns="tableColumns"
    />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      exportLoading: false,

      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
      filterButtons: [
        {
          text: '添加',
          type: 'success',
          icon: 'el-icon-plus',
          click: () => (this.dialogVisible = true)
        },
        {
          text: '批量删除',
          type: 'danger',
          icon: 'el-icon-delete',
          click: async () => {
            if (this.tableSelection.length < 1) {
              this.$message.error('请至少选择一条数据')
            } else {
              await this.$confirm(
                `确认删除选中的 ${this.tableSelection.length} 条记录吗？`,
                {
                  type: 'warning'
                }
              )
              this.$message.success('删除成功')
            }
          }
        },
        () => (
          <el-button
            loading={this.exportLoading}
            type="primary"
            plain
            icon="el-icon-download"
            on-click={this.handleExport}
          >
            导出
          </el-button>
        )
      ],
      filterFields: [
        {
          type: 'text',
          model: 'name',
          label: '文本字段'
        },
        {
          type: 'select',
          model: 'status',
          label: '带有默认值的字段',
          options: [
            { label: '选项1', value: 1 },
            { label: '选项2', value: 2 },
            { label: '选项3', value: 3 }
          ]
        }
      ],
      filterModel: {
        status: 3
      },
      tableColumns: [
        {
          label: '自定义标签',
          prop: 'sku',
          align: 'center'
        },
        {
          label: '产品名称',
          prop: 'name',
          align: 'center'
        }
      ],
      tableSelection: []
    }
  },
  methods: {
    handleExport() {
      this.exportLoading = true
      setTimeout(() => {
        this.exportLoading = false
        this.$message.success('导出成功')
      }, 1500)
    }
  }
}
</script>
