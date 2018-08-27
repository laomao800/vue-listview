# Methods

这里只列出 `<listview />` 实例上有可能需要被外部调用的方法，一些只在内部使用的方法略过。

## search()

发起数据请求。

## setContentMessage(message, type)

- 参数
  - `message` ：文本内容，设为 `null` 则会清空 `contentMessage`
  - `type` ：可选，支持值有 `success` , `warning` , `info` , `error`

## updateLayout

刷新布局，包括搜索栏和内容区域，但正常情况下无需调用。
