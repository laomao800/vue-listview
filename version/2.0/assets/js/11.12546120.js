(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{453:function(e,n,t){},530:function(e,n,t){"use strict";t(453)},692:function(e,n,t){"use strict";var r=t(693),a=t(63),i=(t(123),t(53),t(386),t(436),t(502),t(77),t(439)),o=t.n(i),s=t(399),c=t.n(s),u=t(403),l=t.n(u),p=(t(452),{components:{ElSelect:c.a,ElOption:l.a},data:function(){return{curVersion:void 0,versions:[],loading:!1}},created:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function n(){var t,r;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.getVersions();case 2:t="";try{r=window.location.pathname.toLowerCase(),t=r.match(/\/version\/([\d.]*)\//)[1]}catch(e){}e.curVersion=t||e.versions[0];case 5:case"end":return n.stop()}}),n)})))()},methods:{getVersions:function(){var e=this;return Object(a.a)(regeneratorRuntime.mark((function n(){var t,r,a;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return e.loading=!0,n.next=3,o.a.get("https://api.github.com/repos/laomao800/vue-listview/git/trees/gh-pages");case 3:if(t=n.sent,r=t.data.tree.find((function(e){return"version"===e.path}))){n.next=7;break}return n.abrupt("return");case 7:return n.next=9,o.a.get(r.url);case 9:t=n.sent,a=t.data.tree.map((function(e){return e.path})).sort().reverse(),e.versions=a,e.loading=!1;case 13:case"end":return n.stop()}}),n)})))()},handleChange:function(){var e=window.location.pathname.toLowerCase(),n=e;try{var t=e.match(/(.*\/)version?\//);t&&t[1]&&(n=t[1])}catch(e){}window.location.pathname=n+"version/"+this.curVersion}}}),h=(t(530),t(52)),v=Object(h.a)(p,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"version-switch"},[t("span",[e._v("Version:")]),e._v(" "),t("ElSelect",{attrs:{loading:e.loading,size:"small",placeholder:"选择版本"},on:{change:e.handleChange},model:{value:e.curVersion,callback:function(n){e.curVersion=n},expression:"curVersion"}},e._l(e.versions,(function(n){return t("ElOption",{key:n,attrs:{value:n}},[e._v("\n      v"+e._s(n)+"\n    ")])})),1)],1)}),[],!1,null,null,null).exports,d={name:"NewSidebar",components:{OriginSidebar:r.a,VersionSwitch:v}},f=Object(h.a)(d,(function(){var e=this.$createElement,n=this._self._c||e;return n("OriginSidebar",{attrs:{items:this.$attrs.items},scopedSlots:this._u([{key:"top",fn:function(){return[n("VersionSwitch")]},proxy:!0}])})}),[],!1,null,null,null);n.a=f.exports}}]);