<template>
  <listview
    :full-height="false"
    :show-filter-search="false"
    :show-filter-reset="false"
    :request-handler="requestHandler"
    :table-columns="tableColumns"
  />
</template>

<script>
export default {
  name: 'TableColumnsDemo',

  data() {
    return {
      requestHandler() {
        return {
          is_success: true,
          result: {
            items: [
              {
                sku: 'SKU10001',
                enable: true,
                name: '小明',
                discount: 0.755,
                province: '广东省',
                city: '广州市',
                address: '白云区 豪泉大厦 301'
              },
              {
                sku: 'SKU10002',
                enable: false,
                name: '小红',
                discount: 0.8,
                province: '广东省',
                city: '广州市',
                address: '白云区 豪泉大厦 302'
              }
            ],
            total: 2
          }
        }
      },
      tableColumns: [
        // 常规调用，直接通过 prop 指定属性名
        { label: 'SKU', align: 'center', prop: 'sku', fixed: true },

        // 支持 JSX 以及绑定 method
        {
          label: '操作',
          align: 'center',
          fixed: true,
          render: function({ row, column, $index }) {
            return (
              <el-button
                size="mini"
                type="primary"
                on-click={e => {
                  e.stopPropagation()
                  this.$msgbox({
                    message: row,
                    callback: () => {}
                  })
                }}
              >
                查看
              </el-button>
            )
          }.bind(this)
        },

        // 需要对数据进行简单处理后再输出
        {
          label: '折扣率',
          formatter: row => row.discount.toFixed(2)
        },

        // 需要输出较复杂的结构或其他自定义组件可使用 render
        {
          label: '是否启用',
          align: 'center',
          render: function({ row, column, $index }) {
            if (row.enable) {
              return <span style="color:#67c23a">启用</span>
            } else {
              return <span style="color:#f56c6c">禁用</span>
            }
          }
        },

        // 支持子列，无限级别
        {
          label: '配送信息',
          children: [
            { label: '姓名', prop: 'name' },
            {
              label: '地址',
              children: [
                { label: '省份', prop: 'province' },
                { label: '市区', prop: 'city' },
                {
                  label: '地址',
                  prop: 'address',
                  width: 400
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
