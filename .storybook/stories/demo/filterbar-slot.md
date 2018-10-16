# 自定义右侧附加操作按钮

通过 slot `prepend-filterbar-submit` 和 `append-filterbar-submit` 可分别在搜索栏右侧“搜索”和“重置”按钮前后添加自定义内容，一般用于用于添加操作按钮。

```vue
<template>
  <listview :filter-fields="filterFields">
    <el-button
      slot="prepend-filterbar-submit"
      type="danger"
      icon="el-icon-edit"
    >一键重算</el-button>
    <el-button
      slot="append-filterbar-submit"
      type="success"
      icon="el-icon-edit"
    >一键重算</el-button>
  </listview>
</template>

<script>
export default {
  // ...
  data() {
    filterFields: [
      {
        type: 'text',
        model: 'name',
        label: '文本字段'
      }
    ]
  }
}
</script>
```

如果需要添加多个元素，可使用 `<template>` 包裹，或者直接写多个同名 slot 即可：

```vue
<listview>
  <template slot="prepend-filterbar-submit">
    <el-button type="danger" icon="el-icon-edit">一键重算1</el-button>
    <el-button type="danger" icon="el-icon-edit">一键重算2</el-button>
  </template>

  <!-- 或者 -->
  <el-button
    slot="append-filterbar-submit"
    type="danger"
    icon="el-icon-edit"
  >一键重算1</el-button>
  <el-button
    slot="append-filterbar-submit"
    type="danger"
    icon="el-icon-edit"
  >一键重算2</el-button>
</listsview>
```
