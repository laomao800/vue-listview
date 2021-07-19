# lvStore <Badge text="2.0.0+" />

Listivew 内部以一个 Vue 实例为总线存储相关的数据，并以名称 `lvStore` 作为 provider 提供给子组件。在使用[替换区域组件](create.md#replaceComponents)时可通过该途径访问底层数据及方法。

## Data

| 属性                   | 类型     | 默认值                     | 说明                                                    |
| ---------------------- | -------- | -------------------------- | ------------------------------------------------------- |
| contentHeight          | Number   | null                       | 内容区域高度                                            |
| contentLoading         | Boolean  | false                      | 是否处于内容请求中                                      |
| selection              | Object[] | []                         | 内容区域选中内容                                        |
| currentPage            | Number   | 1                          | 内容当前页码                                            |
| currentPageSize        | Number   | this.pageSize              | 内容每页显示数量                                        |
| contentData            | Object   | { items: [], total: 0 }    | 内容数据及总条数                                        |
| internalContentMessage | Object   | { type: null, text: null } | 内容信息。若需修改请通过 `setContentMessage()` 方法设置 |

## Methods

### search()

与 Listview 实例 [search](methods-and-events.md#search-keepinpage-false) 方法一致

### setContentMessage(text, type, cleanData)

与 Listview 实例 [setContentMessage](methods-and-events.md#setcontentmessage-text-type-cleandata) 方法一致

### getContentData(data = {})

获取经过 [`contentDataMap`](props.md##contentdatamap) 映射后的数据

### cleanContentData()

清空列表内容数据

### getRequestData()

获取内容请求参数

### $rootEmitProxy(rootEventName, […args])

- 参数：
  - `rootEventName`
    - type: `string`
  - `[...args]`
    - type: `any[]`

- 用法：

  与 `$emit()` 用法类似，区别是该方法最终会由 Listview 根级实例触发，因此其触发的事件都可在 Listview 组件上监听到。

  通过该方法触发的事件，第一个参数为 store 自身，第二个参数之后才为用户传入数据。例：

- 参考：

  ```js
  this.lvStore.$rootEmitProxy('my-event', 123)
  ```

  ```vue
  <template>
    <Listview @my-event="(store, num) => handleMyEvent(num)" />
  </template>

  <script>
  export default {
    methods: {
      handleMyEvent(_store, num) {
        console.log(num) // 123
      }
    }
  }
  </script>
  ```
