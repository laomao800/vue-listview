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

## prepend-submit

插入在搜索栏右侧“搜索”按钮前面。一般可用于需要在该位置增加自定义操作按钮等特殊需求。

```vue
<template>
  <listview>
    <el-button type="danger" slot="prepend-submit">一键重算</el-button>
  </listview>
</template>
```

## append-submit

同 [prepend-submit](#prepend-submit) ，但是插入在“重置”按钮后面。

## prepend-more

搜索栏折叠按钮（更多）左侧。

## append-more

同 [prepend-more](#prepend-more) ，搜索栏折叠按钮（更多）右侧。


## footer-left

底部页码栏左侧插槽，设置该插槽会覆盖默认情况下的页码组件。

## footer-center

底部页码栏中间位置的插槽。

## footer-right

底部页码栏右侧插槽，设置该插槽会覆盖页码[显示在右侧的页码组件](./props.md#pageposition)。

## filterbar-top

搜索栏顶部通栏。

## filterbar-bottom

同 [filterbar-top](#filterbar-top) ，搜索栏底部通栏。

## filterbar-left

同 [filterbar-top](#filterbar-top) ，搜索栏左侧。

## filterbar-right

同 [filterbar-top](#filterbar-top) ，搜索栏右侧。
