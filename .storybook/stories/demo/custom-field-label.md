# 自定义组件绑定 label

listview 的 filterFields 支持传入 JSX 以解决内置基础字段类型无法满足的场景，如需要请求特定接口数据源的下拉选项等。

但由于通过 JSX 无法直接绑定数据，因此需要在控件的值改变的时候自行写入父组件的 model ，具体可查看下方 demo 。

```vue
<template>
  <listview
    :filter-fields="filterFields"
    :filter-model="filterModel"
  />
</template>

<script>
export default {
  // ...
  data() {
    return {
      filterModel: {
        select: null
      },
      filterFields: [
        {
          model: 'select',
          label: '选项提示',
          render: () => (
            <select
              style="height:32px;width:100px"
              value={this.filterModel.select}
              on-change={e => {
                this.$set(this.filterModel, 'select', e.target.value)
              }}
            >
              <option value="" />
              <option value="1">选项1</option>
              <option value="2">选项2</option>
            </select>
          )
        }
      ]
    }
  }
}
</script>
```
