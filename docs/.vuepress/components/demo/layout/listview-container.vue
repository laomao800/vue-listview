<template>
  <listview-container :header-title="'演示列表容器'" :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']">
    <listview
      header-title="演示列表1"
      :request-url="requestUrl"
      :filter-buttons="filterButtons1"
      :filter-fields="filterFields1"
      :table-columns="tableColumns1"
    />
    <listview
      header-title="演示列表2"
      :request-url="requestUrl"
      :filter-buttons="filterButtons2"
      :filter-fields="filterFields2"
      :table-columns="tableColumns2"
    />
    <listview
      header-title="演示列表3"
      :request-url="requestUrl"
      :filter-buttons="filterButtons3"
      :filter-fields="filterFields3"
      :table-columns="tableColumns3"
    />
  </listview-container>
</template>

<script>
export default {
  data() {
    return {
      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',

      filterButtons1: [
        {
          type: 'primary',
          icon: 'el-icon-edit',
          text: 'primary',
          click: () => console.log('click:button-primary')
        }
      ],
      filterButtons2: [
        {
          type: 'success',
          icon: 'el-icon-check',
          text: 'success',
          click: () => console.log('click:button-success')
        },
        {
          type: 'info',
          icon: 'el-icon-message',
          text: 'info',
          click: () => console.log('click:button-info')
        }
      ],
      filterButtons3: [
        {
          type: 'warning',
          icon: 'el-icon-star-off',
          text: 'warning',
          click: () => console.log('click:button-warning')
        },
        {
          type: 'primary',
          text: '分裂下拉',
          splitButton: true,
          click: () => console.log('click:button-dropdown2'),
          children: [
            {
              text: '菜单1',
              click: () => console.log('click:button-dropdown2-sub1')
            },
            {
              text: '菜单2',
              click: () => console.log('click:button-dropdown2-sub2')
            }
          ]
        }
      ],

      filterFields1: [
        {
          type: 'text',
          model: 'name',
          label: '文本字段'
        },
        {
          type: 'number',
          model: 'number'
        }
      ],
      filterFields2: [
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
          type: 'date',
          model: 'date',
          label: '日期选择'
        }
      ],
      filterFields3: [
        {
          type: 'multiple-Select',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ],
          get: val => val.join(',')
        },
        {
          type: 'dateRange',
          model: 'dateRange',
          label: '日期范围'
        }
      ],

      tableColumns1: [
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
      tableColumns2: [
        { label: '销售员', prop: 'seller', align: 'center' },
        { label: '仓库', prop: 'warehouse', align: 'center' },
        { label: '零售价格', prop: 'sale_price', align: 'center' }
      ],
      tableColumns3: [
        {
          label: '折扣率',
          align: 'center',
          formatter: row => row.discount.toFixed(2)
        },
        {
          label: '折后价',
          align: 'center',
          formatter: row => (row.discount * row.sale_price).toFixed(2)
        }
      ]
    }
  }
}
</script>
