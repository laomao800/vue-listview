<template>
  <listview
    header-title="演示列表1"
    :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']"
    :request-url="requestUrl"
    :filter-buttons="filterButtons"
    :filter-fields="filterFields"
    :filter-model="filterModel"
    :table-columns="tableColumns"
  />
</template>

<script>
export default {
  data() {
    return {
      requestUrl: '',
      filterButtons: [
        { text: 'default', click: () => console.log('click:button-default') },
        {
          type: 'primary',
          icon: 'el-icon-edit',
          text: 'primary',
          click: () => console.log('click:button-primary'),
        },
        {
          type: 'success',
          icon: 'el-icon-check',
          text: 'success',
          click: () => console.log('click:button-success'),
        },
        {
          type: 'info',
          icon: 'el-icon-message',
          text: 'info',
          click: () => console.log('click:button-info'),
        },
        {
          type: 'warning',
          icon: 'el-icon-star-off',
          text: 'warning',
          click: () => console.log('click:button-warning'),
        },
        {
          type: 'danger',
          icon: 'el-icon-delete',
          text: 'danger',
          click: () => console.log('click:button-danger'),
        },
        {
          type: 'primary',
          text: '下拉按钮',
          click: () => console.log('click:button-dropdown1'),
          children: [
            {
              text: '菜单1',
              click: () => console.log('click:button-dropdown1-sub1'),
            },
            {
              text: '菜单2',
              click: () => console.log('click:button-dropdown1-sub2'),
            },
          ],
        },
        {
          type: 'primary',
          text: '分裂下拉',
          splitButton: true,
          click: () => console.log('click:button-dropdown2'),
          children: [
            {
              text: '菜单1',
              click: () => console.log('click:button-dropdown2-sub1'),
            },
            {
              text: '菜单2',
              click: () => console.log('click:button-dropdown2-sub2'),
            },
          ],
        },
      ],
      filterModel: { hidden: 'hidden', multipleSelect: [] },
      filterFields: [
        { type: 'text', model: 'name', label: '文本字段' },
        { type: 'text', model: 'name2', label: '禁用文本', disabled: true },
        { type: 'number', model: 'number' },
        {
          type: 'select',
          model: 'select',
          label: '单选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        { type: 'date', model: 'date', label: '日期选择' },
        { type: 'dateRange', model: 'dateRange', label: '日期范围' },
        { type: 'timeSelect', model: 'timeSelect', label: '固定时间' },
        { type: 'timePicker', model: 'timePicker', label: '任意时间' },
        {
          type: 'timePickerRange',
          model: 'timePickerRange',
          label: '时间范围',
        },
        { type: 'dateTime', model: 'dateTime', label: '日期时间' },
        {
          type: 'dateTimeRange',
          model: 'dateTimeRange',
          label: '日期时间范围',
        },
        {
          type: 'cascader',
          model: 'cascader',
          label: '级联选项',
          options: [
            {
              value: '1',
              label: '菜单1',
              children: [
                {
                  value: '2',
                  label: '菜单2',
                  children: [
                    {
                      value: '3',
                      label: '菜单3',
                      children: [{ value: '4', label: '菜单4' }],
                    },
                  ],
                },
              ],
            },
          ],
        },
        [
          { type: 'label', label: '组合' },
          { type: 'text', label: '支持组合多个字段' },
          { type: 'text', label: '避免被自动收起拆开' },
        ],
        { type: 'label', label: '文本标签' },
      ],

      tableColumns: [
        { label: 'id', prop: 'id', width: 100 },
        { label: 'name', prop: 'name', width: 200 },
        {
          label: '操作',
          width: 150,
          align: 'center',
          render: (prop) => {
            return (
              <div>
                {' '}
                <el-button
                  on-click={(e) => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="success"
                >
                  {' '}
                  审核{' '}
                </el-button>{' '}
                <el-button
                  on-click={(e) => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="danger"
                >
                  {' '}
                  删除{' '}
                </el-button>{' '}
              </div>
            )
          },
        },
        { label: '销售员', prop: 'seller' },
        { label: '仓库', prop: 'warehouse' },
        { label: '零售价格', prop: 'sale_price' },
        {
          label: '折扣率',
          align: 'center',
          formatter: (row) => row.discount.toFixed(2),
        },
        {
          label: '折后价',
          align: 'center',
          formatter: (row) => (row.discount * row.sale_price).toFixed(2),
        },
        {
          label: '折扣时间',
          align: 'center',
          children: [
            { label: '折扣开始', prop: 'date' },
            { label: '折扣结束', prop: 'date' },
          ],
        },
        { label: '数量', prop: 'quantity' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller' },
            { label: '修改时间', prop: 'date' },
          ],
        },
      ],
    }
  },
}
</script>
