# Methods & Events

## Methods

`<listview />` 实例上有可能需要被外部调用的方法，一些只在内部使用的方法略过。

### search(keepInPage = false)

发起数据请求。请求默认开启 `withCredentials: true` ，如需关闭请配置 [Props: requestConfig](/dev/props.md#requestconfig) 。

参数 `keepInPage` 默认为 `false` ，传入 `true` 可以保留当前页码重新请求数据，可用于操作数据后的当页刷新。

<Badge text="1.2.7+" vertical="middel" /> 以后该方法返回一个 Promise ，数据请求成功后响应。

### resetFilter()

重置搜索栏数据，效果与点击“重置”按钮一致。

### setContentMessage(message, type)

- 参数
  - `message` ：文本内容，设为 `null` 则会清空 `contentMessage`
  - `type` ：可选，支持值有 `success` , `warning` , `info` , `error`

设置无数据时内容区域的展示文本。

### updateLayout()

刷新布局，包括搜索栏和内容区域，但正常情况下无需手动调用。

## Events

### filter-submit

点击搜索栏“搜索”按钮后触发。

### filter-reset

点击搜索栏“重置”按钮后触发。

### before-request(instance) <Badge text="1.2.5+" />

- 参数：
  - `{Object} instance` listview 实例

发起数据请求前触发。

### requested(instance) <Badge text="1.2.5+" />

- 参数：
  - `{Object} instance` listview 实例

发起数据请求后触发。
