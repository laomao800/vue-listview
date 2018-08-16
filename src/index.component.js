import Vue from 'vue'
import Listview from '@/listview'

Listview.install = function() {
  Vue.component(Listview.name, Listview)
}

export default Listview
