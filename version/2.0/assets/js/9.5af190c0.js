(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{399:function(t,e,n){},596:function(t,e,n){"use strict";n(399)},611:function(t,e,n){"use strict";n.r(e);n(92),n(10);var i={data:function(){var t=this,e=this.$createElement;return{viewType:"table",lvConfig:{contentDataMap:null,requestHandler:function(){return{items:Array.from(Array(30),(function(t,e){return{id:e,name:"name ".concat(e)}})),total:30}},filterButtons:[{render:function(){return e("div",[e("label",{on:{click:function(){return t.viewType="table"}}},[e("input",{attrs:{type:"radio",value:"table"},domProps:{checked:"table"===t.viewType}}),"表格视图"]),e("label",{on:{click:function(){return t.viewType="thumb"}}},[e("input",{attrs:{type:"radio",value:"thumb"},domProps:{checked:"thumb"===t.viewType}}),"缩略图"])])}}],filterFields:[{type:"text",model:"text1",label:"文本字段"}],tableColumns:[{label:"id",prop:"id",width:120},{label:"name",prop:"name"}]}}}},a=(n(596),n(40)),s=Object(a.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("listview",t._b({scopedSlots:t._u([{key:"default",fn:function(e){var i=e.contentData,a=e.contentMessage;return"thumb"===t.viewType?[a.text?n("div",[n("p",[t._v("message type: "+t._s(a.type))]),t._v(" "),n("p",[t._v("message text: "+t._s(a.text))])]):n("ul",{staticClass:"thumb-view"},t._l(i.items,(function(e,i){return n("li",{key:i},[n("div",{staticClass:"thumb"}),t._v(" "),n("div",{staticClass:"info"},[n("div",{staticClass:"sku"},[t._v(t._s(e.sku))]),t._v(" "),n("div",{staticClass:"name"},[t._v(t._s(e.name))])]),t._v(" "),n("div",{staticClass:"action"},[n("el-button",{attrs:{size:"mini",type:"success"}},[t._v("审核")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"danger"}},[t._v("删除")])],1)])})),0)]:void 0}}],null,!0)},"listview",t.lvConfig,!1))}),[],!1,null,"e32e2e92",null);e.default=s.exports}}]);