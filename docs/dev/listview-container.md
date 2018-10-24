# Listview Container

Listview 内置另一个组件 Listview Container 用于生成多个 Listview 集合的页面，通过顶部 Tab 结构互相切换。

## 使用方法

```vue
<template>
  <listview-container
    :header-title="'列表容器'"
    :header-nav="[{ text: '菜单1' }, { text: '菜单2' }]"
  >
    <listview
      header-title="演示列表1"
      :filter-fields="[
        // ...
      ]"
    />
    <listview header-title="演示列表2" />
  </listview-container>
</template>

<script>
import { Listview, ListviewContainer } from '@laomao800/vue-listview'

export default {
  name: 'ListviewContainerDemo',

  components: {
    Listview,
    ListviewContainer
  }
}
</script>
```

以上代码会生成如下表结构：

<!-- markdownlint-disable MD033 -->
<client-only>
  <listview-container-demo style="border:1px solid #DADEE5" />
</client-only>
<!-- markdownlint-enable MD033 -->

## Tab 标题

外部 `<listview-container>` 会自动获取内部 `<listview>` 的 `headerTitle` prop 作为在顶部 Tab 处显示的标题，并且内部 `<listview>` 的 `headerTitle` 和 `headerNav` prop 都不会显示。

## Props

### headerTitle

- type: `String`
- default: `''`

与 [`listview` 组件的 props](props.md#headertitle) 一致，设置页面顶部通栏内的页面标题文本。

### headerNav

- type: `Array`
- default: `[]`

与 [`listview` 组件的 props](props.md#headernav) 一致，设置页面顶部通栏内的面包屑，每一个数组项支持属性有：

| 参数   | 说明                                      |
| ------ | ----------------------------------------- |
| `text` | 显示文字                                  |
| `to`   | 可选，路由跳转对象，同 vue-router 的 `to` |
