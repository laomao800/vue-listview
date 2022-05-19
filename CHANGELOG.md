## [2.0.2](https://github.com/laomao800/vue-listview/compare/v2.0.1...v2.0.2) (2022-05-19)


### Bug Fixes

* 修正 .el-table th 样式覆盖权重 ([6f0efad](https://github.com/laomao800/vue-listview/commit/6f0efadf18c8c119741c75c76fd418b45ad56346))
* type fix ([a7c707c](https://github.com/laomao800/vue-listview/commit/a7c707c6e090d33c1308986d4d59f83a520963f7))



## [2.0.1](https://github.com/laomao800/vue-listview/compare/v2.0.0...v2.0.1) (2022-03-21)


### Bug Fixes

* 修正导出 amd 包缺失 vue 依赖项 ([4de5caa](https://github.com/laomao800/vue-listview/commit/4de5caa55936df6aa619a9d464aabe4b010e4882))
* type fix ([844b320](https://github.com/laomao800/vue-listview/commit/844b3209c6bd19934cc28e57b784c0fdbae31f29))



# [2.0.0](https://github.com/laomao800/vue-listview/compare/v2.0.0-beta.5...v2.0.0) (2021-12-22)


### Bug Fixes

* type fix ([29ceeb0](https://github.com/laomao800/vue-listview/commit/29ceeb0d27ce63015ad2c9ac68db4b6cd435c83c))



# [2.0.0-beta.5](https://github.com/laomao800/vue-listview/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-10-28)


### Bug Fixes

* filterFields 内 componentProps.placeholder 配置无效 ([36c15ea](https://github.com/laomao800/vue-listview/commit/36c15ea799851f140e6bb141f1d025f3897cb902))


### Features

* 可通过 effect 内可通过 vm.disabled 设置禁用状态 ([9e55155](https://github.com/laomao800/vue-listview/commit/9e5515534f7fef484cb100a02bf23ae5d5bae39e))
* 可通过 effect 内可通过 vm.placeholder 设置占位符内容 ([ed09eb7](https://github.com/laomao800/vue-listview/commit/ed09eb7644ffc9eae8ad7d2c4a6c358035aec750))
* filterFields 增加 effect 属性方法 ([65cdfac](https://github.com/laomao800/vue-listview/commit/65cdfac5fabe4a44a58554b70165d8454fcabfe9))



# [2.0.0-beta.4](https://github.com/laomao800/vue-listview/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-10-14)


### Bug Fixes

* 补充 headerNav 类型定义 ([380a8f7](https://github.com/laomao800/vue-listview/commit/380a8f783095bc9ab50aac37b64e0222a28e685f))
* 内置 lodash/get 方法 ([7ec778e](https://github.com/laomao800/vue-listview/commit/7ec778effa992b9cee17b50524897cd587769ff4)), closes [/github.com/lodash/babel-plugin-lodash/issues/94#issuecomment-233093079](https://github.com//github.com/lodash/babel-plugin-lodash/issues/94/issues/issuecomment-233093079)
* 修正 requestMethod 配置无效 ([2d65c61](https://github.com/laomao800/vue-listview/commit/2d65c6146e72effad43ef1556e521333b31c719a))
* SFCWithInstall type fix ([e52535c](https://github.com/laomao800/vue-listview/commit/e52535cefb8c2d6bd23650e6f74ac36ed79afc51))


### Features

* 新增 filterbarFold ， filterbarFoldable ([d1d158c](https://github.com/laomao800/vue-listview/commit/d1d158c6b339a36e93d1b563e5313ba9bb8317d9))



# [2.0.0-beta.3](https://github.com/laomao800/vue-listview/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-07-30)


### Bug Fixes

* 修正 ci 发布 npm 丢失 dist/fonts 目录 ([c7199af](https://github.com/laomao800/vue-listview/commit/c7199af02df12c16b60db30fb17fd13dd3e17a33))
* 修正搭配 el-tabs 使用布局计算错误问题 ([d1749cb](https://github.com/laomao800/vue-listview/commit/d1749cb1b0ff365f6d28bd0214b2e95223603966))



# [2.0.0-beta.2](https://github.com/laomao800/vue-listview/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-07-27)


### Bug Fixes

* type fix ([13f63e9](https://github.com/laomao800/vue-listview/commit/13f63e91b826f8a9b8338853da30b92ce22cb1a5))
* update @vue/test-utils ([1497830](https://github.com/laomao800/vue-listview/commit/14978309dc853cdf772045942e8cf8a0526a475c))
* 修正 vue-template-compiler@2.6.13+ 项目中使内容显示 undefined 字样 ([01bc699](https://github.com/laomao800/vue-listview/commit/01bc6990e17a98b13322514e58d5c7ef87c68a4d)), closes [/github.com/vuejs/vue/pull/12014#issue-616926569](https://github.com//github.com/vuejs/vue/pull/12014/issues/issue-616926569)
* 修正搜索按钮边界情况下定位偏移量计算错误 ([f2b77d9](https://github.com/laomao800/vue-listview/commit/f2b77d93f72e03519d03507c8559038eff4fff53))
* 修正组件初始不可见时，内容高度计算错误 ([e7d5e43](https://github.com/laomao800/vue-listview/commit/e7d5e43eac266b968262a0b03532d37997867fc2))
* 修正组件挂载后布局重算导致闪烁 ([86cb467](https://github.com/laomao800/vue-listview/commit/86cb46788dc1f9533e3babe96da96964da130eff))


### Features

* 非法 filterFields 类型显示提示 ([241bc6d](https://github.com/laomao800/vue-listview/commit/241bc6d25aef5337eaaa3ee6976e5ca7ee945a04))



# [2.0.0-beta.1](https://github.com/laomao800/vue-listview/compare/v1.5.0-4...v2.0.0-beta.1) (2021-07-21)



