# Vue Listview

[![Build Status](https://travis-ci.org/laomao800/vue-listview.svg?branch=master)](https://travis-ci.org/laomao800/vue-listview)
[![codecov](https://codecov.io/gh/laomao800/vue-listview/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/vue-listview)
[![npm](https://img.shields.io/npm/v/@laomao800/vue-listview.svg)](https://www.npmjs.com/package/@laomao800/vue-listview)

Vue Listview 是一个基于 [Vue.js](https://cn.vuejs.org/) 和 [Element-UI](http://element.eleme.io/) ，可用于生成列表类的页面布局组件。

界面预览：

![预览](./docs/preview.png)

默认为表格类列表页，也可通过 [Slot](/dev/slots.md) 实现自定义列表布局。

## 文档 & Demo

- 文档： <https://laomao800.github.io/vue-listview/>
- Demo： <https://laomao800.github.io/vue-listview/demo/layout/all.html>

## 安装

```bash
yarn add @laomao800/vue-listview element-ui

# OR

npm i -S @laomao800/vue-listview element-ui
```

**Element-UI 作为 peerDependencies 需要同步安装。**

## 使用

### 全局注册

可以传入配置对象，用于全局配置 listview 。一般可用于项目接口与默认结构不同的场景，通过全局配置可不用在每个页面内重复写诸如 `validateResponse` 等“项目内通用”的配置。

支持全局配置：

- `validateResponse`
- `resolveResponseErrorMessage`
- `transformRequestData`
- `transformResponseData`
- `contentDataMap`

```js
// main.js
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@laomao800/vue-listview'

Vue.use(ElementUI)
Vue.use(Listview)
/*
Vue.use(Listview, {
  validateResponse: response => response.different_success_status,
  resolveResponseErrorMessage: () => 'global config error',
  transformRequestData: requestData => {
    requestData.addon = 'requestAddon'
    return requestData
  },
  transformResponseData: response => {
    response.addon = 'responseAddon'
    return response
  },
  contentDataMap: {
    addon: 'addon',
    items: 'result.items',
    total: 'result.total_count'
  }
})
*/
```

### 局部注册

```vue
<template>
  <listview />
</template>

<script>
// import Vue from 'vue'
import Listview from '@laomao800/vue-listview'

/*
Vue.prototype.$LISTVIEW = {
  contentDataMap: {
    addon: 'addon',
    items: 'result.items',
    total: 'result.total_count'
  },
  // ...
}
*/

export default {
  components: {
    Listview
  }
}
</script>
```

### UMD

演示： [jsfiddle](https://jsfiddle.net/laomao800/92Lvg1rn/4/)

```html
<div id="app">
  <listview />
</div>

<script src="//unpkg.com/vue/dist/vue.js"></script>
<script src="//unpkg.com/@laomao800/vue-listview/dist/listview.umd.min.js"></script>
<script>
new Vue().$mount('#app')
</script>
```
