<template>
  <div>
    <p style="font-size:30px;padding:0 20px;margin:0;">Listview 1</p>
    <listview height="280" :filter-fields="filterFields" :table-columns="tableColumns"/>

    <p style="font-size:30px;padding:0 20px;margin:20px 0 0;">Listview 2</p>
    <listview height="400" :filter-fields="filterFields" :table-columns="tableColumns"/>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        }
      ]
    }
  }
}
</script>
