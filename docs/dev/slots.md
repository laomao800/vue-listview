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
  <listview
    request-url="/mock/listview"
    request-method="post"
  >
    <template slot-scope="{
      filterModel,
      contentHeight,
      contentLoading,
      contentData,
      contentMessage
    }">
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

## prepend-filterbar-submit

插入在搜索栏右侧“搜索”按钮前面。一般可用于需要在该位置增加自定义操作按钮等特殊需求。

```vue
<template>
  <listview>
    <el-button type="danger" slot="prepend-filterbar-submit">一键重算</el-button>
  </listview>
</template>
```

## append-filterbar-submit

同 [prepend-filterbar-submit](#prepend-filterbar-submit) ，但是插入在“重置”按钮后面。
