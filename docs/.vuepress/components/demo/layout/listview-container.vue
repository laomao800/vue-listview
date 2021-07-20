<template>
  <listview-container
    header-title="演示列表容器"
    :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']"
  >
    <listview
      header-title="演示列表1"
      :filter-buttons="filterButtons1"
      :filter-fields="filterFields1"
      :table-columns="tableColumns1"
    />
    <listview
      header-title="演示列表2"
      :filter-buttons="filterButtons2"
      :filter-fields="filterFields2"
      :table-columns="tableColumns2"
    />
    <div header-title="html内容"><h1>html content</h1></div>
  </listview-container>
</template>

<script>
export default {
  data() {
    return {
      filterButtons1: [
        { type: 'primary', icon: 'el-icon-edit', text: 'primary' },
      ],
      filterButtons2: [
        { type: 'success', icon: 'el-icon-check', text: 'success' },
        { type: 'info', icon: 'el-icon-message', text: 'info' },
      ],

      filterFields1: [
        { type: 'text', model: 'name', label: '文本字段' },
        { type: 'number', model: 'number' },
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
            { label: '禁用项', value: 4, disabled: true },
          ],
        },
        {
          type: 'date',
          model: 'date',
          label: '日期选择',
        },
      ],

      tableColumns1: [
        { label: 'id', prop: 'id' },
        { label: 'name', prop: 'name' },
      ],
      tableColumns2: [
        { label: '销售员', prop: 'seller' },
        { label: '仓库', prop: 'warehouse' },
        { label: '零售价格', prop: 'sale_price' },
      ],
    }
  },
}
</script>
