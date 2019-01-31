<template>
  <listview
    header-title="演示列表1"
    :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']"
    :request-url="requestUrl"
    :filter-buttons="filterButtons"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
    :full-height="false"
  />
</template>

<script>
export default {
  data() {
    return {
      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',

      filterButtons: [
        {
          text: 'primary',
          type: 'primary',
          click: () => console.log('click:button-primary')
        }
      ],

      filterFields: [
        {
          type: 'text',
          model: 'name',
          label: '文本字段'
        }
      ],

      tableColumns: [
        {
          label: '自定义标签',
          prop: 'sku',
          width: 100,
          align: 'center'
        },
        {
          label: '产品名称',
          prop: 'name',
          width: 200,
          align: 'center'
        },
        {
          label: '操作',
          width: 150,
          align: 'center',
          render: prop => {
            return (
              <div>
                <el-button
                  on-click={e => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="success"
                >
                  审核
                </el-button>
                <el-button
                  on-click={e => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="danger"
                >
                  删除
                </el-button>
              </div>
            )
          }
        },
        { label: '销售员', prop: 'seller', align: 'center' },
        { label: '仓库', prop: 'warehouse', align: 'center' },
        { label: '零售价格', prop: 'sale_price', align: 'center' },
        {
          label: '折扣率',
          align: 'center',
          formatter: row => row.discount.toFixed(2)
        },
        {
          label: '折后价',
          align: 'center',
          formatter: row => (row.discount * row.sale_price).toFixed(2)
        },
        {
          label: '折扣时间',
          align: 'center',
          children: [
            { label: '折扣开始', prop: 'date', align: 'center' },
            { label: '折扣结束', prop: 'date', align: 'center' }
          ]
        },
        { label: '数量', prop: 'quantity', align: 'center' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller', align: 'center' },
            { label: '修改时间', prop: 'date', align: 'center' }
          ]
        }
      ]
    }
  }
}
</script>
