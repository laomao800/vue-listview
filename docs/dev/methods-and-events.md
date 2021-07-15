# Methods & Events

## Methods

`<listview />` 实例上有可能需要被外部调用的方法，一些只在内部使用的方法略过。

### search(keepInPage = false)

发起数据请求。请求默认开启 `withCredentials: true` ，如需关闭请配置 [Props: requestConfig](/dev/props.md#requestconfig) 。

参数 `keepInPage` 默认为 `false` ，传入 `true` 可以保留当前页码重新请求数据，可用于操作数据后的当页刷新。

该方法返回一个 Promise ，数据请求成功后 resolve 。

### resetFilter()

重置搜索栏数据，效果与点击“重置”按钮一致。

### setContentMessage(text, type)

- 参数
  - `text` ：文本内容，设为 `null` 则会清空内容
  - `type` ：可选，支持值有 `warning` , `info` , `error`

设置无数据时内容区域的展示文本。

### updateLayout()

刷新布局，包括搜索栏和内容区域，但正常情况下无需手动调用。

## Events

### filter-submit

点击搜索栏“搜索”按钮后，发起请求前触发。

### filter-reset

点击搜索栏“重置”按钮后，重置完 `filterModel` 后触发。

### before-request(store)

- 参数：
  - `{Object} store` 内部数据 store 实例

发起数据请求前触发。

### request-valid-error(store)

- 参数：
  - `{Object} store` 内部数据 store 实例

`transformRequestData(data)` 返回 `false` 时触发。

### request-success(store)

- 参数：
  - `{Object} store` listview 实例

数据请求成功，设置内容与关闭内部 loading 状态后触发。

### request-error(store, error)

- 参数：
  - `{Object} store` listview 实例
  - `Error error` 错误对象

数据请求失败触发。
