# Prop: filterFields

- type: `Array`
- default: `[]`

配置搜索栏搜索字段，一个数组项对应一个表单字段。支持传入 Object 和 JSX 。

## 配置属性

### 公共配置

以下为所有类型都共有的属性配置：

| 参数           | 类型    | 说明                                                                      |
| -------------- | ------- | ------------------------------------------------------------------------- |
| type           | String  | 字段类型                                                                  |
| model          | String  | 提交时字段的 key 名                                                       |
| label          | String  | 字段中文说明                                                              |
| disabled       | Boolean | 是否禁用                                                                  |
| componentProps | Object  | 可传入各自组件自身的 props ，具体可查看 [componentProps](#componentprops) |

#### `type` 字段类型可选值

内置的可选字段类型有：

| type            | 说明         | 对应 Element-UI 组件                 |
| --------------- | ------------ | ------------------------------------ |
| text            | 文本字段     | [Text][text]                         |
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

### 私有配置 `options`

- type: `Array`
- default: `[]`

除了以上公共属性，针对一下几种选择类型的字段，还有 `options` 属性可以方便配置选项值：

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

### componentProps

- type: `Array`
- default: `[]`

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

## JSX

也支持直接传入 JSX ，但注意通过这种形式传入的表单元素所包含的值不会包含在提交参数内，<mark>需要自行将需要提交的数据在合适的时间点写入给 [`filterModel`](/dev/props.md#filtermodel) ，或者通过 [`transformRequestData`](/dev/props.md#transformrequestdata) 来附加包含相应的数据</mark>。

[text]: http://element.eleme.io/#/zh-CN/component/input
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
