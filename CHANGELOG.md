# 1.0.0-alpha.6 (2018-09-10)

### Features

- transformRequestData 返回 false 可阻止请求发出 ([452bbc5](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/452bbc5))

# 1.0.0-alpha.5 (2018-09-10)

### Change

- prop resolveRequestErrorMessage 更名为 resolveResponseErrorMessage ([1644eb7](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/1644eb7))

### Bug Fixes

- 修复翻页操作 page_size 参数错误 ([c1fca14](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/c1fca14))

# 1.0.0-alpha.4 (2018-09-07)

### Features

- 搜索、重置按钮分别增加触发 filter-submit, filter-reset 事件

# 1.0.0-alpha.3 (2018-09-05)

### Features

- **field:** 增加 componentEvents 可传入组件事件
- 通过浏览器 script 引入组件情况下自动 install

### Documentation

- 完善文档演示代码

# 1.0.0-alpha.2 (2018-09-04)

### Change

- 关闭 css extract ，无需再单独引入 listview.css ([de67c24](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/de67c24))

### Features

- filterButtons, filterFields 支持 render() 属性 ([fbd4043](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/fbd4043))

### Documentation

- 增加 changelog ([d4212b3](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/d4212b3))

### Tests

- 增加单元测试文件 ([285709e](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/285709e))

# 1.0.0-alpha.1 (2018-08-31)

### Change

- withCredentials 默认修改为 true ([d1aecc1f6](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/d1aecc1f6))

### Bug Fixes

- **style:** 修复 filterbar 在原项目 css reset 下样式错误 ([49732789f](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/49732789f))
- **field:** 修复搜索栏内置字段类型 componentProp 无法覆盖内置默认值问题 ([50ed94849](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/50ed94849))

### Features

- 增加 requestDataKeyCase 可进行简单的配置请求参数拼写方案 ([b4edbc807](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/b4edbc807))
- add release scripts ([7868764af](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/7868764af))

### Documentation

- 文档补充 transformResponseData ([59d571d11](http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview/commit/59d571d11))
