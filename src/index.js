import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@/listview'
import ListviewContainer from '@/listview-container'

Vue.use(ElementUI)

Listview.install = function() {
  Vue.component(Listview.name, Listview)
  Vue.component(ListviewContainer.name, ListviewContainer)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Listview)
  window.Vue.use(ListviewContainer)
}

export default Listview
