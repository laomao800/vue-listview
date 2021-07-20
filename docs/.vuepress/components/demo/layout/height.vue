<template>
  <div style="height: 800px">
    <p style="font-size: 30px; padding: 0 20px; margin: 0">
      Listview 280px height
    </p>
    <listview
      height="280"
      :filter-fields="filterFields"
      :table-columns="tableColumns"
    />

    <p style="font-size: 30px; padding: 0 20px; margin: 20px 0 0">
      Listview 50%(400px) height
    </p>
    <listview
      height="50%"
      :filter-fields="filterFields"
      :table-columns="tableColumns"
    />
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
          label: '文本字段',
        },
      ],
      tableColumns: [
        {
          label: 'id',
          prop: 'id',
          width: 100,
          align: 'center',
        },
      ],
    }
  },
}
</script>
