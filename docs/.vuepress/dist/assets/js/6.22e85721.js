(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{385:function(s,t,a){s.exports=a.p+"assets/img/preview.446b3b19.png"},420:function(s,t,a){"use strict";a.r(t);var n=a(2),e=Object(n.a)({},function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h1",{attrs:{id:"vue-listview"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#vue-listview","aria-hidden":"true"}},[s._v("#")]),s._v(" Vue Listview")]),s._v(" "),n("p",[s._v("Vue Listview 是一个基于 "),n("a",{attrs:{href:"https://cn.vuejs.org/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Vue.js"),n("OutboundLink")],1),s._v(" 和 "),n("a",{attrs:{href:"http://element.eleme.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Element-UI"),n("OutboundLink")],1),s._v(" ，可用于生成列表类的页面布局组件。")]),s._v(" "),n("p",[s._v("界面预览：")]),s._v(" "),n("p",[n("img",{attrs:{src:a(385),alt:"预览"}})]),s._v(" "),n("p",[s._v("默认为表格类列表页，也可通过 "),n("router-link",{attrs:{to:"/dev/slots.html"}},[s._v("Slot")]),s._v(" 实现自定义列表布局。")],1),s._v(" "),n("h2",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装","aria-hidden":"true"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("yarn add @laomao800/vue-listview element-ui\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# OR")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i -S @laomao800/vue-listview element-ui\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br")])]),n("p",[n("strong",[s._v("Element-UI 作为 peerDependencies 需要同步安装。")])]),s._v(" "),n("h2",{attrs:{id:"使用"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用","aria-hidden":"true"}},[s._v("#")]),s._v(" 使用")]),s._v(" "),n("h3",{attrs:{id:"全局注册"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#全局注册","aria-hidden":"true"}},[s._v("#")]),s._v(" 全局注册")]),s._v(" "),n("p",[s._v("可以传入配置对象，用于全局配置 listview 。一般可用于项目接口与默认结构不同的场景，通过全局配置可不用在每个页面内重复写诸如 "),n("code",[s._v("validateResponse")]),s._v(" 等“项目内通用”的配置。")]),s._v(" "),n("p",[s._v("支持全局配置：")]),s._v(" "),n("ul",[n("li",[n("code",[s._v("validateResponse")])]),s._v(" "),n("li",[n("code",[s._v("resolveResponseErrorMessage")])]),s._v(" "),n("li",[n("code",[s._v("transformRequestData")])]),s._v(" "),n("li",[n("code",[s._v("transformResponseData")])]),s._v(" "),n("li",[n("code",[s._v("contentDataMap")])])]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// main.js")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Vue "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" ElementUI "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'element-ui'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'element-ui/lib/theme-chalk/index.css'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Listview "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@laomao800/vue-listview'")]),s._v("\n\nVue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("use")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("ElementUI"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\nVue"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("use")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Listview"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\nVue.use(Listview, {\n  validateResponse: response => response.different_success_status,\n  resolveResponseErrorMessage: () => 'global config error',\n  transformRequestData: requestData => {\n    requestData.addon = 'requestAddon'\n    return requestData\n  },\n  transformResponseData: response => {\n    response.addon = 'responseAddon'\n    return response\n  },\n  contentDataMap: {\n    addon: 'addon',\n    items: 'result.items',\n    total: 'result.total_count'\n  }\n})\n*/")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br")])]),n("h3",{attrs:{id:"局部注册"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#局部注册","aria-hidden":"true"}},[s._v("#")]),s._v(" 局部注册")]),s._v(" "),n("div",{staticClass:"language-vue line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-vue"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("listview")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("template")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}},[s._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// import Vue from 'vue'")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" Listview "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@laomao800/vue-listview'")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\nVue.prototype.$LISTVIEW = {\n  contentDataMap: {\n    addon: 'addon',\n    items: 'result.items',\n    total: 'result.total_count'\n  },\n  // ...\n}\n*/")]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("export")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  components"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    Listview\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")]),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br")])]),n("h3",{attrs:{id:"umd"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#umd","aria-hidden":"true"}},[s._v("#")]),s._v(" UMD")]),s._v(" "),n("p",[s._v("演示： "),n("a",{attrs:{href:"https://jsfiddle.net/laomao800/92Lvg1rn/4/",target:"_blank",rel:"noopener noreferrer"}},[s._v("jsfiddle"),n("OutboundLink")],1)]),s._v(" "),n("div",{staticClass:"language-html line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-html"}},[n("code",[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("id")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("app"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("listview")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("/>")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("src")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("//unpkg.com/vue/dist/vue.js"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}}),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("src")]),n("span",{pre:!0,attrs:{class:"token attr-value"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("//unpkg.com/@laomao800/vue-listview/dist/listview.umd.min.js"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}}),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),n("span",{pre:!0,attrs:{class:"token script language-javascript"}},[s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Vue")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("$mount")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'#app'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")]),n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token tag"}},[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("script")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("h2",{attrs:{id:"基本配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#基本配置","aria-hidden":"true"}},[s._v("#")]),s._v(" 基本配置")]),s._v(" "),n("ul",[n("li",[s._v("搜索栏\n"),n("ul",[n("li",[s._v("操作按钮 "),n("router-link",{attrs:{to:"/dev/prop-filter-buttons.html"}},[s._v("《Prop: filterButtons》")])],1),s._v(" "),n("li",[s._v("搜索字段 "),n("router-link",{attrs:{to:"/dev/prop-filter-fields.html"}},[s._v("《Prop: filterFields》")])],1)])]),s._v(" "),n("li",[s._v("表格布局 "),n("router-link",{attrs:{to:"/dev/prop-table-columns.html"}},[s._v("《Prop: tableColumns》")])],1),s._v(" "),n("li",[s._v("自定义布局 "),n("router-link",{attrs:{to:"/dev/slots.html"}},[s._v("《Slot》")])],1)]),s._v(" "),n("h2",{attrs:{id:"dist-文件说明"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#dist-文件说明","aria-hidden":"true"}},[s._v("#")]),s._v(" "),n("code",[s._v("/dist")]),s._v(" 文件说明")]),s._v(" "),n("p",[s._v("由于 Listview 内部所有基础视图组件都来自 "),n("a",{attrs:{href:"http://element.eleme.io/",target:"_blank",rel:"noopener noreferrer"}},[s._v("Element-UI"),n("OutboundLink")],1),s._v(" ，因此打包文件分别有两个版本，以下为 "),n("code",[s._v("dist")]),s._v(" 目录下文件的对比说明：")]),s._v(" "),n("ul",[n("li",[n("p",[n("code",[s._v("listview-component.common.js")])]),s._v(" "),n("p",[n("strong",[s._v("默认文件")]),s._v("，只包含 listview 自身功能")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("listview-component.umd.js")])]),s._v(" "),n("p",[s._v("同上的 UMD 版本")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("listview-component.umd.min.js")])]),s._v(" "),n("p",[s._v("同上的 UMD 压缩版本")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("listview.common.js")])]),s._v(" "),n("p",[s._v("包含 listview 功能和 Element-UI + css 完整库")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("listview.umd.js")])]),s._v(" "),n("p",[s._v("同上的 UMD 版本")])]),s._v(" "),n("li",[n("p",[n("code",[s._v("listview.umd.min.js")])]),s._v(" "),n("p",[s._v("同上的 UMD 压缩版本")])])])])},[],!1,null,null,null);t.default=e.exports}}]);