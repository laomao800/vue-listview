# Methods & Events

## Methods

`<listview />` 实例上有可能需要被外部调用的方法，一些只在内部使用的方法略过。

### search(keepInPage)

- 参数：
  - `keepInPage`
    - type: `boolean`
    - default: `false`
    - 重新请求数据时是否保留当前页码

- 用法：

  发起数据请求。请求默认开启 `withCredentials: true` ，如需关闭请配置 [Props: requestConfig](/dev/props.md#requestconfig) 。

  该方法返回一个 Promise ，数据请求成功后 resolve 。

### resetFilter()

重置搜索栏数据，效果与点击“重置”按钮一致。

### setContentMessage(text, type, cleanData)

设置内容区域文字提示

- 参数：
  - `text`
    - 类型： `string | null`
    - 默认值： `''`
    - 说明：：文本内容，设为 `null` 则会清空内容
  - `type`
    - 类型： `string | null`
    - 默认值： `null`
    - 说明：内容图标类型。支持 `warning'` `'info'` `'error'`
  - `cleanData`
    - 类型： `boolean`
    - 默认值： `false`
    - 说明：是否清空原有内容数据，若不清除内容区域会依然显示现有的内容数据

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

### requested(store)

完成数据请求后触发，无论成功失败。
