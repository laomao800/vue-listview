# Prop: tableColumns

- type: `Array`
- default: `[]`

在传入的数组中，每一个子项代表一列的配置。

## 常用属性

| 参数         | 类型                            | 说明                                                                  |
| ------------ | ------------------------------- | --------------------------------------------------------------------- |
| label        | String                          | 表头显示的内容                                                        |
| renderHeader | Function(h, { column, $index }) | 支持 jsx 自定义表头内容                                               |
| prop         | String                          | 列字段名                                                              |
| width        | String , Number                 | 列宽度                                                                |
| align        | String                          | 列对齐方式 `left` , `center` , `right`                                |
| render       | function(scope)                 | 接受参数为 { row, column, $index } ，支持返回字符串或 JSX             |
| formatter    | function(row)                   | 如数据需要简单文本加工，可使用该配置处理后 return 即可                |
| fixed        | String , Boolean                | 列是否固定在左侧或者右侧，true 表示固定在左侧                         |
| children     | Array                           | 子列配置，子项支持属性与父级一致                                      |
| ...          | -                               | **支持所有 [Element-UI Table column](#element-ui-table-column) 配置** |

其中除了 `children` 和 `render` 为 listview 新增的属性，其余完整列表请查阅 [Element-UI Table column](#element-ui-table-column) 。

### render

可使用 `render` 返回复杂单元格结构，支持 JSX ，如：

```js
{
  label: '操作',
  render: ({ row, column, $index }) => {
    return <el-button on-click={e => e.stopPropagation()}>button</el-button>
  }
}
```

## 配置演示

```js
;[
  // 常规调用，直接通过 prop 指定属性名
  { label: 'SKU', align: 'center', prop: 'sku', fixed: true },

  // 需要对数据进行简单处理后再输出
  {
    label: '折扣率',
    formatter: row => row.discount.toFixed(2)
  },

  // 支持 JSX 以及绑定 method
  {
    label: '操作',
    align: 'center',
    fixed: true,
    render: ({ row, column, $index }) => {
      return (
        <el-button
          size="mini"
          icon={row.enable ? 'el-icon-check ' : 'el-icon-close'}
          on-click={(e) => {
            e.stopPropagation()
            this.$msgbox(row.title)
          }}
        >
          按钮
        </el-button>
      )
    },
  },

  // 支持子列，无限级别
  {
    label: '配送信息',
    children: [
      { label: '姓名', prop: 'name' },
      {
        label: '地址',
        children: [
          { label: '省份', prop: 'province' },
          { label: '市区', prop: 'city' },
          {
            label: '地址',
            prop: 'address',
            width: 600
          }
        ]
      }
    ]
  }
]
```

以上配置项会生成如下表结构：

<!-- markdownlint-disable MD033 -->
<client-only>
  <table-columns-demo />
</client-only>
<!-- markdownlint-enable MD033 -->

## Element UI table column

| 参数                  | 说明                                                                                                                                                                                  | 类型                                    | 可选值                                                                                               | 默认值                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------- |
| type                  | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮                                 | string                                  | selection/index/expand                                                                               | -                                 |
| index                 | 如果设置了 `type=index`，可以通过传递 `index` 属性来自定义索引                                                                                                                        | string, Function(index)                 | -                                                                                                    | -                                 |
| column-key            | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件                                                                                              | string                                  | -                                                                                                    | -                                 |
| label                 | 显示的标题                                                                                                                                                                            | string                                  | -                                                                                                    | -                                 |
| prop                  | 对应列内容的字段名，也可以使用 property 属性                                                                                                                                          | string                                  | -                                                                                                    | -                                 |
| width                 | 对应列的宽度                                                                                                                                                                          | string                                  | -                                                                                                    | -                                 |
| min-width             | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列                                                                           | string                                  | -                                                                                                    | -                                 |
| fixed                 | 列是否固定在左侧或者右侧，true 表示固定在左侧                                                                                                                                         | string, boolean                         | true, left, right                                                                                    | -                                 |
| render-header         | 列标题 Label 区域渲染使用的 Function                                                                                                                                                  | Function(h, { column, $index })         | -                                                                                                    | -                                 |
| sortable              | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件                                                                                   | boolean, string                         | true, false, 'custom'                                                                                | false                             |
| sort-method           | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致                                                                          | Function(a, b)                          | -                                                                                                    | -                                 |
| sort-by               | 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sort-method 的时候有效。如果 sort-by 为数组，则先按照第 1 个属性排序，如果第 1 个相等，再按照第 2 个排序，以此类推 | String/Array/Function(row, index)       | -                                                                                                    | -                                 |
| sort-orders           | 数据在排序时所使用排序策略的轮转顺序，仅当 sortable 为 true 时有效。需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序                                            | array                                   | 数组中的元素需为以下三者之一：`ascending` 表示升序，`descending` 表示降序，`null` 表示还原为原始顺序 | ['ascending', 'descending', null] |
| resizable             | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）                                                                                                              | boolean                                 | -                                                                                                    | true                              |
| formatter             | 用来格式化内容                                                                                                                                                                        | Function(row, column, cellValue, index) | -                                                                                                    | -                                 |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip                                                                                                                                                        | Boolean                                 | -                                                                                                    | false                             |
| align                 | 对齐方式                                                                                                                                                                              | String                                  | left/center/right                                                                                    | left                              |
| header-align          | 表头对齐方式，若不设置该项，则使用表格的对齐方式                                                                                                                                      | String                                  | left/center/right                                                                                    | -                                 |
| class-name            | 列的 className                                                                                                                                                                        | string                                  | -                                                                                                    | -                                 |
| label-class-name      | 当前列标题的自定义类名                                                                                                                                                                | string                                  | -                                                                                                    | -                                 |
| selectable            | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选                                                                                | Function(row, index)                    | -                                                                                                    | -                                 |
| reserve-selection     | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 `row-key`）                                                                        | Boolean                                 | -                                                                                                    | false                             |
| filters               | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。                                                                                                                     | Array[{ text, value }]                  | -                                                                                                    | -                                 |
| filter-placement      | 过滤弹出框的定位                                                                                                                                                                      | String                                  | 与 Tooltip 的 `placement` 属性相同                                                                   | -                                 |
| filter-multiple       | 数据过滤的选项是否多选                                                                                                                                                                | Boolean                                 | -                                                                                                    | true                              |
| filter-method         | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。                                                                                          | Function(value, row, column)            | -                                                                                                    | -                                 |
| filtered-value        | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。                                                                                                                | Array                                   | -                                                                                                    | -                                 |
