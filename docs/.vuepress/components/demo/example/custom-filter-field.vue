<template>
  <listview
    :request-url="requestUrl"
    :filter-model="filterModel"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
    @filter-submit="onSubmit"
  />
</template>

<script>
export default {
  data() {
    return {
      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
      filterModel: {
        selectField: ''
      },
      filterFields: [
        {
          model: 'selectField',
          label: '选项提示文本',
          render: () => (
            <select
              style="height:32px;width:150px"
              value={this.filterModel.selectField}
              on-change={e => {
                this.$set(this.filterModel, 'selectField', e.target.value)
              }}
            >
              <option value="" />
              <option value="1">选项1</option>
              <option value="2">选项2</option>
            </select>
          )
        }
      ],
      tableColumns: [
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
      ]
    }
  },
  methods: {
    onSubmit({ filterModel }) {
      this.$message(JSON.stringify(filterModel))
    }
  }
}
</script>
