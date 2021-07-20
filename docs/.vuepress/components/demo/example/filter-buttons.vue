<template>
  <div>
    <listview v-bind="lvConfig" />
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Dialog from 'element-ui/lib/dialog'
import 'element-ui/lib/theme-chalk/dialog.css'
export default {
  components: {
    ElDialog: Dialog,
  },
  data() {
    return {
      dialogVisible: false,
      exportLoading: false,

      selection: [],
      lvConfig: {
        contentDataMap: null,
        requestHandler: () => ({
          items: Array.from(Array(30), (_n, i) => ({
            id: i,
            name: `name ${i}`,
          })),
          total: 30,
        }),
        filterButtons: [
          {
            text: '添加',
            type: 'success',
            icon: 'el-icon-plus',
            click: () => (this.dialogVisible = true),
          },
          {
            text: '批量删除',
            type: 'danger',
            icon: 'el-icon-delete',
            click: async () => {
              if (this.selection.length < 1) {
                alert('请至少选择一条数据')
              } else {
                window.confirm(
                  `确认删除选中的 ${this.selection.length} 条记录吗？`
                )
                alert('删除成功')
              }
            },
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
          ),
        ],
        filterModel: {
          status: 3,
        },
        filterFields: [
          {
            type: 'text',
            model: 'name',
            label: '文本字段',
          },
          {
            type: 'select',
            model: 'status',
            label: '带有默认值的字段',
            options: [
              { label: '选项1', value: 1 },
              { label: '选项2', value: 2 },
              { label: '选项3', value: 3 },
            ],
          },
        ],
        tableColumns: [
          { label: 'id', prop: 'id', width: 120 },
          { label: 'name', prop: 'name' },
        ],
      },
    }
  },
  methods: {
    handleExport() {
      this.exportLoading = true
      setTimeout(() => {
        this.exportLoading = false
        this.$message.success('导出成功')
      }, 1500)
    },
  },
}
</script>
