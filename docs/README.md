# PPS Vue Listview

Vue Listview 是一个基于 [Vue.js](https://cn.vuejs.org/) 和 [Element-UI](http://element.eleme.io/) ，可用于生成列表类的页面布局的 Vue 组件。

界面预览：

![预览](/preview.png)

默认为表格类列表页，也可通过 [Slot](/dev/slots.md) 实现自定义列表布局。

## 安装

::: danger 安装

由于该库暂未发布，暂时无法通过 npm 命令安装，请先直接使用仓库内 `dist/` 目录下的文件。将对应文件复制到项目内，并在 babel 编译中排除该文件即可。如：

`/public/vue-listview/listview-component.common.js`

```js
// vue.config.js
// ...
chainWebpack: config => {
  config.module.rule('js').exclude.add(/public/)
}
// ...
```

:::

```bash
npm i -S @pps/vue-listview

# OR

yarn add @pps/vue-listview
```

## 使用

::: tip 说明

由于内部实现是基于 Element-UI ，因此在使用前在项目中确保已经有安装了 Element-UI 。

:::

### 全局注册

```js
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@pps/vue-listview'

Vue.use(ElementUI)
Vue.use(Listview)
```

### 局部注册

```vue
<template>
  <listview />
</template>

<script>
import Listview from '@pps/vue-listview'

export default {
  components: {
    Listview
  }
}
</script>
```

### UMD

```html
<div id="app">
  <listview />
</div>
<script src="https://vuejs.org/js/vue.min.js"></script>
<script src="./listview.umd.min.js"></script>
<script>
  var app = new Vue({
    el: '#app',
  })
</script>
```

## 基本配置

- 搜索栏
  - 操作按钮 [《Prop: filterButtons》](/dev/prop-filter-buttons.md)
  - 搜索字段 [《Prop: filterFields》](/dev/prop-filter-fields.md)
- 表格布局 [《Prop: tableColumns》](/dev/prop-table-columns.md)
- 自定义布局 [《Slot》](/dev/slots.md)

## `/dist` 文件说明

由于 Listview 内部所有基础视图组件都来自 [Element-UI](http://element.eleme.io/) ，因此打包文件分别有两个版本，以下为 `dist` 目录下文件的对比说明：

- `listview-component.common.js`

  **默认文件**，只包含 listview 自身功能

- `listview-component.umd.js`

  同上的 UMD 版本

- `listview-component.umd.min.js`

  同上的 UMD 压缩版本

- `listview.common.js`

  包含 listview 功能和 Element-UI + css 完整库

- `listview.umd.js`

  同上的 UMD 版本

- `listview.umd.min.js`

  同上的 UMD 压缩版本
