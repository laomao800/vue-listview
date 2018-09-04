import Vue from 'vue'
import Listview from '@/listview'

Listview.install = function() {
  Vue.component(Listview.name, Listview)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Listview)
}

export default Listview
