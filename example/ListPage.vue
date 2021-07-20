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
        { label: 'id', prop: 'id', width: 120 },
        { label: 'name', prop: 'name', width: 1000 },
      ],
    }
  },
}
</script>
