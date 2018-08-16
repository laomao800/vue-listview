# 布局

默认 `<Listview />` 会垂直铺满屏幕，可通过设置 `height` 属性指定 Listview 整体高度。若 `fullHeight` 设为 `false` 则会根据内容尺寸自动往下方撑开高度。

## 相关 Props

### height

- type: `[String, Number]`
- default: `null`

指定组件垂直高度，尺寸包括顶部搜索栏，底部页码，页面外圈留白装饰区域。

### fullHeight

- type: `Boolean`
- default: `true`

是否垂直方向铺满屏幕。

### contentMinHeight

- type: `[String, Number]`
- default: `100`

内容区域（除去顶部搜索栏和底部页码）的最小高度值。
