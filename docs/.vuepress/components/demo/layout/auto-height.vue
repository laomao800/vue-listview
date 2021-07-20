<template>
  <listview
    header-title="演示列表1"
    :header-nav="[{ text: '菜单1', to: '/list' }, '菜单2']"
    :full-height="false"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
    :request-handler="requestHandler"
    :content-data-map="null"
  />
</template>

<script>
export default {
  data() {
    return {
      filterFields: [{ type: 'text', model: 'name', label: '文本字段' }],

      tableColumns: [
        { label: 'id', prop: 'id', width: 100 },
        { label: 'name', prop: 'name' },
      ],
    }
  },
  methods: {
    requestHandler() {
      return {
        items: Array.from(Array(30), (_n, i) => ({
          id: i,
          name: `name ${i}`,
        })),
        total: 30,
      }
    },
  },
}
</script>
