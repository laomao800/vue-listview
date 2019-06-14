# Prop: filterButtons

- type: `Array`
- default: `[]`

用于配置搜索栏左侧的操作按钮，一个数组项对应一个操作按钮。支持传入 Object 和 JSX 。

## 配置属性

### type

- type: `String`
- default: `'default'`

按钮样式，可选，支持类型： `primary` , `success` , `info` , `warning` , `danger` , `text` 。

### icon

- type: `String`
- default: `''`

按钮图标，可直接使用 [Element UI icon](http://element.eleme.io/#/zh-CN/component/icon) 内的值。该值仅直接输出于 `class` 属性上，因此有其他字体图标的使用需要，如 `font-awesome` 可自行于项目中引入使用即可。

### plain

- type: `Boolean`
- default: `false`

是否显示为线框按钮样式。

### text

- type: `String`
- default: `''`

按钮显示文本。

### click

- type: `Fundtion(event)`
- default: `null`

按钮点击事件。支持自定义函数或者直接触发 Vue 实例本身的 method ：

```js
export default {
  data() {
    return {
      filterButtons: [
        // 自定义函数
        {
          text: '导出',
          click() {
            window.open('export path')
          }
        },

        // 如果自定义函数中有需要访问 this ，需要使用箭头函数，或者 bind
        {
          text: '导出',
          click: () => {
            alert(this.filterButtons.length)
          }
          // 或者
          // click() {
          //   alert(this.filterButtons.length)
          // }.bind(this)
        },

        // 直接访问 methods 内的方法
        { text: '按钮', click: this.showDialog }
      ]
    }
  },
  methods: {
    showDialog() {
      // showDialog
    }
  }
  // ...
}
```

### key

- type: `String`
- default: `null`

同 vue 组件的 `:key` 属性，若不设置会直接使用循环下标。

### children

- type: `Array`
- default: `null`

按钮下拉菜单子选项，不支持多级，仅支持 `icon` , `text` , `click` 。

### splitButton

- type: `Boolean`
- default: `false`

在有子菜单的情况下，可控制触发按钮是否呈现为左右分裂式。

### render

- type: `Function`
- default: `undefined`

可直接 return 一个 JSX ，具体使用方式可以参考下方 JSX 小节。

## JSX

支持以 JSX 的形式传入，有多种写法支持不同的使用场景：

```jsx
export default {
  data() {
    return {
      text: 'text from data',
      filterButtons: [
        // 如果需要渲染本实例内的数据，可使用 render 属性。需要注意 `render` 对内部 this 指向有要求，因此需要通过以下的形式定义：
        {
          render: () => {
            return <button>{this.text}</button>
          }
        },

        // 或
        {
          render: function() {
            return <button>{this.text}</button>
          }.bind(this)
        },

        // 或者可以简写成（推荐）
        () => <button>{this.text}</button>,

        // 如果按钮需要有 loading 状态也可以通过这种形式定义
        () => (
          <el-button
            loading={this.btnLoading}
            on-click={(this.btnLoading = true)}
          >
            导出
          </el-button>
        ),

        // 对于非立即使用数据（输出数据到界面）的时候，如只在事件绑定内使用数据，
        // 也可直接简写返回 JSX 内容无需通过函数包装。
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
