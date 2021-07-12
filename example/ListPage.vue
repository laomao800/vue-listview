<template>
  <Listview
    request-url="/mock/listview"
    request-method="post"
    :table-columns="tableColumns"
  />
</template>

<script lang="jsx">
import { Listview } from '@/'

export default {
  name: 'ListPage',

  components: {
    Listview,
  },

  data() {
    return {
      tableColumns: [
        { label: '自定义标签', prop: 'sku', width: 120, fixed: !!1 },
        { label: '产品名称', prop: 'name', width: 1000 },
      ],
    }
  },
}
</script>
