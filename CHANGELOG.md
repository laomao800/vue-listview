# 1.0.0-alpha.14 (2018-10-09)

### Features

- 增加 listview-container ([0d6cba6](http://192.168.1.122:3000/pps-fe/vue-listview/commit/0d6cba6))
- search(keepInPage) 增加 keepInPage 控制数据请求保留在当前页码 ([25563d4](http://192.168.1.122:3000/pps-fe/vue-listview/commit/25563d4))

# 1.0.0-alpha.13 (2018-10-08)

### Bug Fixes

- 修复接口报错不显示错误信息问题 ([ef63c0d](http://192.168.1.122:3000/pps-fe/vue-listview/commit/ef63c0d))

# 1.0.0-alpha.12 (2018-09-29)

### Bug Fixes

- 点击搜索栏页码重置回第一页 ([6d31b0a](http://192.168.1.122:3000/pps-fe/vue-listview/commit/6d31b0a))
- 搜索时提交前先过滤掉条件中的无效数据 ([64a2b02](http://192.168.1.122:3000/pps-fe/vue-listview/commit/64a2b02))

# 1.0.0-alpha.11 (2018-09-26)

### Bug Fixes

- fix: 修复自动以 requestHandler 时 loading 状态不消失问题 ([5e8b26b](http://192.168.1.122:3000/pps-fe/vue-listview/commit/5e8b26b))

# 1.0.0-alpha.10 (2018-09-25)

### Features

- filterField 新增 label 、 number 2 种类型 ([41c3d41](http://192.168.1.122:3000/pps-fe/vue-listview/commit/41c3d41))
- filterField 增加 componentSlots 配置属性用于配置字段组件 slot ([28e28d9](http://192.168.1.122:3000/pps-fe/vue-listview/commit/28e28d9))
- filterButtons 支持 loading 属性 （仅支持通过 methods 返回 loading 状态） ([46035df](http://192.168.1.122:3000/pps-fe/vue-listview/commit/46035df))

# 1.0.0-alpha.9 (2018-09-20)

### Features

- 表格增加单选模式 ([e2a6e78](http://192.168.1.122:3000/pps-fe/vue-listview/commit/e2a6e78))

# 1.0.0-alpha.8 (2018-09-19)

### Bug Fixes

- 修复重设窗口大小时 filterbar 计算位置错误问题 ([e1c31cb](http://192.168.1.122:3000/pps-fe/vue-listview/commit/e1c31cb))

# 1.0.0-alpha.7 (2018-09-18)

### Bug Fixes

- 修复多次请求互相取消时出现空白错误信息 ([31a1bd5](http://192.168.1.122:3000/pps-fe/vue-listview/commit/31a1bd5))
- 修复 paginationHeight 高度获取无效导致重置布局失效问题 ([32957e2](http://192.168.1.122:3000/pps-fe/vue-listview/commit/32957e2))

# 1.0.0-alpha.6 (2018-09-10)

### Features

- transformRequestData 返回 false 可阻止请求发出 ([452bbc5](http://192.168.1.122:3000/pps-fe/vue-listview/commit/452bbc5))

# 1.0.0-alpha.5 (2018-09-10)

### Change

- prop resolveRequestErrorMessage 更名为 resolveResponseErrorMessage ([1644eb7](http://192.168.1.122:3000/pps-fe/vue-listview/commit/1644eb7))

### Bug Fixes

- 修复翻页操作 page_size 参数错误 ([c1fca14](http://192.168.1.122:3000/pps-fe/vue-listview/commit/c1fca14))

# 1.0.0-alpha.4 (2018-09-07)

### Features

- 搜索、重置按钮分别增加触发 filter-submit, filter-reset 事件

# 1.0.0-alpha.3 (2018-09-05)

### Features

- **field:** 增加 componentEvents 可传入组件事件
- 通过浏览器 script 引入组件情况下自动 install

# 1.0.0-alpha.2 (2018-09-04)

### Change

- 关闭 css extract ，无需再单独引入 listview.css ([de67c24](http://192.168.1.122:3000/pps-fe/vue-listview/commit/de67c24))

### Features

- filterButtons, filterFields 支持 render() 属性 ([fbd4043](http://192.168.1.122:3000/pps-fe/vue-listview/commit/fbd4043))

# 1.0.0-alpha.1 (2018-08-31)

### Change

- withCredentials 默认修改为 true ([d1aecc1f6](http://192.168.1.122:3000/pps-fe/vue-listview/commit/d1aecc1f6))

### Bug Fixes

- **style:** 修复 filterbar 在原项目 css reset 下样式错误 ([49732789f](http://192.168.1.122:3000/pps-fe/vue-listview/commit/49732789f))
- **field:** 修复搜索栏内置字段类型 componentProp 无法覆盖内置默认值问题 ([50ed94849](http://192.168.1.122:3000/pps-fe/vue-listview/commit/50ed94849))

### Features

- 增加 requestDataKeyCase 可进行简单的配置请求参数拼写方案 ([b4edbc807](http://192.168.1.122:3000/pps-fe/vue-listview/commit/b4edbc807))
- add release scripts ([7868764af](http://192.168.1.122:3000/pps-fe/vue-listview/commit/7868764af))
