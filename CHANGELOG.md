# [1.5.0](https://github.com/laomao800/vue-listview/compare/v1.5.0-4...v1.5.0) (2021-07-06)


### Features

* 添加 prop `pressEnterSearch` ([fb0bd8d](https://github.com/laomao800/vue-listview/commit/fb0bd8dcd9b1b14241c5a494d4d01d4a3394300c))



# [1.5.0-4](https://github.com/laomao800/vue-listview/compare/v1.5.0-2...v1.5.0-4) (2021-04-30)


### Bug Fixes

* 修复 searchButton & resetButton props 失效 ([520f8fd](https://github.com/laomao800/vue-listview/commit/520f8fd7e5f1bc08f668cc89a544dd47f2dc0b47))


### Features

* transformResponseFn & transformRequestFn 支持返回 promise ([d883a2d](https://github.com/laomao800/vue-listview/commit/d883a2d13590f043e1073f11c40fa11dc1577778))



# [1.5.0-2](https://github.com/laomao800/vue-listview/compare/v1.5.0-1...v1.5.0-2) (2021-03-29)


### Bug Fixes

* 修复初始化 pageSize 值丢失 ([864052d](https://github.com/laomao800/vue-listview/commit/864052d1a92978ee79a63a06866b8fa3b9765094))



# [1.5.0-1](https://github.com/laomao800/vue-listview/compare/v1.4.0...v1.5.0-1) (2021-03-16)


### Features

* 增加搜索栏上下左右插槽 & 搜索/重置 按钮支持自定义 ([fd5324b](https://github.com/laomao800/vue-listview/commit/fd5324b43f89854c9bbdb31eddc1d86429e7724b))


### Reverts

* Revert "修复容器宽度改变, listview布局更新问题" ([6af7fe8](https://github.com/laomao800/vue-listview/commit/6af7fe874fa1b9a4f0d78e9bcc72be44e455cc07))



# [1.4.0](https://github.com/laomao800/vue-listview/compare/v1.3.0...v1.4.0) (2020-05-26)


### Features

* 增加 3 个 footer 区域插槽 ([07ac0c0](https://github.com/laomao800/vue-listview/commit/07ac0c0ac1e28caf7c3c931a1518ffb3cafeb636))



# [1.3.0](https://github.com/laomao800/vue-listview/compare/v1.2.12...v1.3.0) (2020-04-29)


### Features

* 增加 `page-props` 设置分页组件 ([8904ab3](https://github.com/laomao800/vue-listview/commit/8904ab3a06e107179ecc6466e3d9f6d1684dad03))



## [1.2.12](https://github.com/laomao800/vue-listview/compare/v1.2.11...v1.2.12) (2020-01-10)


### Bug Fixes

* 修正传入 usePage 无法覆盖全局设置 ([7c1e147](https://github.com/laomao800/vue-listview/commit/7c1e1478d502e4a64c4697b61ad7100433840bb5))



## [1.2.11](https://github.com/laomao800/vue-listview/compare/v1.2.10...v1.2.11) (2019-12-10)


### Bug Fixes

* 修正 filterFields 内 trim 行为错误 ([7281f9f](https://github.com/laomao800/vue-listview/commit/7281f9f2bf725acca5459d822433902960a5d4d2))
* 修正组合类的 filterFields 设置 get() 后未生效 ([f5c0c6a](https://github.com/laomao800/vue-listview/commit/f5c0c6acb07bfcc2358e4097f39ee214e7c63446))



## [1.2.10](https://github.com/laomao800/vue-listview/compare/v1.2.9...v1.2.10) (2019-12-09)


### Bug Fixes

* 修复全局设置 usePage 失效 ([1cd0764](https://github.com/laomao800/vue-listview/commit/1cd076450d97d75f627915627fc9ef48560d896b))



## [1.2.9](https://github.com/laomao800/vue-listview/compare/v1.2.8...v1.2.9) (2019-12-05)


### Bug Fixes

* 修正搜索按钮偏移量出现非整数数字导致边缘模糊 ([b60af12](https://github.com/laomao800/vue-listview/commit/b60af120cf5da6ad9f4be574103ebe3f36798e21))



## [1.2.8](https://github.com/laomao800/vue-listview/compare/v1.2.7...v1.2.8) (2019-11-28)


### Bug Fixes

* 修正单选表格模式下 selectable 失效 ([cad00fb](https://github.com/laomao800/vue-listview/commit/cad00fb5814fa372df15115a7b2cf9030dd1ca46))
* 更新依赖包版本，修正部分项目 'core-js-pure' 引用错误 ([fb55831](https://github.com/laomao800/vue-listview/commit/fb558316260ba2cdd438abe8d1a01508dd84a3d9))



## [1.2.7](https://github.com/laomao800/vue-listview/compare/v1.2.6...v1.2.7) (2019-11-14)


### Bug Fixes

* 修正 filterField getter 错误未正确触发提示 ([16c0d75](https://github.com/laomao800/vue-listview/commit/16c0d75539ab51a1ee42e43b8ea9f032ded95697))
* 修正全局配置 $LISTVIEW 未被传入同名 props 覆盖 ([fe8cfd1](https://github.com/laomao800/vue-listview/commit/fe8cfd14d70b866218cea9029dd7dea2bbfce45b))


### Features

* listview 实例提供 resetFilter() 重置搜索栏 ([1770954](https://github.com/laomao800/vue-listview/commit/177095461b6f1eaa6adb6c2e682e88e86f84ec72))
* search() 方法返回一个 Promise ([3f30be1](https://github.com/laomao800/vue-listview/commit/3f30be14435aed03ac943e40b27cbba280fa5d7a))



## [1.2.6](https://github.com/laomao800/vue-listview/compare/v1.2.5...v1.2.6) (2019-09-06)


### Bug Fixes

* 修正 filterFields 内组合形式的字段无法重置 ([5946a57](https://github.com/laomao800/vue-listview/commit/5946a573dc4e423abb4a8c57fb615c9c4909a9ee))



## [1.2.5](https://github.com/laomao800/vue-listview/compare/v1.2.4...v1.2.5) (2019-08-29)


### Bug Fixes

* 修正 tableProps.rowClassName 配置无效 ([aff2d8f](https://github.com/laomao800/vue-listview/commit/aff2d8fe05fc2f00d6eb8fa58567b88fddc6cacd))


### Features

* 增加 before-request 与 requested 事件 ([22a13be](https://github.com/laomao800/vue-listview/commit/22a13beeaa45ae8dbc38172f5ddfade226e813d1))



## [1.2.4](https://github.com/laomao800/vue-listview/compare/v1.2.2...v1.2.4) (2019-07-18)


### Bug Fixes

* 修正使用 CDN 时全局配置 $LISTVIEW 配置不生效 ([026bfef](https://github.com/laomao800/vue-listview/commit/026bfefc794f273083deda724a496b4a8a9791ba))


### Performance Improvements

* filterButtons 与 filterFields 增加 key 属性支持 ([42053fe](https://github.com/laomao800/vue-listview/commit/42053fe7d1e3385f8a22543dfe8933fdfdb7aba2))



## [1.2.2](https://github.com/laomao800/vue-listview/compare/v1.2.1...v1.2.2) (2019-05-12)


### Bug Fixes

* 全局配置可配置 usePage ([515dcc3](https://github.com/laomao800/vue-listview/commit/515dcc3ee8f68f57cba63ec5fef8f2a8f2350ba8))
* **filterbar:** 修复 options 无法直接接收 Promise 数据 ([4f61dab](https://github.com/laomao800/vue-listview/commit/4f61dab1065c65226f353027c320ef6e1745657d))



## [1.2.1](https://github.com/laomao800/vue-listview/compare/v1.2.0...v1.2.1) (2019-04-18)


### Bug Fixes

* 修复打包后 current-script-polyfill 缺失报错 ([c1fd5b8](https://github.com/laomao800/vue-listview/commit/c1fd5b80f81b2cf660e6036429cf8557598ab1a2))



# [1.2.0](https://github.com/laomao800/vue-listview/compare/v1.1.2...v1.2.0) (2019-04-18)


### Bug Fixes

* requestMethod 默认值修改为 'post' ([3eb08a2](https://github.com/laomao800/vue-listview/commit/3eb08a267581b4dac85d35f4ae224e2c4046cec2))
* 修复在 <listview-container/> 内 table-selection.sync 无法更新成功 ([b55f913](https://github.com/laomao800/vue-listview/commit/b55f9139b6a41babc0410fe1dd09d7e782fbddfe))


### Features

* 表格选择列配置 prop 名调整，增加支持 selectable 设置禁用选择行 ([f159248](https://github.com/laomao800/vue-listview/commit/f15924873f3bf06bb27b881f3c63674d55affe82))


### BREAKING CHANGES

* tableSelectEnable 命名调整为 tableSelectionColumn
* requestMethod 默认值修改为 'post'



## [1.1.2](https://github.com/laomao800/vue-listview/compare/v1.1.1...v1.1.2) (2019-04-01)


### Bug Fixes

* 使用内置搜索类型时，避免未设置 model 时写入空键内容 ([0d7df9e](https://github.com/laomao800/vue-listview/commit/0d7df9e75619acafe298ed6854e9c80b07b3faff))
* **filterFields:** 修复 type 非 camalCase 时 multipleSelect value 报错问题 ([4eff86b](https://github.com/laomao800/vue-listview/commit/4eff86bc1d62a66e11ffa60484d1882442460603))


### Performance Improvements

* external axios lodash ([d958894](https://github.com/laomao800/vue-listview/commit/d958894e619e2d47cca62e8b044e98c5cea7a74b))
* 更新布局类方法增加 debounce ([561ecea](https://github.com/laomao800/vue-listview/commit/561eceab00a9efc182fcc8b84f22d65ff74a599e))



## [1.1.1](https://github.com/laomao800/vue-listview/compare/v1.1.0...v1.1.1) (2019-03-19)


### Bug Fixes

* **filterbar:** 修复未传 model 时 value 显示 [object Object] 问题 ([8b56ab0](https://github.com/laomao800/vue-listview/commit/8b56ab0486034738d9b3d5bec38aeed8cb772b51))



# [1.1.0](https://github.com/laomao800/vue-listview/compare/v1.0.2...v1.1.0) (2019-03-18)


### Features

* **filterFields:** select, multipleSelect, cascader 类型 options 属性支持函数返回 Promise 或通过 done 参数异步填充选项 ([f726095](https://github.com/laomao800/vue-listview/commit/f7260953164bd1ee6b3965fd63d6a922aa6142ba))
* **filterFields:** 支持通过数组形式对搜索字段进行分组展示 ([2ba6046](https://github.com/laomao800/vue-listview/commit/2ba60461844aee53d97c4387b60ce5474a4c5bb9))



## [1.0.2](https://github.com/laomao800/vue-listview/compare/v1.0.1...v1.0.2) (2019-03-07)


### Bug Fixes

* type fixed ([49a7435](https://github.com/laomao800/vue-listview/commit/49a7435568eba065d1253433fee7802a105cc854))
* update Element-UI to 2.6.1 ([6fd2a98](https://github.com/laomao800/vue-listview/commit/6fd2a989e3ac9ce842af73909d9490fd6794727a))



## [1.0.1](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.4...v1.0.1) (2019-02-19)


### Bug Fixes

* types fix ([06965dc](https://github.com/laomao800/vue-listview/commit/06965dc118fa736d1caacb1b784d6e69435f1fa3))
* 事件 filter-submit 增加返回参数 filterModel ([f43ea94](https://github.com/laomao800/vue-listview/commit/f43ea94bc10942b27853d4f1b7848b7ee9f3996e))
* 修复 full-height 为 `false` 时表格自动高度样式展示问题 ([647c285](https://github.com/laomao800/vue-listview/commit/647c285be44a15039c8f82e84d657a3b41d08327))
* 请求内容数据后重置 el-table 垂直滚动距离 ([c92f6e6](https://github.com/laomao800/vue-listview/commit/c92f6e63dbcd47230faef3a83dedade80d51f027))


### chore

* 移除 contentMinHeight 避免配置上产生误解。 ([4fce9b4](https://github.com/laomao800/vue-listview/commit/4fce9b4d72ceefdee92ad900e53712696dd1e35f))


### BREAKING CHANGES

* 移除 contentMinHeight



# [1.0.0-beta.4](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2018-12-06)


### Bug Fixes

* 修正内部取消请求时界面丢失 loading 并显示“未知错误”问题 ([008da3a](https://github.com/laomao800/vue-listview/commit/008da3acda6c4b7eecc7c2696d9aed3044800e61))
* 增加 ListviewContainer types ([26bfb5f](https://github.com/laomao800/vue-listview/commit/26bfb5f1be89fb257b2fe870cad2894ef3f4178e))



# [1.0.0-beta.3](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2018-12-05)


### Bug Fixes

* fix types ([8b864fa](https://github.com/laomao800/vue-listview/commit/8b864facde5da0ec6cfa4b57ead8168a42d3578e))



# [1.0.0-beta.2](https://github.com/laomao800/vue-listview/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2018-12-04)


### Bug Fixes

* 修复部分外部使用的文件中使用 @ 符号查找不到资源问题 ([30f967e](https://github.com/laomao800/vue-listview/commit/30f967e8a5d5c9cda252f74b75110e958e570ba6))



# [1.0.0-beta.1](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.21...v1.0.0-beta.1) (2018-11-26)


### Bug Fixes

* 修复 usePage 变更后不会删除页码提交参数 ([a246a7b](https://github.com/laomao800/vue-listview/commit/a246a7b99c000f51054c3d6ed39c81f2d402346b))
* 修复非 Vue.use 引用时 $LISTVIEW 获取失效问题 ([b0371a2](https://github.com/laomao800/vue-listview/commit/b0371a2194efc4c93ee3e2efc4149619cd1d0d75))


### Features

* 支持 Vue.use 时或 Vue.prototype.$LISTVIEW 设置全局配置 ([064db6c](https://github.com/laomao800/vue-listview/commit/064db6c9e98c1ffd3234144ec80fd0ac0fbb8d5e))



# [1.0.0-alpha.21](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2018-11-14)


### Bug Fixes

* **filterFields:** 仅对有 model 属性的配置项进行重复 model 判断 ([5ec8959](https://github.com/laomao800/vue-listview/commit/5ec8959c84787facf8165e7f99befe146b68f0f0))
* get-value isObject 方法与原始库保持一致，并增加原始单元测试 ([b810ee7](https://github.com/laomao800/vue-listview/commit/b810ee799d14eaeb8e243a7a4b90e166e891cdaf))
* 修复 listview-contaier 在部分浏览器下边框显示样式问题 ([cb1aba0](https://github.com/laomao800/vue-listview/commit/cb1aba08103f998bac1a8b571eac2e41ae792fb2))
* 修复部分国产浏览器下在开发模式 isValidObject 报错问题 ([6b7208e](https://github.com/laomao800/vue-listview/commit/6b7208e6a15021bcd12cd5976dae74011eb12cce))
* 修复部分浏览器 getBoundingClientRect 获取不到 x 值导致按钮偏移量无法计算问题 ([eafc8d8](https://github.com/laomao800/vue-listview/commit/eafc8d8e0b29beccdfdc6d7144ba9cfc15c6b201))


### Features

* filterFields 支持 get 属性配置获取值的方法 ([aa628bd](https://github.com/laomao800/vue-listview/commit/aa628bdbcb84ee94f4031aea6add5ced3f28f7f5))
* 提示 filterFields 内的重复 model 值 ([d760242](https://github.com/laomao800/vue-listview/commit/d7602426175fddc3cd551471f1a0b93d323d89c1))


### Performance Improvements

* listview-container 内使用 keep-alive ，避免 listview 切换时由于节点复用多次触发自身 watcher ([ab64375](https://github.com/laomao800/vue-listview/commit/ab6437567aa05df989c07d5141ab0b90e724f6d6))



# [1.0.0-alpha.20](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2018-11-05)


### Bug Fixes

* **filterbar:** text trim value ([28897f1](https://github.com/laomao800/vue-listview/commit/28897f1111f0685e0e4ed0bea2c68ae9ca7c4440))


### Features

* add types ([62dbb31](https://github.com/laomao800/vue-listview/commit/62dbb31bd66e9ff2b50cecd97799f3e3643f9411))
* 使用 abstract 组件替代原 functional v-node 组件 ([8142afd](https://github.com/laomao800/vue-listview/commit/8142afd54f95f6f1b6cd135f911497deb452173e))



# [1.0.0-alpha.19](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2018-10-30)


### Bug Fixes

* Element-UI v2.4.9 多选 select 初始 value 需要提供 array 类型避免报错 ([30cec60](https://github.com/laomao800/vue-listview/commit/30cec60cfdada69fbdd3d6afc99c43e9edd7d6d8))
* 修复在内容已有数据情况下无法显示报错信息问题 ([69368a6](https://github.com/laomao800/vue-listview/commit/69368a641d0cef48e0ca955ab8700978638d68fe))
* 更新 Element-UI v2.4.9 ([ae382bc](https://github.com/laomao800/vue-listview/commit/ae382bc69666b0f53e7c5f92baa67ba9dc3da3d8))


### Code Refactoring

* 调整 page 默认参数键名 ([9383a0e](https://github.com/laomao800/vue-listview/commit/9383a0e92fabdae975e529fa6af7831d1f1624ec))


### Features

* usePage 支持传入 Object 类型指定分页参数名 ([df776e8](https://github.com/laomao800/vue-listview/commit/df776e821ff491f536f19038a2a19359ef646b40))


### BREAKING CHANGES

* - `contentDataMap` 默认值的 total 映射路径修改为 `result.total_count`



# [1.0.0-alpha.18](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.16...v1.0.0-alpha.18) (2018-10-29)


### Bug Fixes

* 内部处理 response 直接处理 axios 相应内容的 data 属性，以和自定义 requestHandler 时验证表现一致 ([1ba116d](https://github.com/laomao800/vue-listview/commit/1ba116dd89195bf7e2e49b1728a86cde37c48190))



# [1.0.0-alpha.16](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.15...v1.0.0-alpha.16) (2018-10-29)


### Bug Fixes

* update eslint-plugin-vue to 5.0.0-beta.3 ([6b772cb](https://github.com/laomao800/vue-listview/commit/6b772cb41c2a564a5707181c2e5f90d554f7d5d6))
* update storybook-readme ([1cd6d81](https://github.com/laomao800/vue-listview/commit/1cd6d8112a67ded546fd752c437e3fcba1c467ce))
* 修正 lint 错误 ([5fea1cf](https://github.com/laomao800/vue-listview/commit/5fea1cf833813abe0d6b775efa32c636ddd83a17))
* 修正测试用例及 snapshots ([d39a880](https://github.com/laomao800/vue-listview/commit/d39a880a9166878f46a74ac41be7dcf5d8c5bcf8))


### Features

* filterButton 支持 plain 类型 ([59a4bb7](https://github.com/laomao800/vue-listview/commit/59a4bb70fb4288c001498ca4837c75081c58c047))
* headerNav 支持只传入 string 类型 ([625f8ff](https://github.com/laomao800/vue-listview/commit/625f8ff607cb151d263fb09a0bbfd338a067f62f))
* 搜索栏 select 与 multiple-select 默认开启搜索功能 ([dbff66e](https://github.com/laomao800/vue-listview/commit/dbff66ece0710261fc1cca39d978bb4fa9b850b0))



# [1.0.0-alpha.15](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.9...v1.0.0-alpha.15) (2018-10-16)


### Bug Fixes

* 修复接口报错不显示错误信息问题 ([ef63c0d](https://github.com/laomao800/vue-listview/commit/ef63c0d93b293a1a2ef76e1e335c858007f166f8))
* 修复自动以 requestHandler 时 loading 状态不消失问题 ([5e8b26b](https://github.com/laomao800/vue-listview/commit/5e8b26bb5113063b1669e00d5e984929c0e383d4))
* 搜索时提交前先过滤掉条件中的无效数据 ([6424222](https://github.com/laomao800/vue-listview/commit/64242223f4e45b6f544e7f269277518f5f2e06cd))
* 搜索时提交前先过滤掉条件中的无效数据 ([64a2b02](https://github.com/laomao800/vue-listview/commit/64a2b029bbe4bc487c217d596a83460391f93fd9))
* 点击搜索栏页码重置回第一页 ([6d31b0a](https://github.com/laomao800/vue-listview/commit/6d31b0ab96319b9839300d79cf435ec033119ca5))


### Features

* **storybook:** 添加 storybook 演示 ([d5c8978](https://github.com/laomao800/vue-listview/commit/d5c89786019526f4347f4bbd57a8100db7cdd72a))
* filterButtons 支持 loading 属性 （仅支持通过 methods 返回 loading 状态） ([46035df](https://github.com/laomao800/vue-listview/commit/46035df277455a5ad657fbd8b12cd8e5d2d4633b))
* filterField 增加 componentSlots 配置属性用于配置字段组件 slot ([28e28d9](https://github.com/laomao800/vue-listview/commit/28e28d975fa7616d333abdfff4665b89921f2287))
* filterField 新增 label 、 number 2 种类型 ([41c3d41](https://github.com/laomao800/vue-listview/commit/41c3d418f490adbe52444d9330d27bbdbe4e633f))
* listview-container ([0d6cba6](https://github.com/laomao800/vue-listview/commit/0d6cba6f3692e02bb2c16e2e5aaa2b8c3a4687ef))
* search(keepInPage) 增加 keepInPage 控制数据请求保留在当前页码 ([25563d4](https://github.com/laomao800/vue-listview/commit/25563d47c189cd0d55e30f6fd2eb3f8356980ff3))
* 搜索栏回车触发搜索操作 ([12e11d1](https://github.com/laomao800/vue-listview/commit/12e11d1beceb8506b306bab60d8a233055c988c4))



# [1.0.0-alpha.9](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.8...v1.0.0-alpha.9) (2018-09-20)


### Bug Fixes

* 修复无 field 时 filterButtons 内按钮无法点击问题 ([0f2363a](https://github.com/laomao800/vue-listview/commit/0f2363aea0a1ecc425d7e58bb883b924fafca872))


### Features

* 表格增加单选模式 ([e2a6e78](https://github.com/laomao800/vue-listview/commit/e2a6e788470331ce35be584b7591736eda543278))



# [1.0.0-alpha.8](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.7...v1.0.0-alpha.8) (2018-09-19)


### Bug Fixes

* 修复重设窗口大小时 filterbar 计算位置错误问题 ([e1c31cb](https://github.com/laomao800/vue-listview/commit/e1c31cb2f5df05247aa4b26ac18c3094c36937de))



# [1.0.0-alpha.7](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.6...v1.0.0-alpha.7) (2018-09-18)


### Bug Fixes

* 修复 paginationHeight 高度获取无效导致重置布局失效问题 ([32957e2](https://github.com/laomao800/vue-listview/commit/32957e288c5c88dbfcfc253d24be7becd26de2a1))
* 修复多次请求互相取消时出现空白错误信息 ([31a1bd5](https://github.com/laomao800/vue-listview/commit/31a1bd5add310d68729d46abaecc9ea889d0d95c))



# [1.0.0-alpha.6](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.5...v1.0.0-alpha.6) (2018-09-10)


### Features

* transformRequestData 返回 false 可阻止请求发出 ([452bbc5](https://github.com/laomao800/vue-listview/commit/452bbc59811837b5c3388be8d4935a238b7a030f))



# [1.0.0-alpha.5](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2018-09-10)


### Bug Fixes

* 修复翻页操作 page_size 参数错误 ([c1fca14](https://github.com/laomao800/vue-listview/commit/c1fca1414f61c9efe9eccd68172fb1292f5adf5f))



# [1.0.0-alpha.4](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2018-09-07)


### Features

* 搜索、重置按钮分别增加触发 filter-submit, filter-reset 事件 ([e4770fe](https://github.com/laomao800/vue-listview/commit/e4770fe03b9f59c9646e9e039607a7adf662023c))



# [1.0.0-alpha.3](https://github.com/laomao800/vue-listview/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2018-09-05)


### Features

* **filterbar:** 增加 componentEvents 可传入组件事件 ([5ec23f1](https://github.com/laomao800/vue-listview/commit/5ec23f12427c011c59a82112bbf4cc79e12149b8))
* 通过浏览器 script 引入组件情况下自动 install ([346576e](https://github.com/laomao800/vue-listview/commit/346576e5f14b61ac97cdd7a17e85dd432b136794))



# [1.0.0-alpha.2](https://github.com/laomao800/vue-listview/compare/94d9d3d4aaca1d8c399ff1867f4ec8903a957e5b...v1.0.0-alpha.2) (2018-09-04)


### Bug Fixes

* **field:** 搜索栏内置字段类型 prop 合并流程调整，修复 componentProp 无法覆盖内置默认值问题 ([50ed948](https://github.com/laomao800/vue-listview/commit/50ed94849f1017c7a5d41737df9d498298767df5))
* **style:** 修复 filterbar 在原项目 css reset 下样式错误 ([4973278](https://github.com/laomao800/vue-listview/commit/49732789f3a6002b5dd50a249676c566f8f8c280))
* 修复 resize 出现滚动条导致 filter bar 提交按钮偏移问题 ([ad0159a](https://github.com/laomao800/vue-listview/commit/ad0159a5863f5c5ac5af91949eb95c59d41291eb))


### Features

* add release scripts ([7868764](https://github.com/laomao800/vue-listview/commit/7868764af08a7a1c8225e39ef24f4d3fc879c395))
* contentDataMap ([2a255a2](https://github.com/laomao800/vue-listview/commit/2a255a2e8b3554e8f47f6ba3b32e5a08ab6bad30))
* contentMessage (validateResponse, resolveRequestErrorMessage) ([543b460](https://github.com/laomao800/vue-listview/commit/543b460a583248fe5e2b1ce892e6e195cf955900))
* filterbar 代码优化 ([94d9d3d](https://github.com/laomao800/vue-listview/commit/94d9d3d4aaca1d8c399ff1867f4ec8903a957e5b))
* filterButtons, filterFields 支持 render() 属性 ([fbd4043](https://github.com/laomao800/vue-listview/commit/fbd4043a90993ff984d499fe13aa99725af1e494))
* table-columns, table-props, table-events, table-select-enable, table-selection ([cd8e582](https://github.com/laomao800/vue-listview/commit/cd8e582ce282b8c885a8737bee3b147105eaa870))
* 增加 requestDataKeyCase 可进行简单的配置请求参数拼写方案 ([b4edbc8](https://github.com/laomao800/vue-listview/commit/b4edbc807bd71d16fe61f85953d832bfaa68bfef))



