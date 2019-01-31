<template>
  <listview
    :filter-fields="filterFields"
    :table-columns="tableColumns"
    :request-handler="requestHandler"
    :validate-response="validateResponse"
    :content-data-map="contentDataMap"
  />
</template>

<script>
export default {
  data() {
    return {
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
      ],

      // 若响应格式与默认有差别，可在此设置验证逻辑
      validateResponse(response) {
        try {
          return response.success
        } catch (e) {
          return false
        }
      },

      // 若响应格式与默认有差别，可在此设置内容映射表
      contentDataMap: {
        items: 'custom_result.items',
        total: 'custom_result.total'
      }
    }
  },
  methods: {
    requestHandler(requestData) {
      this.$message(`requestData: ${JSON.stringify(requestData)}`)
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            custom_result: {
              items: [
                {
                  sku: 'sku10001',
                  name: '名称10001'
                },
                {
                  sku: 'sku10002',
                  name: '名称10002'
                }
              ],
              total: 2
            }
          })
        }, 800)
      })
    }
  }
}
</script>
