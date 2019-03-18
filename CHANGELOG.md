# [1.1.0](https://github.com/laomao800/vue-listview/compare/v1.0.2...v1.1.0) (2019-03-18)


### Features

* **filterFields:** select, multipleSelect, cascader 类型 options 属性支持函数返回 Promise 或通过 done 参数异步填充选项 ([f726095](https://github.com/laomao800/vue-listview/commit/f726095))
* **filterFields:** 支持通过数组形式对搜索字段进行分组展示 ([2ba6046](https://github.com/laomao800/vue-listview/commit/2ba6046))



## [1.0.2](https://github.com/laomao800/vue-listview/compare/v1.0.1...v1.0.2) (2019-03-07)


### Bug Fixes

* type fixed ([49a7435](https://github.com/laomao800/vue-listview/commit/49a7435))
* update Element-UI to 2.6.1 ([6fd2a98](https://github.com/laomao800/vue-listview/commit/6fd2a98))



## [1.0.1](https://github.com/laomao800/vue-listview/compare/v1.0.0...v1.0.1) (2019-02-19)


### chore

* 移除 contentMinHeight 避免配置上产生误解。 ([4fce9b4](https://github.com/laomao800/vue-listview/commit/4fce9b4))


### BREAKING CHANGES

* 移除 contentMinHeight



# [1.0.0](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.4...v1.0.0) (2019-01-31)


### Bug Fixes

* types fix ([06965dc](https://github.com/laomao800/vue-listview/commit/06965dc))
* 事件 filter-submit 增加返回参数 filterModel ([f43ea94](https://github.com/laomao800/vue-listview/commit/f43ea94))
* 修复 full-height 为 `false` 时表格自动高度样式展示问题 ([647c285](https://github.com/laomao800/vue-listview/commit/647c285))
* 请求内容数据后重置 el-table 垂直滚动距离 ([c92f6e6](https://github.com/laomao800/vue-listview/commit/c92f6e6))



# [1.0.0-beta.4](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2018-12-06)


### Bug Fixes

* 修正内部取消请求时界面丢失 loading 并显示“未知错误”问题 ([008da3a](https://github.com/laomao800/vue-listview/commit/008da3a))
* 增加 ListviewContainer types ([26bfb5f](https://github.com/laomao800/vue-listview/commit/26bfb5f))



# [1.0.0-beta.3](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-12-05)


### Bug Fixes

* fix types ([8b864fa](https://github.com/laomao800/vue-listview/commit/8b864fa))



# [1.0.0-beta.2](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-12-04)


### Bug Fixes

* 修复部分外部使用的文件中使用 @ 符号查找不到资源问题 ([30f967e](https://github.com/laomao800/vue-listview/commit/30f967e))



# [1.0.0-beta.1](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.21...v1.0.0-beta.1) (2018-11-26)


### Bug Fixes

* 修复 usePage 变更后不会删除页码提交参数 ([a246a7b](https://github.com/laomao800/vue-listview/commit/a246a7b))
* 修复非 Vue.use 引用时 $LISTVIEW 获取失效问题 ([b0371a2](https://github.com/laomao800/vue-listview/commit/b0371a2))


### Features

* 支持 Vue.use 时或 Vue.prototype.$LISTVIEW 设置全局配置 ([064db6c](https://github.com/laomao800/vue-listview/commit/064db6c))



# [1.0.0-alpha.21](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2018-11-14)


### Bug Fixes

* get-value isObject 方法与原始库保持一致，并增加原始单元测试 ([b810ee7](https://github.com/laomao800/vue-listview/commit/b810ee7))
* 修复 listview-contaier 在部分浏览器下边框显示样式问题 ([cb1aba0](https://github.com/laomao800/vue-listview/commit/cb1aba0))
* 修复部分国产浏览器下在开发模式 isValidObject 报错问题 ([6b7208e](https://github.com/laomao800/vue-listview/commit/6b7208e))
* 修复部分浏览器 getBoundingClientRect 获取不到 x 值导致按钮偏移量无法计算问题 ([eafc8d8](https://github.com/laomao800/vue-listview/commit/eafc8d8))
* **filterFields:** 仅对有 model 属性的配置项进行重复 model 判断 ([5ec8959](https://github.com/laomao800/vue-listview/commit/5ec8959))


### Features

* filterFields 支持 get 属性配置获取值的方法 ([aa628bd](https://github.com/laomao800/vue-listview/commit/aa628bd))
* 提示 filterFields 内的重复 model 值 ([d760242](https://github.com/laomao800/vue-listview/commit/d760242))


### Performance Improvements

* listview-container 内使用 keep-alive ，避免 listview 切换时由于节点复用多次触发自身 watcher ([ab64375](https://github.com/laomao800/vue-listview/commit/ab64375))



# [1.0.0-alpha.20](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2018-11-05)


### Bug Fixes

* **filterbar:** text trim value ([28897f1](https://github.com/laomao800/vue-listview/commit/28897f1))


### Features

* add types ([62dbb31](https://github.com/laomao800/vue-listview/commit/62dbb31))
* 使用 abstract 组件替代原 functional v-node 组件 ([8142afd](https://github.com/laomao800/vue-listview/commit/8142afd))



# [1.0.0-alpha.19](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2018-10-30)


### Bug Fixes

* Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错 ([30cec60](https://github.com/laomao800/vue-listview/commit/30cec60))
* 修复在内容已有数据情况下无法显示报错信息问题 ([69368a6](https://github.com/laomao800/vue-listview/commit/69368a6))
* 更新 Element-UI v2.4.9 ([ae382bc](https://github.com/laomao800/vue-listview/commit/ae382bc))


### Code Refactoring

* 调整 page 默认参数键名 ([9383a0e](https://github.com/laomao800/vue-listview/commit/9383a0e))


### Features

* usePage 支持传入 Object 类型指定分页参数名 ([df776e8](https://github.com/laomao800/vue-listview/commit/df776e8))


### BREAKING CHANGES

* - `contentDataMap` 默认值的 total 映射路径修改为 `result.total_count`



# [1.0.0-alpha.18](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.16...v1.0.0-alpha.18) (2018-10-29)


### Bug Fixes

* 内部处理 response 直接处理 axios 相应内容的 data 属性，以和自定义 requestHandler 时验证表现一致 ([1ba116d](https://github.com/laomao800/vue-listview/commit/1ba116d))



# [1.0.0-alpha.16](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2018-10-29)


### Bug Fixes

* update eslint-plugin-vue to 5.0.0-beta.3 ([6b772cb](https://github.com/laomao800/vue-listview/commit/6b772cb))
* update storybook-readme ([1cd6d81](https://github.com/laomao800/vue-listview/commit/1cd6d81))
* 修正 lint 错误 ([5fea1cf](https://github.com/laomao800/vue-listview/commit/5fea1cf))
* 修正测试用例及 snapshots ([d39a880](https://github.com/laomao800/vue-listview/commit/d39a880))


### Features

* filterButton 支持 plain 类型 ([59a4bb7](https://github.com/laomao800/vue-listview/commit/59a4bb7))
* headerNav 支持只传入 string 类型 ([625f8ff](https://github.com/laomao800/vue-listview/commit/625f8ff))
* 搜索栏 select 与 multiple-select 默认开启搜索功能 ([dbff66e](https://github.com/laomao800/vue-listview/commit/dbff66e))



# [1.0.0-alpha.15](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.14...v1.0.0-alpha.15) (2018-10-16)


### Features

* 搜索栏回车触发搜索操作 ([12e11d1](https://github.com/laomao800/vue-listview/commit/12e11d1))
* **storybook:** 添加 storybook 演示 ([d5c8978](https://github.com/laomao800/vue-listview/commit/d5c8978))



# [1.0.0-alpha.14](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.13...v1.0.0-alpha.14) (2018-10-10)


### Features

* listview-container ([0d6cba6](https://github.com/laomao800/vue-listview/commit/0d6cba6))
* search(keepInPage) 增加 keepInPage 控制数据请求保留在当前页码 ([25563d4](https://github.com/laomao800/vue-listview/commit/25563d4))



# [1.0.0-alpha.13](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.12...v1.0.0-alpha.13) (2018-10-08)


### Bug Fixes

* 修复接口报错不显示错误信息问题 ([ef63c0d](https://github.com/laomao800/vue-listview/commit/ef63c0d))



# [1.0.0-alpha.12](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.11...v1.0.0-alpha.12) (2018-09-28)


### Bug Fixes

* 搜索时提交前先过滤掉条件中的无效数据 ([6424222](https://github.com/laomao800/vue-listview/commit/6424222))
* 搜索时提交前先过滤掉条件中的无效数据 ([64a2b02](https://github.com/laomao800/vue-listview/commit/64a2b02))
* 点击搜索栏页码重置回第一页 ([6d31b0a](https://github.com/laomao800/vue-listview/commit/6d31b0a))



# [1.0.0-alpha.11](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.10...v1.0.0-alpha.11) (2018-09-26)


### Bug Fixes

* 修复自动以 requestHandler 时 loading 状态不消失问题 ([5e8b26b](https://github.com/laomao800/vue-listview/commit/5e8b26b))



# [1.0.0-alpha.10](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.9...v1.0.0-alpha.10) (2018-09-25)


### Features

* filterButtons 支持 loading 属性 （仅支持通过 methods 返回 loading 状态） ([46035df](https://github.com/laomao800/vue-listview/commit/46035df))
* filterField 增加 componentSlots 配置属性用于配置字段组件 slot ([28e28d9](https://github.com/laomao800/vue-listview/commit/28e28d9))
* filterField 新增 label 、 number 2 种类型 ([41c3d41](https://github.com/laomao800/vue-listview/commit/41c3d41))



# [1.0.0-alpha.9](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2018-09-20)


### Bug Fixes

* 修复无 field 时 filterButtons 内按钮无法点击问题 ([0f2363a](https://github.com/laomao800/vue-listview/commit/0f2363a))


### Features

* 表格增加单选模式 ([e2a6e78](https://github.com/laomao800/vue-listview/commit/e2a6e78))



# [1.0.0-alpha.8](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-09-19)


### Bug Fixes

* 修复重设窗口大小时 filterbar 计算位置错误问题 ([e1c31cb](https://github.com/laomao800/vue-listview/commit/e1c31cb))



# [1.0.0-alpha.7](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-09-18)


### Bug Fixes

* 修复 paginationHeight 高度获取无效导致重置布局失效问题 ([32957e2](https://github.com/laomao800/vue-listview/commit/32957e2))
* 修复多次请求互相取消时出现空白错误信息 ([31a1bd5](https://github.com/laomao800/vue-listview/commit/31a1bd5))



# [1.0.0-alpha.6](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2018-09-10)


### Features

* transformRequestData 返回 false 可阻止请求发出 ([452bbc5](https://github.com/laomao800/vue-listview/commit/452bbc5))



# [1.0.0-alpha.5](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2018-09-10)


### Bug Fixes

* 修复翻页操作 page_size 参数错误 ([c1fca14](https://github.com/laomao800/vue-listview/commit/c1fca14))



# [1.0.0-alpha.4](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2018-09-07)


### Features

* 搜索、重置按钮分别增加触发 filter-submit, filter-reset 事件 ([e4770fe](https://github.com/laomao800/vue-listview/commit/e4770fe))



# [1.0.0-alpha.3](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2018-09-05)


### Features

* 通过浏览器 script 引入组件情况下自动 install ([346576e](https://github.com/laomao800/vue-listview/commit/346576e))
* **filterbar:** 增加 componentEvents 可传入组件事件 ([5ec23f1](https://github.com/laomao800/vue-listview/commit/5ec23f1))



# [1.0.0-alpha.2](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2018-09-04)


### Features

* filterButtons, filterFields 支持 render() 属性 ([fbd4043](https://github.com/laomao800/vue-listview/commit/fbd4043))



# [1.0.0-alpha.1](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.0...v1.0.0-alpha.1) (2018-08-31)


### Bug Fixes

* **field:** 搜索栏内置字段类型 prop 合并流程调整，修复 componentProp 无法覆盖内置默认值问题 ([50ed948](https://github.com/laomao800/vue-listview/commit/50ed948))
* **style:** 修复 filterbar 在原项目 css reset 下样式错误 ([4973278](https://github.com/laomao800/vue-listview/commit/4973278))


### Features

* add release scripts ([7868764](https://github.com/laomao800/vue-listview/commit/7868764))
* 增加 requestDataKeyCase 可进行简单的配置请求参数拼写方案 ([b4edbc8](https://github.com/laomao800/vue-listview/commit/b4edbc8))



# [1.0.0-alpha.0](https://github.com/laomao800/vue-listview/compare/94d9d3d...v1.0.0-alpha.0) (2018-08-30)


### Bug Fixes

* 修复 resize 出现滚动条导致 filter bar 提交按钮偏移问题 ([ad0159a](https://github.com/laomao800/vue-listview/commit/ad0159a))


### Features

* contentDataMap ([2a255a2](https://github.com/laomao800/vue-listview/commit/2a255a2))
* contentMessage (validateResponse, resolveRequestErrorMessage) ([543b460](https://github.com/laomao800/vue-listview/commit/543b460))
* filterbar 代码优化 ([94d9d3d](https://github.com/laomao800/vue-listview/commit/94d9d3d))
* table-columns, table-props, table-events, table-select-enable, table-selection ([cd8e582](https://github.com/laomao800/vue-listview/commit/cd8e582))



