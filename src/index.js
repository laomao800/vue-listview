import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@/listview'

Vue.use(ElementUI)

Listview.install = function() {
  Vue.component(Listview.name, Listview)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Listview)
}

export default Listview
