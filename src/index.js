import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Listview from '@/listview'

Vue.use(ElementUI)

Listview.install = function() {
  Vue.component(Listview.name, Listview)
}

export default Listview
