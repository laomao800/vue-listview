# 搜索栏操作按钮 loading 效果

通常可用在“导出”功能下，用于防止按钮被短时间内多次点击。

```vue
<template>
  <listview :filter-buttons="filterButtons" />
</template>

<script>
export default {
  // ...
  data() {
    return {
      exportBtnLoading: false,
      filterButtons: [
        // 普通按钮通过 object 类型定义即可
        {
          type: 'success',
          text: '添加',
          icon: 'el-icon-plus',
          click: this.handleRefund
        },

        // 需要更改 loading 状态的按钮由于需要获取 this 上的数据，因此需要使用 JSX 来定义
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
      // 一些异步操作...

      // 注意这里如果是后端接口直接返回文件（如 excel 文件）等，由于响应的非 xml 类型，
      // 因此就算用 iframe 打开也无法触发事件，这种情况只能简单用定时器修改 loading 状态
      setTimeout(() => {
        this.exportBtnLoading = false
      }, 2000)
    }
  }
}
</script>
```
