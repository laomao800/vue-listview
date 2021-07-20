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
      filterFields: [{ type: 'text', model: 'name', label: 'name' }],
      tableColumns: [
        { label: 'id', prop: 'id', width: 120 },
        { label: 'name', prop: 'name' },
      ],

      // 响应数据验证方法，可配合 resolveResponseErrorMessage 显示错误提示
      validateResponse(response) {
        try {
          return response.success
        } catch (e) {
          return false
        }
      },

      // 若响应格式与默认有差别，可在此设置内容映射表
      // 设为 null 则不进行映射，直接使用响应内容
      contentDataMap: {
        items: 'custom_result.items',
        total: 'custom_result.total',
      },
    }
  },
  methods: {
    requestHandler(requestData) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            custom_result: {
              items: [
                { id: 'id10001', name: `name10001${requestData.name || ''}` },
                { id: 'id10002', name: `name10002${requestData.name || ''}` },
              ],
              total: 2,
            },
          })
        }, 800)
      })
    },
  },
}
</script>
