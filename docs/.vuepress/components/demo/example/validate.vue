<template>
  <listview v-bind="lvConfig" :transform-request-data="transformRequestData" />
</template>

<script>
export default {
  data() {
    return {
      lvConfig: {
        autoload: false,
        requestHandler: () => ({}),
        filterFields: [{ type: 'text', model: 'title', label: '标题' }],
        tableColumns: [
          { label: 'id', prop: 'id', width: 120 },
          { label: 'name', prop: 'name' },
        ],
        contentMessage: {
          type: 'info',
          text: '初次打开页面不加载数据，请组合条件进行搜索。',
        },
      },
    }
  },
  methods: {
    transformRequestData(requestData) {
      if (!requestData.title) {
        alert('请填写标题')
        return false
      }
    },
  },
}
</script>
