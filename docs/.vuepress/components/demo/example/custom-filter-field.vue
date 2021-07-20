<template>
  <listview
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
      filterModel: { selectField: '' },
      filterFields: [
        {
          model: 'selectField',
          label: '选项提示文本',
          render: () => (
            <select
              style="height:32px;width:150px"
              value={this.filterModel.selectField}
              on-change={(e) => {
                this.$set(this.filterModel, 'selectField', e.target.value)
              }}
            >
              <option value="" />
              <option value="1">选项1</option>
              <option value="2">选项2</option>
            </select>
          ),
        },
      ],
      tableColumns: [
        { label: 'id', prop: 'id', width: 120 },
        { label: 'name', prop: 'name' },
      ],
    }
  },
  methods: {
    onSubmit({ filterModel }) {
      alert(JSON.stringify(filterModel))
    },
  },
}
</script>
