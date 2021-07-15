# lvStore

Listivew 内部以一个 Vue 实例为总线存储相关的数据，并以名称 `lvStore` 作为 provider 提供给子组件。在使用[替换区域组件](create.md#replaceComponents)时可通过该途径访问底层数据及方法。

## Data

| 属性                   | 类型    | 默认值                     | 说明                                                    |
| ---------------------- | ------- | -------------------------- | ------------------------------------------------------- |
| contentHeight          | Number  | null                       | 内容区域高度                                            |
| contentLoading         | Boolean | false                      | 是否处于内容请求中                                      |
| selection              |         | []                         | 内容区域选中内容                                        |
| currentPage            |         | 1                          | 内容当前页码                                            |
| currentPageSize        |         | this.pageSize              | 内容每页显示数量                                        |
| contentData            |         | { items: [], total: 0 }    | 内容数据及总条数                                        |
| internalContentMessage |         | { type: null, text: null } | 内容信息。若需修改请通过 `setContentMessage()` 方法设置 |

## Methods

### `$rootEmitProxy(rootEvent: string, ...args: any[])`

与 `$emit()` 用法类似，区别是该方法最终会由 Listview 根级实例触发，因此其触发的事件都可在 Listview 组件上监听到。

通过该方法触发的事件，第一个参数为 store 自身，第二个参数之后才为用户传入数据。例：

`$rootEmitProxy('my-event', 123)`

```vue
// num 为 123
<Listview @my-event="(store, num) => handleMyEvent(num)" />
```

### search(keepInPage = false)

与 Listview 实例同名方法一致

### getContentData(data = {})

获取经过 `contentDataMap` 映射后的数据

### cleanContentData()

清空内容数据

### getRequestData()

获取内容请求参数

### setContentMessage(text, type, cleanList)

设置内容区域文字提示

- `text`
  - 类型： `string | null`
  - 默认值： `''`
  - 说明：内容文本值
- `type`
  - 类型： `string | null`
  - 默认值： `null`
  - 说明：内容图标类型。支持 `warning'` `'info'` `'error'`
- `cleanList`
  - 类型： `boolean`
  - 默认值： `false`
  - 说明：是否清空原有内容数据，若不清除内容区域会依然显示现有的内容数据
