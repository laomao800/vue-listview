# Slots

## Default slot

默认使用 `<listview />` 会使用表格布局。若提供了 slot 会在 `slot-scope` 包含有以下属性：

| 参数           | 类型          | 说明                                       |
| -------------- | ------------- | ------------------------------------------ |
| filterModel    | Object        | 搜索栏数据                                 |
| contentHeight  | Number        | 内容区域高度                               |
| contentLoading | Boolean       | 是否正在发送数据读取请求                   |
| contentData    | Object        | `{ items: Array, total: Number }` 内容对象 |
| contentMessage | Object , null | `{ type, message }` 错误信息               |

### Default slot 演示

```vue
<template>
  <listview request-url="/mock/listview" request-method="post">
    <template
      slot-scope="{
        filterModel,
        contentHeight,
        contentLoading,
        contentData,
        contentMessage,
      }"
    >
      <div v-if="contentLoading">Loading...</div>
      <div v-else-if="contentMessage">{{ contentMessage }}</div>
      <ul v-else>
        <li v-for="(item, index) in contentData.items" :key="index">
          {{ item.name }}
        </li>
      </ul>
    </template>
  </listview>
</template>
```

因此如果有其他界面需求，甚至根据开关切换列表视图的需求，都可以通过 default slot 的自定义布局来实现。

## 其他

| Slot             | 说明                                                 |
| ---------------- | ---------------------------------------------------- |
| filterbar-top    | 搜索栏顶部                                           |
| filterbar-bottom | 搜索栏底部                                           |
| filterbar-left   | 搜索栏左侧                                           |
| filterbar-right  | 搜索栏右侧                                           |
| prepend-submit   | 搜索栏右侧“搜索”按钮左侧                             |
| append-submit    | 搜索栏右侧“重置”按钮右侧                             |
| prepend-more     | 搜索栏折叠按钮左侧                                   |
| append-more      | 搜索栏折叠按钮右侧                                   |
| footer-left      | 底部页码栏左侧，设置该插槽会覆盖默认情况下的页码组件 |
| footer-center    | 底部页码栏中间位置                                   |
| footer-right     | 底部页码栏右侧，若页码组件设置显示于右边会被覆盖     |
