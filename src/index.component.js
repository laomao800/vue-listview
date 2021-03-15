import _ from 'lodash'
import Listview from './listview'
import ListviewContainer from './listview-container'

Listview.install = function (Vue, options = {}) {
  Vue.prototype.$LISTVIEW = options
  Vue.component(Listview.name, Listview)
}

ListviewContainer.install = function (Vue) {
  Vue.component(ListviewContainer.name, ListviewContainer)
}

if (typeof window !== 'undefined' && window.Vue) {
  Listview.install(window.Vue)
  ListviewContainer.install(window.Vue)
}

export default Listview
export { Listview, ListviewContainer }
