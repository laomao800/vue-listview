# Prop: filterFields

- type: `Array`
- default: `[]`

配置搜索栏搜索字段，一个数组项对应一个表单字段。支持传入 Object 和 JSX 。

## 配置属性

### 公共配置

以下为所有类型都共有的属性配置：

| 参数            | 必须 | 类型     | 说明                                                                         |
| --------------- | ---- | -------- | ---------------------------------------------------------------------------- |
| type            | √    | String   | 字段类型                                                                     |
| model           | √    | String   | 提交时字段的 key 名                                                          |
| label           | √    | String   | 字段中文说明                                                                 |
| disabled        |      | Boolean  | 是否禁用                                                                     |
| get             |      | Function | 配置字段的取值格式，具体请查看 [get](#get) 小节说明                          |
| key             |      | String   | 同 vue 组件的 `:key` 属性，若不设置会直接使用子项的 `model` 值               |
| componentProps  |      | Object   | 可传入各自组件自身的 props ，具体可查看 [componentProps](#componentprops)    |
| componentEvents |      | Object   | 可传入各自组件自身的 events ，具体可查看 [componentEvents](#componentevents) |
| componentSlots  |      | Object   | 可传入各自组件支持的 slots ，具体可查看 [componentSlots](#componentslots)    |

#### `type` 字段类型可选值

内置的可选字段类型有：

| type            | 说明         | 对应 Element-UI 组件                 |
| --------------- | ------------ | ------------------------------------ |
| label           | 文本标签     | 纯文本，无对应组件                   |
| text            | 文本字段     | [Text][text]                         |
| number          | 数字输入     | [Number][number]                     |
| select          | 单选         | [Select][select]                     |
| multipleSelect  | 多选         | [MultipleSelect][multiple-select]    |
| date            | 日期选择     | [Date][date]                         |
| dateRange       | 日期范围     | [DateRange][date-range]              |
| timeSelect      | 固定时间选项 | [TimeSelect][time-select]            |
| timePicker      | 任意时间     | [TimePicker][time-picker]            |
| timePickerRange | 时间范围     | [TimePickerRange][time-picker-range] |
| dateTime        | 日期时间     | [DateTime][date-time]                |
| dateTimeRange   | 日期时间范围 | [DateTimeRange][date-time-range]     |
| cascader        | 级联选项     | [Cascader][cascader]                 |

#### `get`

- 参数： `get(value, filterModel)`

可配置单个字段的取值方法，对内置组件的原始值进行加工后再提交到请求方法内。

如，内置的多选组件 `multipleSelect` 默认值的格式为数组，如果接口参数要求为逗号分隔的字符串，一个方法是可以通过 [transformRequestData](./props.md#transformrequestdata) 在提交前对整个参数对象进行加工过滤，另一个方法则可以通过配置 `get` :

```js
;[
  {
    type: 'multipleSelect',
    model: 'multipleSelect',
    label: '多选字段',
    options: [
      { label: '选项 1', value: 1 },
      { label: '选项 2', value: 2 },
      { label: '选项 3', value: 3 }
    ],
    get: val => val.join(',')
  }
]
```

::: warning 注意

**必须**返回[有效值](props.md#filtermodel)，不然提交参数内会丢失该参数。

如果 `get()` 方法抛出错误，会以原始值提交，并在控制台给出相应的错误信息。

第二个参数 `filterModel` 为所有字段内容，即 Props `filter-model` 的一个引用，因此对于 `dateRange` 等“范围”类型的字段，如果需要提交为单独 2 个字符串形式的话，可用以下方式：

```js
{
  type: 'dateRange',
  model: 'startDate',
  label: '日期范围',
  get(val, filterModel) {
    const [startDate, endDate] = val
    filterModel.endDate = endDate
    return startDate
  }
}
```

:::

### 私有配置 `trim` <Badge text="1.2.11+" vertical="middel" />

- type: `Boolean`

对于 `text` 字段，默认在失焦后会执行 trim 操作，传入 `false` 即可关闭该行为。

### 私有配置 `options`

- type: `Array` | `Promise` | `() => Promise<options>` | `(done) => void`
- default: `[]`

对于 `select` , `multipleSelect` , `cascader` 字段，可通过 `options` 属性配置选项值：

#### `select`

支持属性和 [optionAttributes][option-attributes] 相同。

| 参数     | 说明       | 类型                 | 可选值 | 默认值 |
| -------- | ---------- | -------------------- | ------ | ------ |
| value    | 选项的值   | string/number/object | -      | -      |
| label    | 选项的标签 | string/number        | -      | -      |
| disabled | 是否禁用   | boolean              | -      | false  |

#### `multipleSelect`

与上面 [select](#select) 相同，略。

#### `cascader`

支持属性和 [Cascader - options](http://element.eleme.io/#/zh-CN/component/cascader#attributes) 相同。

#### 异步选项 <Badge text="1.1.0+" />

有时需要从其他接口选项内容，可在 `options` 传入函数来进行异步填充，支持 2 种方式：

1\. `Promise`：

```js
{
  type: 'select',
  model: 'promiseOptions',
  label: 'promiseOptions',
  options() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { label: '单选项 1', value: 1 },
          { label: '单选项 2', value: 2 },
          { label: '单选项 3', value: 3 }
        ])
      }, 3000)
    })
  }
}
```

2\. 使用第一个参数 `done(options)` ：

```js
{
  type: 'multipleSelect',
  model: 'asyncOptions',
  label: 'asyncOptions',
  options: done => {
    setTimeout(() => {
      done([
        { label: '多选项 1', value: 1 },
        { label: '多选项 2', value: 2 },
        { label: '多选项 3', value: 3 }
      ])
    }, 3000)
  }
}
```

### componentSlots

- type: `Object`
- default: `{}`

该配置目前仅对于 `text` 类型字段有效，可通过添加组件支持的 slot 名 `prepend` `append` 为文本框添加前置或后置附加元素，支持 JSX：

```js
{
  type: 'text',
  componentSlots: {
    prepend: '$',
    append: '$'
    // prepend: <strong>$</strong>,
    // append: <strong>$</strong>
  },
},
```

### componentProps

- type: `Object`
- default: `{}`

除了上面封装的“公共配置”和“私有配置”，如果针对不同字段组件有不同的参数配置，可以查阅[各自对应 Element-UI 组件](#type-字段类型可选值)支持的 props 后，使用 `componentProps` 来直接传入，例：

```js
{
  type: 'text',
  model: 'datatext',
  componentProps: {
    'suffix-icon': 'el-icon-date'
  }
},
```

### componentEvents

- type: `Object`
- default: `{}`

可传入[各自对应 Element-UI 组件](#type-字段类型可选值)的 Events 。

## 组合 <Badge text="1.1.0+" />

搜索栏每个字段组件为一个单位，默认超过屏幕宽度的组件会自动收起。

但对于有些需要组合多个字段组件的场景（如 “开始-结束” 2 个文本框），不想被自动收起功能分开成 2 个部分，可以使用组合配置形式，组合内的所有组件会视为一个单位，在收起时不被拆开，配置方式为将想要组合的元素放入一个数组内：

```js
{
  // ...
  filterFields: [
    { type: 'text', model: 'text', label: '普通文本' },
    // 以下 2 个文本字段会展现为一个整体
    [
      { type: 'text', model: 'text1', label: '文本1' },
      { type: 'text', model: 'text2', label: '文本2' }
    ]
  ]
}
```

## JSX

也支持直接传入 JSX ，但注意通过这种形式传入的表单元素所包含的值不会包含在提交参数内，<mark>需要自行将需要提交的数据在合适的时间点写入给 [`filterModel`](/dev/props.md#filtermodel) ，或者通过 [`transformRequestData`](/dev/props.md#transformrequestdata) 来附加包含相应的数据</mark>。

```jsx
export default {
  data() {
    return {
      filterModel: {
        jsx: 'text from data'
      },
      filterButtons: [
        {
          // 如果需要渲染本实例内的数据，可使用 render 属性。需要注意 `render` 对内部 this 指向有要求，因此需要通过以下的形式定义：
          render: () => {
            return (
              <input
                value={this.filterModel.jsx}
                on-input={e => (this.filterModel.jsx = e.target.value)}
              />
            )
          }
        },

        // 或
        {
          render: function() {
            return (
              <input
                value={this.text}
                on-input={e => (this.text = e.target.value)}
              />
            )
          }.bind(this)
        },

        // 也支持使用 label 设置顶部的字段说明装饰元素，
        // 但需要注意需要设置 model 以及 filterModel 内有相匹配的属性，
        // 如果是自定义组件需要自行实现写入值的逻辑，
        // 参数 field 为该 object 项自身。
        {
          label: 'jsx',
          model: 'jsx',
          render: field => {
            return (
              <input
                value={this.filterModel.jsx}
                on-input={e => (this.filterModel.jsx = e.target.value)}
              />
            )
          }
        },

        // 或者可以简写成
        () => (
          <input
            value={this.text}
            on-input={e => (this.text = e.target.value)}
          />
        ),

        // 对于只需要绑定事件的场景，可以简写成以下的形式。
        // 注意：由于 JSX 解析后 this 指向会改变，因此如果需要立即使用本实例自身数据（如输出数据到内容）的时候，不能用下面这种形式。
        <button on-click={this.showDialog}>JSX 按钮</button>,
        <button on-click={() => this.showDialog(this.text)}>JSX 按钮</button>
      ]
    }
  },
  methods: {
    showDialog(text) {}
  }
  // ...
}
```

[text]: http://element.eleme.io/#/zh-CN/component/input
[number]: http://element.eleme.io/#/zh-CN/component/input-number
[select]: http://element.eleme.io/#/zh-CN/component/select
[multiple-select]: http://element.eleme.io/#/zh-CN/component/select#ji-chu-duo-xuan
[date]: http://element.eleme.io/#/zh-CN/component/date-picker#xuan-ze-ri
[date-range]: http://element.eleme.io/#/zh-CN/component/date-picker#xuan-ze-ri-qi-fan-wei
[time-select]: http://element.eleme.io/#/zh-CN/component/time-picker#gu-ding-shi-jian-dian
[time-picker]: http://element.eleme.io/#/zh-CN/component/time-picker#ren-yi-shi-jian-dian
[time-picker-range]: http://element.eleme.io/#/zh-CN/component/time-picker#ren-yi-shi-jian-fan-wei
[date-time]: http://element.eleme.io/#/zh-CN/component/datetime-picker#ri-qi-he-shi-jian-dian
[date-time-range]: http://element.eleme.io/#/zh-CN/component/datetime-picker#ri-qi-he-shi-jian-fan-wei
[cascader]: http://element.eleme.io/#/zh-CN/component/cascader
[option-attributes]: http://element.eleme.io/#/zh-CN/component/select#option-attributes
