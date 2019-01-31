<template>
  <listview
    :autoload="false"
    :request-url="requestUrl"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
    :transform-request-data="transformRequestData"
    :content-message="{
      type: 'info',
      message: '初次打开页面不加载数据，请组合条件进行搜索。'
    }"
  />
</template>

<script>
export default {
  data() {
    return {
      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
      filterFields: [
        {
          type: 'text',
          model: 'text1',
          label: '文本字段'
        }
      ],
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
      ]
    }
  },
  methods: {
    transformRequestData(requestData) {
      if (!requestData.text1) {
        this.$message.error('请填写文本字段')
        return false
      }
    }
  }
}
</script>
