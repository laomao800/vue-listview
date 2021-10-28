# create()

通过 create 方法可对部分 props 默认值进行全局配置，并生成全新的组件。

可用于项目间接口格式不同，或者项目内部有多个不同默认布局等特殊场景。

## 全局配置项

```js
// main.js
// ...
import { create as createListview } from '@laomao800/vue-listview'

const Listview = createListview({
  // presetProps
})
Vue.use(Listview)
```

所有支持的配置项：

- `pressEnterSearch`
- `autoload`
- `requestMethod`
- `requestConfig`
- `transformRequestData`
- `transformResponseData`
- `contentDataMap`
- `contentMessage`
- `validateResponse`
- `resolveResponseErrorMessage`
- `usePage`
- `pageSize`
- `pageSizes`
- `pageProps`
- `pagePosition`
- `height`
- `fullHeight`
- `searchButton`
- `resetButton`

## `replaceComponents`

替换区域组件，可通过该属性配置默认插槽内容，用于全局替换诸如搜索栏、正文区域等默认组件：

```js
import { create as createListview } from '@laomao800/vue-listview'
import CustomFilterbar from './CustomFilterbar.vue'

const Listview = createListview({
  replaceComponents: {
    filterbar: CustomFilterbar,
  },
})
Vue.use(Listview)
```

支持的替换区域组件有：

- `'header'`: 顶部标题栏区域组件
- `'filterbar'`: 搜索栏区域组件
- `'content'`: 正文区域组件
- `'footer'`: 底部页码区域组件

::: tip 注意

1. listview 本身接受的所有 attrs 会全部传递给替换组件，可根据需要挑选使用，若命名与第三方组件有冲突，可对其包裹多一层数据转换层组件；
2. 替换组件本身可获取名为 `lvStore` 的 inject ，可获取 Listview 内部底层的一些状态和方法，具体内容可查阅 [lvStore](lv-store.md) 章节。

:::
